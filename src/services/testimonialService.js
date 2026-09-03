import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';
import { fallbackTestimonials } from '../data/fallbackTestimonialData.js';

const TESTIMONIAL_SELECT =
  'id, person_name, role_title, organization, location, quote, image_url, display_order';

/**
 * Derives 1-2 uppercase initials from a person's full name.
 */
export function getTestimonialInitials(name) {
  if (!name || typeof name !== 'string') return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Fetch all active, approved, non-deleted testimonials.
 * Order by display_order asc, then person_name asc.
 *
 * Returns { data: Testimonial[], isFallback: boolean, error: Error | null }
 */
export async function getActiveTestimonials() {
  if (!isSupabaseConfigured) {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
      console.warn(
        '[TestimonialService] Supabase credentials not configured. Using temporary local fallback.'
      );
    }
    return { data: fallbackTestimonials, isFallback: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select(TESTIMONIAL_SELECT)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('display_order', { ascending: true })
      .order('person_name', { ascending: true });

    if (error) {
      console.warn('[TestimonialService] Failed to load testimonials from database:', error.message);
      return { data: [], isFallback: false, error: new Error('Failed to fetch testimonials') };
    }

    const normalized = (data || []).map((t) => ({
      id: t.id,
      fullName: (t.person_name || '').trim(),
      roleTitle: (t.role_title || '').trim(),
      organisation: (t.organization || '').trim(),
      location: (t.location || '').trim(),
      quote: (t.quote || '').trim(),
      imageUrl: t.image_url && t.image_url.trim() !== '' ? t.image_url.trim() : null,
      displayOrder: typeof t.display_order === 'number' ? t.display_order : 0,
    }));

    return { data: normalized, isFallback: false, error: null };
  } catch (err) {
    console.warn('[TestimonialService] Network error loading testimonials:', err?.message || err);
    return { data: [], isFallback: false, error: new Error('Network error loading testimonials') };
  }
}
