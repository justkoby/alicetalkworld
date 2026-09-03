import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const SECTION_FIELDS =
  'section_key, title, subtitle, content, display_order, is_visible, updated_at';

/**
 * Fetch a published/visible homepage section by its section_key.
 * Returns { data: section | null, isFallback: boolean, error: Error | null }
 * Returns null data when the section is intentionally hidden (is_visible = false) or not found.
 */
export async function getHomepageSection(sectionKey) {
  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn(
        `[HomepageService] Supabase credentials not configured. Using temporary local fallback for "${sectionKey}".`
      );
    }
    return { data: null, isFallback: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select(SECTION_FIELDS)
      .eq('section_key', sectionKey)
      .eq('is_visible', true)
      .maybeSingle();

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to load homepage section') };
    }

    // data will be null if section is not found or is_visible is false
    return { data: data || null, isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading homepage section') };
  }
}

/**
 * Normalizes gallery images array from Supabase JSONB into [{ url, altText }].
 * Supports:
 *   - string array: ["https://example.com/image.jpg"]
 *   - object array: [{ url, alt_text }] or [{ image_url, alt_text }]
 * Rules:
 *   - Ignores blank or invalid entries.
 *   - Removes duplicate URLs (case-insensitive).
 *   - Preserves exact stored order.
 *   - Uses meaningful stored alt text or fallback "Alice Talk World gallery image".
 */
export function normalizeGalleryImages(rawImages) {
  if (!Array.isArray(rawImages)) return [];

  const seenUrls = new Set();
  const normalized = [];

  for (const item of rawImages) {
    if (!item) continue;
    let url = '';
    let altText = '';

    if (typeof item === 'string') {
      url = item.trim();
    } else if (typeof item === 'object') {
      url = (item.url || item.image_url || '').trim();
      altText = (item.alt_text || item.altText || item.caption || item.title || '').trim();
    }

    if (!url) continue;

    const lowerUrl = url.toLowerCase();
    if (seenUrls.has(lowerUrl)) continue;
    seenUrls.add(lowerUrl);

    normalized.push({
      url,
      altText: altText || 'Alice Talk World gallery image',
    });
  }

  return normalized;
}

