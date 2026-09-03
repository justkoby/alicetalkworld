/**
 * Fallback events dataset for Alice Talk World
 * Used ONLY when Supabase credentials are missing/unconfigured.
 */
export const fallbackEvents = [
  {
    id: 'fallback-evt-1',
    title: 'Annual Youth Leadership & Mentorship Bootcamp 2026',
    slug: 'youth-leadership-bootcamp-2026',
    category: 'Leadership Development',
    summary: 'A multi-day intensive bootcamp connecting ambitious youth with seasoned industry leaders, career mentors, and changemakers.',
    description: {
      text: 'The Annual Youth Leadership & Mentorship Bootcamp brings together emerging organizers, students, and professionals for hands-on workshops in public speaking, project design, ethical leadership, and career readiness.'
    },
    cover_image_url: '/images/atw/795A2050.jpg',
    start_at: '2026-11-15T09:00:00.000Z',
    end_at: '2026-11-17T17:00:00.000Z',
    timezone: 'Africa/Accra',
    venue_name: 'Accra International Conference Centre',
    address: 'Castle Road',
    city: 'Accra',
    country: 'Ghana',
    is_online: false,
    online_url: null,
    registration_url: 'https://alicetalkworld.org/volunteer.html',
    registration_deadline: '2026-11-01T23:59:59.000Z',
    is_featured: true,
    status: 'published',
    published_at: '2026-01-15T12:00:00.000Z'
  },
  {
    id: 'fallback-evt-2',
    title: 'Alice Talk World @ 5: Anniversary Conference',
    slug: 'atw-5-anniversary-conference',
    category: 'Special Events',
    summary: 'Celebrating five years of empowering young leaders, fostering mentorship, and creating opportunities for impact across Africa.',
    description: {
      text: 'Under the theme "Shaping the Future: Leadership, Innovation and Global Impact", the landmark 5th anniversary conference gathered hundreds of delegates, speakers, and ecosystem partners at the British Council in Accra.'
    },
    cover_image_url: '/images/atw/795A9243.jpg',
    start_at: '2025-07-04T09:00:00.000Z',
    end_at: '2025-07-04T17:00:00.000Z',
    timezone: 'Africa/Accra',
    venue_name: 'British Council',
    address: 'Liberation Road',
    city: 'Accra',
    country: 'Ghana',
    is_online: false,
    online_url: null,
    registration_url: null,
    registration_deadline: null,
    is_featured: true,
    status: 'published',
    published_at: '2025-06-01T12:00:00.000Z'
  },
  {
    id: 'fallback-evt-3',
    title: 'Inspire Conference: The Future is Now — Embracing AI',
    slug: 'inspire-conference-knust',
    category: 'Technology & Innovation',
    summary: 'Challenging students and youth to adapt to the artificial intelligence revolution as a catalyst for innovation and employment.',
    description: {
      text: 'Held at the Kwame Nkrumah University of Science and Technology (KNUST), this conference featured keynote presentations from industry titans on AI upskilling, personal branding, and ethical tech adoption.'
    },
    cover_image_url: '/images/atw/IMG_4473.JPG',
    start_at: '2025-08-06T10:00:00.000Z',
    end_at: '2025-08-06T16:00:00.000Z',
    timezone: 'Africa/Accra',
    venue_name: 'Great Hall, KNUST',
    address: 'KNUST Campus',
    city: 'Kumasi',
    country: 'Ghana',
    is_online: false,
    online_url: null,
    registration_url: null,
    registration_deadline: null,
    is_featured: false,
    status: 'published',
    published_at: '2025-07-15T12:00:00.000Z'
  }
];
