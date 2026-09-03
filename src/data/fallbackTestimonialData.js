/**
 * Isolated development fallback testimonials data.
 * Used STRICTLY when Supabase credentials are completely missing from the environment.
 * NEVER shown or merged when Supabase is configured.
 */
export const fallbackTestimonials = [
  {
    id: 'fallback-1',
    fullName: 'David Kwadwo',
    roleTitle: 'Senior Software Engineer & ATW Mentor',
    organisation: 'Alice Talk World',
    location: 'Accra, Ghana',
    quote: 'Being a mentor at Alice Talk World allowed me to guide a young developer in Accra. Watching her secure her first engineering role was incredibly rewarding.',
    imageUrl: null,
    displayOrder: 1,
  },
  {
    id: 'fallback-2',
    fullName: 'Gifty Amah',
    roleTitle: 'Operations Consultant & ATW Mentor',
    organisation: 'Alice Talk World',
    location: 'Lagos, Nigeria',
    quote: 'The monthly sessions are structured yet flexible. It is a fantastic network of professionals who are genuinely dedicated to lifting others up.',
    imageUrl: null,
    displayOrder: 2,
  },
  {
    id: 'fallback-3',
    fullName: 'Alice Mensah',
    roleTitle: 'Mentee & Youth Founder',
    organisation: 'Alice Talk World',
    location: 'Kumasi, Ghana',
    quote: 'My mentor helped me refine my business plan and pitching style. Today, our startup employs six young people, and that started with a simple intro chat.',
    imageUrl: null,
    displayOrder: 3,
  },
];
