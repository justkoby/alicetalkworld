import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';
import { fallbackEvents } from '../data/fallbackEventData.js';

const PUBLIC_EVENT_COLUMNS = [
  'id',
  'title',
  'slug',
  'summary',
  'description',
  'category',
  'cover_image_url',
  'start_at',
  'end_at',
  'timezone',
  'venue_name',
  'address',
  'city',
  'country',
  'is_online',
  'online_url',
  'registration_url',
  'registration_deadline',
  'is_featured',
  'published_at',
].join(', ');

/**
 * Fetch all published, active events from Supabase.
 * Excludes soft-deleted, drafts, and future-scheduled unpublished events.
 */
export async function getPublishedEvents() {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackEvents;
  }

  try {
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .select(PUBLIC_EVENT_COLUMNS)
      .eq('status', 'published')
      .is('deleted_at', null)
      .not('published_at', 'is', null)
      .lte('published_at', nowIso)
      .order('start_at', { ascending: false });

    if (error) {
      console.error('[eventService] Error querying events:', error);
      throw error;
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[eventService] Failed to load published events:', err);
    throw err;
  }
}

/**
 * Fetch a single published event by its slug.
 */
export async function getPublishedEventBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const cleanSlug = slug.trim().toLowerCase();

  if (!isSupabaseConfigured || !supabase) {
    return fallbackEvents.find((evt) => evt.slug === cleanSlug) || null;
  }

  try {
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .select(PUBLIC_EVENT_COLUMNS)
      .eq('slug', cleanSlug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .not('published_at', 'is', null)
      .lte('published_at', nowIso)
      .maybeSingle();

    if (error) {
      console.error(`[eventService] Error querying event by slug "${cleanSlug}":`, error);
      throw error;
    }

    return data || null;
  } catch (err) {
    console.error(`[eventService] Failed to load event slug "${cleanSlug}":`, err);
    throw err;
  }
}

/**
 * Classifies events into upcoming and past categories based on real event dates,
 * and orders them according to the requirements:
 * - Upcoming: nearest to furthest (ascending by start_at)
 * - Past: newest to oldest (descending by start_at)
 * - Featured: upcoming featured if available, otherwise newest featured
 */
export function separateAndOrderEvents(events = []) {
  const now = new Date();
  const upcoming = [];
  const past = [];

  for (const event of events) {
    if (!event || !event.start_at) continue;

    const startDate = new Date(event.start_at);
    const endDate = event.end_at ? new Date(event.end_at) : null;

    // An event is upcoming if start is in future, or if an end date exists in the future
    if (startDate >= now || (endDate && endDate >= now)) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  }

  // Upcoming: nearest to furthest (start_at ascending)
  upcoming.sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

  // Past: newest to oldest (start_at descending)
  past.sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());

  // Determine top featured event
  const featured =
    upcoming.find((e) => e.is_featured) ||
    upcoming[0] ||
    past.find((e) => e.is_featured) ||
    past[0] ||
    null;

  return { upcoming, past, featured };
}

/**
 * Format date display cleanly (e.g., "Nov 15, 2026" or "Nov 15 – 17, 2026")
 */
export function formatEventDate(startAt, endAt) {
  if (!startAt) return '';

  const start = new Date(startAt);
  if (isNaN(start.getTime())) return '';

  const startOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  if (!endAt) {
    return start.toLocaleDateString('en-US', startOptions);
  }

  const end = new Date(endAt);
  if (isNaN(end.getTime())) {
    return start.toLocaleDateString('en-US', startOptions);
  }

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();
  const sameDay = sameMonth && start.getDate() === end.getDate();

  if (sameDay) {
    return start.toLocaleDateString('en-US', startOptions);
  }

  if (sameMonth) {
    return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  if (sameYear) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${end.getFullYear()}`;
  }

  return `${start.toLocaleDateString('en-US', startOptions)} – ${end.toLocaleDateString('en-US', startOptions)}`;
}

/**
 * Format event time display (e.g., "9:00 AM – 5:00 PM GMT")
 */
export function formatEventTime(startAt, endAt) {
  if (!startAt) return '';

  const start = new Date(startAt);
  if (isNaN(start.getTime())) return '';

  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const startTimeStr = start.toLocaleTimeString('en-US', timeOptions);

  if (!endAt) return startTimeStr;

  const end = new Date(endAt);
  if (isNaN(end.getTime())) return startTimeStr;

  const endTimeStr = end.toLocaleTimeString('en-US', timeOptions);
  return `${startTimeStr} – ${endTimeStr}`;
}

/**
 * Formats location text for public event cards
 */
export function formatEventLocation(event) {
  if (!event) return '';
  if (event.is_online) {
    return event.venue_name || 'Online Event';
  }

  const parts = [event.venue_name, event.city, event.country].filter(Boolean);
  return parts.join(', ') || 'Venue TBA';
}
