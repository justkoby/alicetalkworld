import React, { useState } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Images, Calendar, ArrowRight, Camera, ExternalLink, ChevronDown } from 'lucide-react';
import './MediaCenterPage.css';

// ─── Album Data ───────────────────────────────────────────────────────────────
// Each album links to its real Google Drive / Google Photos folder.
const albums = [
  {
    id: 1,
    title: 'ATW @5 Anniversary Event',
    description:
      'Celebrating five years of empowering young leaders, fostering mentorship, and creating opportunities for impact — a landmark anniversary event.',
    category: 'special',
    categoryLabel: 'Special Event',
    date: '2025',
    cover: '/images/atw/795A9243.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1FOt2W3og2saHxQ1Zao_KVDUb_E434xmb',
  },
  {
    id: 2,
    title: 'Alice Talk World Conference 2024',
    description:
      'Bringing together young leaders, professionals, and changemakers to inspire dialogue, collaboration, and growth across Africa.',
    category: 'leadership',
    categoryLabel: 'Leadership Conference',
    date: '2024',
    cover: '/images/atw/2024-conference.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/146eg98cPIBrJtOffvXd3WUxmi6q7QTqf',
  },
  {
    id: 3,
    title: 'Alice Talk World Conference 2023',
    description:
      'A defining moment for youth leadership in West Africa — bringing together emerging changemakers, mentors, and innovators for a full day of inspiration.',
    category: 'leadership',
    categoryLabel: 'Leadership Conference',
    date: '2023',
    cover: '/images/atw/bg-12.jpg',
    albumUrl:
      'https://photos.google.com/share/AF1QipNzUopTJZtT7jbj3afA8_S4KeUGZMWXoufR9MwrqoeJhO1b2lMNSDbXDfIq0ngv-g?key=dURsNU9JQjR1Z01MYmRIeXZ5alE3bFBDU2pzdi1n',
  },
  {
    id: 4,
    title: 'Cape Coast (UCC) — Pioneers of Change Conference',
    description:
      'Empowering students at the University of Cape Coast through our Pioneers of Change conference series, igniting leadership potential on campus.',
    category: 'campus',
    categoryLabel: 'Campus Engagement',
    date: '2024',
    cover: '/images/atw/bg-16.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1OirKAkwnYUsKXbpLcjdlwEKBwmGJE_z5',
  },
  {
    id: 5,
    title: 'Kumasi (KNUST) — Inspire Conference 1.0',
    description:
      'The inaugural Inspire Conference at KNUST united science and tech students with industry mentors, sparking bold conversations about Africa\'s future.',
    category: 'campus',
    categoryLabel: 'Campus Engagement',
    date: '2024',
    cover: '/images/atw/bg-14.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1E9JaSC7LhNXpr0-E-X4iDOOfls5NjE6Z',
  },
  {
    id: 6,
    title: 'Breast Cancer Awareness Campaign',
    description:
      'Mobilizing young leaders to run awareness sessions, conduct screenings, and support women — coupling health education with local advocacy to break taboos.',
    category: 'women',
    categoryLabel: 'Women Empowerment',
    date: '2024',
    cover: '/images/atw/breast.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1QFp21ZNmSvio9JIdur4mdXd5CQTsxAmi',
  },
  {
    id: 7,
    title: 'Tamale — Leadership Conference',
    description:
      'Taking leadership development to Northern Ghana, this conference equipped young people from Tamale with the tools, networks, and confidence to lead.',
    category: 'leadership',
    categoryLabel: 'Leadership Conference',
    date: '2024',
    cover: '/images/atw/3.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1MAW2SFeQhyn82IN7PzoAsYvrNZMhYbgA',
  },
  {
    id: 8,
    title: 'Tamale — Group Excursion',
    description:
      'Delivering hygiene resources, conducting peer workshops, and building sustainable health awareness pathways for communities and young girls in Northern Ghana.',
    category: 'community',
    categoryLabel: 'Community Outreach',
    date: '2024',
    cover: '/images/atw/1.jpg',
    albumUrl: 'https://drive.google.com/drive/folders/1b4BNYoGwuIPaRk08IsLSyldrmnxfZ9IJ',
  },
];

// ─── Category Filter Config ───────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'leadership', label: 'Leadership Conferences' },
  { id: 'campus', label: 'Campus Engagements' },
  { id: 'women', label: 'Women Empowerment' },
  { id: 'community', label: 'Community Outreach' },
  { id: 'special', label: 'Special Events' },
];

// Badge variant mapping
const badgeClass = {
  special: 'mc-badge-special',
  leadership: 'mc-badge-leadership',
  campus: 'mc-badge-campus',
  women: 'mc-badge-women',
  community: 'mc-badge-community',
};

// Open album in new tab
const openAlbum = (url) => window.open(url, '_blank', 'noopener,noreferrer');

// ─── Main Page Component ──────────────────────────────────────────────────────
const MediaCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Featured = ATW @5 (first album)
  const featuredAlbum = albums[0];

  const filteredAlbums =
    activeCategory === 'all'
      ? albums
      : albums.filter((a) => a.category === activeCategory);

  const countFor = (catId) =>
    catId === 'all' ? albums.length : albums.filter((a) => a.category === catId).length;

  // ── Collage image sets (3 columns, doubled for seamless loop) ──────────────
  const col1 = [
    '/images/atw/795A9243.jpg',
    '/images/atw/breast.jpg',
    '/images/atw/bg-16.jpg',
    '/images/atw/lenz Addict 219.jpg',
    '/images/atw/bg-4.jpg',
    '/images/atw/3.jpg',
  ];
  const col2 = [
    '/images/atw/2024-conference.jpg',
    '/images/atw/bg-1.jpg',
    '/images/atw/YOUTH PANEL - WEBSITE.jpg',
    '/images/atw/1.jpg',
    '/images/atw/bg-12.jpg',
    '/images/atw/795A8620.jpg',
  ];
  const col3 = [
    '/images/atw/HIGH LEVEL PANEL - WEBSITE.jpg',
    '/images/atw/bg-14.jpg',
    '/images/atw/img-2a.jpg',
    '/images/atw/4a.jpg',
    '/images/atw/795A9195.jpg',
    '/images/atw/Lenz IMG_0098.jpg',
  ];

  return (
    <div className="mc-root">
      <AtwNavbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="mc-hero">
        <div className="mc-hero-bg" />
        <div className="mc-hero-grid-overlay" />

        {/* LEFT: Text panel */}
        <div className="mc-hero-text">
          <div className="mc-hero-eyebrow">MEDIA CENTER</div>
          <h1 className="mc-hero-title">
            Stories of Impact<br />
            <span>in Pictures</span>
          </h1>
          <p className="mc-hero-desc">
            Explore the moments, milestones, conferences, and community
            initiatives shaping Alice Talk World's journey across Africa.
          </p>
          <div className="mc-hero-actions">
            <a href="#mc-albums" className="mc-hero-btn-primary">
              <Camera size={15} /> Browse Albums
            </a>
            <a href="about.html" className="mc-hero-btn-secondary">
              Our Story <ArrowRight size={14} />
            </a>
          </div>
          <nav className="mc-hero-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="media-center.html">Media Center</a>
          </nav>
        </div>

        {/* RIGHT: Scrolling photo collage — fades in via CSS mask-image */}
        <div className="mc-hero-collage" aria-hidden="true">

          {/* Column 1 — slow */}
          <div className="mc-collage-col">
            <div className="mc-collage-track mc-collage-track--up-slow">
              {[...col1, ...col1].map((src, i) => (
                <img key={`c1-${i}`} src={src} alt="" className="mc-collage-img" loading="lazy" />
              ))}
            </div>
          </div>

          {/* Column 2 — medium */}
          <div className="mc-collage-col">
            <div className="mc-collage-track mc-collage-track--up-medium">
              {[...col2, ...col2].map((src, i) => (
                <img key={`c2-${i}`} src={src} alt="" className="mc-collage-img" loading="lazy" />
              ))}
            </div>
          </div>

          {/* Column 3 — fast */}
          <div className="mc-collage-col">
            <div className="mc-collage-track mc-collage-track--up-fast">
              {[...col3, ...col3].map((src, i) => (
                <img key={`c3-${i}`} src={src} alt="" className="mc-collage-img" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENT ───────────────────────────────────────── */}
      <section className="mc-featured-section">
        <div className="mc-section-eyebrow">FEATURED EVENT</div>
        <div
          className="mc-featured-banner"
          onClick={() => openAlbum(featuredAlbum.albumUrl)}
          role="button"
          tabIndex={0}
          aria-label={`View album: ${featuredAlbum.title}`}
          onKeyDown={(e) => e.key === 'Enter' && openAlbum(featuredAlbum.albumUrl)}
        >
          <img
            src={featuredAlbum.cover}
            alt={featuredAlbum.title}
            className="mc-featured-img"
          />
          <div className="mc-featured-overlay" />
          <div className="mc-featured-badge">
            {featuredAlbum.categoryLabel}
          </div>
          <div className="mc-featured-content">
            <div className="mc-featured-text">
              <h2 className="mc-featured-title">{featuredAlbum.title}</h2>
              <p className="mc-featured-desc">{featuredAlbum.description}</p>
            </div>
            <a
              href={featuredAlbum.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mc-featured-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <Camera size={15} />
              View Album
            </a>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ──────────────────────────────────────── */}
      <section className="mc-filter-section">
        <div className="mc-filter-title">Browse by Category</div>
        <div className="mc-filter-tabs" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`mc-filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              id={`mc-tab-${cat.id}`}
            >
              {cat.label}
              <span className="mc-filter-count">{countFor(cat.id)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── ALBUM GRID ───────────────────────────────────────────── */}
      <section id="mc-albums" className="mc-albums-section" aria-live="polite">
        <div className="mc-albums-header">
          <div className="mc-section-eyebrow" style={{ marginBottom: 0 }}>
            PHOTO ALBUMS
          </div>
          <p className="mc-albums-count">
            Showing <strong>{filteredAlbums.length}</strong>{' '}
            {filteredAlbums.length === 1 ? 'album' : 'albums'}
          </p>
        </div>

        {filteredAlbums.length === 0 ? (
          <div className="mc-no-results">
            <div className="mc-no-results-icon">
              <Images size={24} />
            </div>
            <h3>No albums found</h3>
            <p>Try selecting a different category above.</p>
          </div>
        ) : (
          <div className="mc-albums-grid">
            {filteredAlbums.map((album) => (
              <article
                key={album.id}
                className="mc-album-card"
                onClick={() => openAlbum(album.albumUrl)}
                role="button"
                tabIndex={0}
                aria-label={`Open album: ${album.title}`}
                onKeyDown={(e) => e.key === 'Enter' && openAlbum(album.albumUrl)}
              >
                {/* Image */}
                <div className="mc-album-img-wrapper">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="mc-album-img"
                    loading="lazy"
                  />
                  <div className="mc-album-img-overlay" />
                  <div className="mc-album-view-btn">
                    <div className="mc-album-view-pill">
                      <ExternalLink size={12} />
                      View Full Album
                    </div>
                  </div>
                  <div className="mc-album-photo-count">
                    <Camera size={11} />
                    View on Drive
                  </div>
                </div>

                {/* Body */}
                <div className="mc-album-body">
                  <span
                    className={`mc-album-category-badge ${
                      badgeClass[album.category] || 'mc-badge-default'
                    }`}
                  >
                    {album.categoryLabel}
                  </span>
                  <h3 className="mc-album-title">{album.title}</h3>
                  <p className="mc-album-desc">{album.description}</p>
                  <div className="mc-album-meta">
                    <span className="mc-album-date">
                      <Calendar size={12} />
                      {album.date}
                    </span>
                    <a
                      href={album.albumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mc-album-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Photos <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <AtwFooter />
    </div>
  );
};

export default MediaCenterPage;
