import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Fields needed for homepage + news list (no full content/gallery needed on homepage)
const POST_SELECT =
  'id, title, slug, excerpt, category, author_name, cover_image_url, is_featured, published_at, status';

// Shared public visibility filter
const applyPublicFilters = (query) =>
  query
    .eq('status', 'published')
    .is('deleted_at', null)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString());

/**
 * Normalize a raw Supabase post row into the shape expected by the UI.
 */
export const normalizePost = (row) => ({
  id: row.id,
  slug: row.slug || '',
  title: row.title || '',
  excerpt: row.excerpt || '',
  category: row.category || '',
  author: row.author_name || 'Alice Talk World Editorial',
  cover: row.cover_image_url || null,
  isFeatured: Boolean(row.is_featured),
  date: row.published_at
    ? new Date(row.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })
    : '',
  publishedAt: row.published_at || null,
});

/**
 * Fetch all published posts ordered by published_at descending.
 * Returns { data: Post[], isFallback: boolean, error: Error | null }
 */
export async function getPublishedPosts() {
  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn('[NewsService] Supabase credentials not configured. Using temporary local fallback.');
    }
    return { data: null, isFallback: true, error: null };
  }

  try {
    let query = supabase.from('posts').select(POST_SELECT);
    query = applyPublicFilters(query);
    query = query.order('published_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch stories') };
    }

    return { data: (data || []).map(normalizePost), isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading stories') };
  }
}

/**
 * Resolve featured post + up to 3 latest non-featured posts from a list.
 * Pure client-side — no extra query.
 * Returns { featured: Post | null, latest: Post[] }
 */
export function resolveHomepagePosts(posts) {
  if (!posts || posts.length === 0) return { featured: null, latest: [] };

  // Featured = newest post with is_featured=true, or fallback to newest overall
  const featuredCandidates = posts.filter((p) => p.isFeatured);
  const featured = featuredCandidates.length > 0 ? featuredCandidates[0] : posts[0];

  // Latest = next 3 posts, excluding the featured
  const latest = posts.filter((p) => p.id !== featured.id).slice(0, 3);

  return { featured, latest };
}
