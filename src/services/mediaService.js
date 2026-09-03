import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Fields selected for all public media album queries. No administrative fields.
const ALBUM_SELECT =
  'id, title, slug, description, category, event_date, cover_image_url, external_album_url, images, is_featured, display_order, published_at';

// Shared base query filters for public visibility.
const applyPublicFilters = (query) =>
  query
    .eq('status', 'published')
    .is('deleted_at', null)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString());

// Shared ordering: display_order ASC, then event_date DESC.
const applyOrder = (query) =>
  query
    .order('display_order', { ascending: true })
    .order('event_date', { ascending: false });

/**
 * Extract an array of image URL strings from the JSONB `images` field.
 * Supports: string[], { url: string }[], { image_url: string }[]
 */
export const extractImageUrls = (images) => {
  if (!Array.isArray(images) || images.length === 0) return [];
  return images
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') return item.url || item.image_url || null;
      return null;
    })
    .filter(Boolean);
};

/**
 * Normalize a raw Supabase album row into the shape expected by the UI.
 */
export const normalizeAlbum = (row) => {
  const images = extractImageUrls(row.images);
  const year = row.event_date ? new Date(row.event_date).getFullYear().toString() : '';
  return {
    id: row.id,
    title: row.title || '',
    slug: row.slug || '',
    description: row.description || '',
    category: row.category || '',        // Full label as stored: e.g. "Leadership Conference"
    date: year,
    cover: row.cover_image_url || null,
    albumUrl: row.external_album_url || null,
    images,                               // Normalized string[]
    isFeatured: Boolean(row.is_featured),
    displayOrder: typeof row.display_order === 'number' ? row.display_order : 0,
    publishedAt: row.published_at || null,
  };
};

/**
 * Fetch all published, non-deleted, non-future albums.
 * Returns { data: Album[], isFallback: boolean, error: Error | null }
 */
export async function getPublishedAlbums() {
  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn('[MediaService] Supabase credentials not configured. Using temporary local fallback.');
    }
    return { data: null, isFallback: true, error: null };
  }

  try {
    let query = supabase.from('media_albums').select(ALBUM_SELECT);
    query = applyPublicFilters(query);
    query = applyOrder(query);

    const { data, error } = await query;

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch albums') };
    }

    return { data: (data || []).map(normalizeAlbum), isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading albums') };
  }
}

/**
 * Fetch the first featured published album.
 * Falls back to first published album if no featured one exists.
 */
export async function getFeaturedAlbum() {
  if (!isSupabaseConfigured) {
    return { data: null, isFallback: true, error: null };
  }

  try {
    let query = supabase.from('media_albums').select(ALBUM_SELECT);
    query = applyPublicFilters(query);
    query = query.eq('is_featured', true);
    query = applyOrder(query);
    query = query.limit(1);

    const { data, error } = await query;

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch featured album') };
    }

    if (data && data.length > 0) {
      return { data: normalizeAlbum(data[0]), isFallback: false, error: null };
    }

    // No featured album — fall back to first published album without touching DB state.
    return { data: null, isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading featured album') };
  }
}

/**
 * Fetch published albums filtered by category label.
 */
export async function getPublishedAlbumsByCategory(category) {
  if (!isSupabaseConfigured) {
    return { data: null, isFallback: true, error: null };
  }

  try {
    let query = supabase.from('media_albums').select(ALBUM_SELECT);
    query = applyPublicFilters(query);
    if (category) {
      query = query.eq('category', category);
    }
    query = applyOrder(query);

    const { data, error } = await query;

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch albums by category') };
    }

    return { data: (data || []).map(normalizeAlbum), isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading albums') };
  }
}
