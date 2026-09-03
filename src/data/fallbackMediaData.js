// Fallback hardcoded album data.
// Used ONLY when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set.
// Category values match the labels stored in Supabase: full human-readable strings.

export const fallbackAlbums = [
  {
    id: 'fallback-1',
    title: 'ATW @5 Anniversary Event',
    description:
      'Celebrating five years of empowering young leaders, fostering mentorship, and creating opportunities for impact — a landmark anniversary event.',
    category: 'Special Event',
    date: '2025',
    cover: '/images/atw/795A9243.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1FOt2W3og2saHxQ1Zao_KVDUb_E434xmb',
    images: [],
    isFeatured: true,
    displayOrder: 1,
  },
  {
    id: 'fallback-2',
    title: 'Alice Talk World Conference 2024',
    description:
      'Bringing together young leaders, professionals, and changemakers to inspire dialogue, collaboration, and growth across Africa.',
    category: 'Leadership Conference',
    date: '2024',
    cover: '/images/atw/2024-conference.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/146eg98cPIBrJtOffvXd3WUxmi6q7QTqf',
    images: [],
    isFeatured: false,
    displayOrder: 2,
  },
  {
    id: 'fallback-3',
    title: 'Alice Talk World Conference 2023',
    description:
      'A defining moment for youth leadership in West Africa — bringing together emerging changemakers, mentors, and innovators for a full day of inspiration.',
    category: 'Leadership Conference',
    date: '2023',
    cover: '/images/atw/bg-12.jpg',
    albumUrl:
      'https://photos.google.com/share/AF1QipNzUopTJZtT7jbj3afA8_S4KeUGZMWXoufR9MwrqoeJhO1b2lMNSDbXDfIq0ngv-g?key=dURsNU9JQjR1Z01MYmRIeXZ5alE3bFBDU2pzdi1n',
    images: [],
    isFeatured: false,
    displayOrder: 3,
  },
  {
    id: 'fallback-4',
    title: 'Cape Coast (UCC) — Pioneers of Change Conference',
    description:
      'Empowering students at the University of Cape Coast through our Pioneers of Change conference series, igniting leadership potential on campus.',
    category: 'Campus Engagement',
    date: '2024',
    cover: '/images/atw/bg-16.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1OirKAkwnYUsKXbpLcjdlwEKBwmGJE_z5',
    images: [],
    isFeatured: false,
    displayOrder: 4,
  },
  {
    id: 'fallback-5',
    title: 'Kumasi (KNUST) — Inspire Conference 1.0',
    description:
      "The inaugural Inspire Conference at KNUST united science and tech students with industry mentors, sparking bold conversations about Africa's future.",
    category: 'Campus Engagement',
    date: '2024',
    cover: '/images/atw/bg-14.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1E9JaSC7LhNXpr0-E-X4iDOOfls5NjE6Z',
    images: [],
    isFeatured: false,
    displayOrder: 5,
  },
  {
    id: 'fallback-6',
    title: 'Breast Cancer Awareness Campaign',
    description:
      'Mobilizing young leaders to run awareness sessions, conduct screenings, and support women — coupling health education with local advocacy to break taboos.',
    category: 'Women Empowerment',
    date: '2024',
    cover: '/images/atw/breast.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1QFp21ZNmSvio9JIdur4mdXd5CQTsxAmi',
    images: [],
    isFeatured: false,
    displayOrder: 6,
  },
  {
    id: 'fallback-7',
    title: 'Tamale — Leadership Conference',
    description:
      'Taking leadership development to Northern Ghana, this conference equipped young people from Tamale with the tools, networks, and confidence to lead.',
    category: 'Leadership Conference',
    date: '2024',
    cover: '/images/atw/3.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1MAW2SFeQhyn82IN7PzoAsYvrNZMhYbgA',
    images: [],
    isFeatured: false,
    displayOrder: 7,
  },
  {
    id: 'fallback-8',
    title: 'Tamale — Group Excursion',
    description:
      'Delivering hygiene resources, conducting peer workshops, and building sustainable health awareness pathways for communities and young girls in Northern Ghana.',
    category: 'Community Outreach',
    date: '2024',
    cover: '/images/atw/1.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1b4BNYoGwuIPaRk08IsLSyldrmnxfZ9IJ',
    images: [],
    isFeatured: false,
    displayOrder: 8,
  },
];

// Static collage image lists — used in fallback mode when no Supabase data is available.
export const fallbackCollage = {
  col1: [
    '/images/atw/795A9243.jpg',
    '/images/atw/breast.jpg',
    '/images/atw/bg-16.jpg',
    '/images/atw/lenz Addict 219.jpg',
    '/images/atw/bg-4.jpg',
    '/images/atw/3.jpg',
  ],
  col2: [
    '/images/atw/2024-conference.jpg',
    '/images/atw/bg-1.jpg',
    '/images/atw/YOUTH PANEL - WEBSITE.jpg',
    '/images/atw/1.jpg',
    '/images/atw/bg-12.jpg',
    '/images/atw/795A8620.jpg',
  ],
  col3: [
    '/images/atw/HIGH LEVEL PANEL - WEBSITE.jpg',
    '/images/atw/bg-14.jpg',
    '/images/atw/img-2a.jpg',
    '/images/atw/4a.jpg',
    '/images/atw/795A9195.jpg',
    '/images/atw/Lenz IMG_0098.jpg',
  ],
};
