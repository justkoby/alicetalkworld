import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const PARTNER_SELECT = 'id, name, logo_url, website_url, partner_type, display_order';

/**
 * Fetch all active, non-deleted partners ordered by display_order then name.
 * Returns { data: Partner[], isFallback: boolean, error: Error | null }
 */
export async function getActivePartners() {
  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn('[PartnerService] Supabase credentials not configured. Using temporary local fallback.');
    }
    return { data: null, isFallback: true, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('partners')
      .select(PARTNER_SELECT)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('display_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      return { data: null, isFallback: false, error: new Error('Failed to fetch partners') };
    }

    const normalized = (data || []).map((p) => ({
      id: p.id,
      name: p.name || '',
      logo: p.logo_url || null,
      website: p.website_url && p.website_url.trim() !== '' ? p.website_url.trim() : null,
      partnerType: p.partner_type || '',
      displayOrder: typeof p.display_order === 'number' ? p.display_order : 0,
    }));

    return { data: normalized, isFallback: false, error: null };
  } catch {
    return { data: null, isFallback: false, error: new Error('Network error loading partners') };
  }
}
