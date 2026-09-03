import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const TEAM_GROUP_LABELS = {
  featured: 'Featured Leadership',
  executive_leadership: 'Executive Leadership',
  department_leads: 'Department Leads',
  operations_support: 'Operations & Support',
  advisors: 'Advisors',
};

/**
 * Normalizes team member data from Supabase into a consistent format for the public Team page.
 */
export const normalizeMember = (m) => ({
  id: m.id || m.full_name || m.name,
  name: m.full_name || m.name || '',
  role: m.role_title || m.role || '',
  image: m.image_url !== undefined ? m.image_url : m.image,
  shortDesc: m.short_description || m.shortDesc || '',
  bio: m.biography || m.bio || '',
  focusAreas: Array.isArray(m.focus_areas) ? m.focus_areas : (Array.isArray(m.focusAreas) ? m.focusAreas : []),
  email: m.email && m.email.trim() !== '' ? m.email.trim() : null,
  phone: m.phone && m.phone.trim() !== '' ? m.phone.trim() : null,
  whatsapp: m.phone && m.phone.trim() !== '' ? m.phone.trim() : (m.whatsapp && m.whatsapp.trim() !== '' ? m.whatsapp.trim() : null),
  linkedin: m.linkedin_url && m.linkedin_url.trim() !== '' && m.linkedin_url !== '#' ? m.linkedin_url.trim() : (m.linkedin && m.linkedin !== '#' ? m.linkedin : null),
  socials: m.other_social_url && m.other_social_url.trim() !== '' ? m.other_social_url.trim() : (m.socials || null),
  team_group: m.team_group || 'operations_support',
  display_order: typeof m.display_order === 'number' ? m.display_order : 0,
  is_featured: Boolean(m.is_featured),
});

/**
 * Fetches active, non-deleted team members from public.team_members.
 * Returns { data, isFallback, error }.
 */
export async function getTeamMembers() {
  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV) {
      console.warn('[TeamService] Supabase credentials not configured in environment. Using temporary local fallback.');
    }
    return {
      data: null,
      isFallback: true,
      error: null,
    };
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('id, full_name, role_title, team_group, short_description, biography, image_url, focus_areas, email, phone, linkedin_url, other_social_url, display_order, is_featured')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('team_group', { ascending: true })
      .order('display_order', { ascending: true })
      .order('full_name', { ascending: true });

    if (error) {
      return {
        data: null,
        isFallback: false,
        error: new Error('Failed to fetch team members'),
      };
    }

    const normalizedList = (data || []).map(normalizeMember);

    return {
      data: normalizedList,
      isFallback: false,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      isFallback: false,
      error: new Error('Network error loading team members'),
    };
  }
}
