// Fallback homepage news data.
// Used ONLY when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set.
// Mirrors the 4 hardcoded stories previously in App.jsx.

export const fallbackFeaturedStory = {
  id: 'atw-5-anniversary',
  slug: 'atw-5-anniversary',
  title: 'Alice Talk World @ 5: Anniversary Conference at the British Council',
  excerpt:
    'Alice Talk World celebrated five years of Change, Empowerment and Impact with a milestone anniversary conference at the British Council in Accra. Under the theme "Shaping the Future: Leadership, Innovation and Global Impact."',
  category: 'Events',
  author: 'Alice Talk World Editorial',
  cover: '/images/atw/795A9243.jpg',
  date: 'Jul 04, 2025',
  isFeatured: true,
};

export const fallbackLatestStories = [
  {
    id: 'youth-panel-african-leadership',
    slug: 'youth-panel-african-leadership',
    title: 'Youth Panel: Shaping the Future of African Leadership',
    excerpt:
      'The Youth Panel brought together dynamic young leaders including Dr Ekua Amoako, Alfred Eli Dei, Dr Khadija Owusu, Paa Kwesi Foison and Mariam Majeed, with David Quaye as moderator.',
    category: 'Leadership',
    author: 'Alice Talk World Editorial',
    cover: '/images/atw/YOUTH PANEL - WEBSITE.jpg',
    date: 'Nov 01, 2025',
    isFeatured: false,
  },
  {
    id: 'high-level-panel-policy-innovation',
    slug: 'high-level-panel-policy-innovation',
    title: 'High Level Panel: Policy, Innovation & Global Impact',
    excerpt:
      'On the high level panel, leaders discussed how policy, innovation and partnerships can unlock opportunities for young people, moderated by Mrs Belinda Boadu.',
    category: 'Partnerships',
    author: 'Alice Talk World Editorial',
    cover: '/images/atw/HIGH LEVEL PANEL - WEBSITE.jpg',
    date: 'Nov 01, 2025',
    isFeatured: false,
  },
  {
    id: 'partnership-mtn-nokofio-2026',
    slug: 'partnership-mtn-nokofio-2026',
    title: 'Announcing 2026 Cohort Partnerships with MTN and Nokofio',
    excerpt:
      'Alice Talk World is thrilled to announce strategic partnerships with MTN and Nokofio to power digital literacy and financial masterclasses for our next cohort.',
    category: 'Announcements',
    author: 'Alice Talk World Editorial',
    cover: '/images/atw/nokofio-logo.png',
    date: 'Jan 15, 2026',
    isFeatured: false,
  },
];
