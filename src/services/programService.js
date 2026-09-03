import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const PROGRAM_SELECT =
  'id, title, slug, summary, description, cover_image_url, gallery, location, external_url, is_featured, display_order, published_at';

/**
 * Fetch published programs by a list of UUIDs.
 * Filters: status = 'published', deleted_at IS NULL, published_at IS NOT NULL, published_at <= now()
 * Reorders results to match the exact order of the input `ids` array.
 *
 * Returns { data: Program[] | null, isFallback: boolean, error: Error | null }
 */
export async function getPublishedProgramsByIds(ids) {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return { data: [], isFallback: false, error: null };
  }

  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn('[ProgramService] Supabase credentials not configured. Using temporary local fallback.');
    }
    return { data: null, isFallback: true, error: null };
  }

  try {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from('programs')
      .select(PROGRAM_SELECT)
      .in('id', ids)
      .eq('status', 'published')
      .is('deleted_at', null)
      .not('published_at', 'is', null)
      .lte('published_at', nowIso);

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch programs') };
    }

    // Reorder fetched records to strictly match the order of IDs in the input array
    const programsById = new Map((data || []).map((p) => [p.id, p]));
    const ordered = [];
    for (const id of ids) {
      const prog = programsById.get(id);
      if (prog) {
        ordered.push(prog);
      }
    }

    return { data: ordered, isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading programs') };
  }
}

/**
 * Normalizes program gallery images into an array of URL strings.
 * Supports:
 *   - string array: ["https://..."]
 *   - object array: [{ url: "https://..." }] or [{ image_url: "https://..." }]
 *
 * Rules:
 *   1. Includes valid gallery images.
 *   2. Uses cover_image_url as fallback if gallery is empty.
 *   3. Does not duplicate cover image if it already exists in the gallery.
 *   4. Ignores empty or invalid image entries.
 */
export function normalizeProgramImages(program) {
  if (!program) return [];
  const rawGallery = program.gallery;
  const list = Array.isArray(rawGallery) ? rawGallery : [];
  const normalized = [];

  for (const item of list) {
    if (!item) continue;
    let url = '';
    if (typeof item === 'string') {
      url = item.trim();
    } else if (typeof item === 'object') {
      url = (item.url || item.image_url || '').trim();
    }
    if (url && !normalized.includes(url)) {
      normalized.push(url);
    }
  }

  const cover =
    typeof program.cover_image_url === 'string' ? program.cover_image_url.trim() : '';

  if (normalized.length === 0 && cover) {
    normalized.push(cover);
  }

  return normalized;
}
