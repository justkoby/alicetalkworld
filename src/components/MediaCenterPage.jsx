import React, { useState, useEffect, useCallback, useRef } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Images, Calendar, ArrowRight, Camera, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPublishedAlbums } from '../services/mediaService';
import { fallbackAlbums, fallbackCollage } from '../data/fallbackMediaData';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import './MediaCenterPage.css';

// ─── Badge class mapping ───────────────────────────────────────────────────────
// Keys match the full category labels stored in Supabase.
const badgeClassFor = (category) => {
  if (!category) return 'mc-badge-default';
  const c = category.toLowerCase();
  if (c.includes('special')) return 'mc-badge-special';
  if (c.includes('leadership')) return 'mc-badge-leadership';
  if (c.includes('campus')) return 'mc-badge-campus';
  if (c.includes('women')) return 'mc-badge-women';
  if (c.includes('community')) return 'mc-badge-community';
  return 'mc-badge-default';
};

// Safe external album opener.
const openAlbum = (url) => window.open(url, '_blank', 'noopener,noreferrer');

// Build collage columns from available cover images, repeating to fill desired length.
const buildCollageColumn = (covers, length = 6) => {
  const valid = covers.filter(Boolean);
  if (valid.length === 0) return [];
  const result = [];
  while (result.length < length) {
    result.push(...valid);
  }
  return result.slice(0, length);
};

// ─── Skeleton Components ───────────────────────────────────────────────────────
const FeaturedSkeleton = () => (
  <div className="mc-featured-banner mc-skeleton-card" aria-hidden="true" style={{ cursor: 'default' }}>
    <div className="mc-featured-img mc-skeleton-shimmer" style={{ position: 'static', width: '100%', height: '100%' }} />
    <div className="mc-featured-content">
      <div className="mc-featured-text">
        <div className="mc-skeleton-line" style={{ height: 16, width: '25%', marginBottom: 12 }} />
        <div className="mc-skeleton-line" style={{ height: 28, width: '65%', marginBottom: 10 }} />
        <div className="mc-skeleton-line" style={{ height: 14, width: '80%', marginBottom: 6 }} />
        <div className="mc-skeleton-line" style={{ height: 14, width: '60%' }} />
      </div>
    </div>
  </div>
);

const AlbumCardSkeleton = () => (
  <article className="mc-album-card mc-skeleton-card" style={{ cursor: 'default' }} aria-hidden="true">
    <div className="mc-album-img-wrapper mc-skeleton-shimmer" style={{ height: 220 }} />
    <div className="mc-album-body">
      <div className="mc-skeleton-line" style={{ height: 14, width: '35%', marginBottom: 10 }} />
      <div className="mc-skeleton-line" style={{ height: 20, width: '80%', marginBottom: 8 }} />
      <div className="mc-skeleton-line" style={{ height: 13, width: '95%', marginBottom: 4 }} />
      <div className="mc-skeleton-line" style={{ height: 13, width: '70%', marginBottom: 16 }} />
      <div className="mc-skeleton-line" style={{ height: 13, width: '40%' }} />
    </div>
  </article>
);

// ─── Internal Gallery Modal ────────────────────────────────────────────────────
const GalleryModal = ({ album, onClose }) => {
  const [index, setIndex] = useState(0);
  const overlayRef = useRef(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + album.images.length) % album.images.length), [album.images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % album.images.length), [album.images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  if (!album.images.length) return null;

  return (
    <div
      className="mc-gallery-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery: ${album.title}`}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <button className="mc-gallery-close" onClick={onClose} aria-label="Close gallery">
        <X size={22} />
      </button>
      <button className="mc-gallery-nav mc-gallery-nav--prev" onClick={prev} aria-label="Previous image">
        <ChevronLeft size={28} />
      </button>
      <div className="mc-gallery-content">
        <img
          src={album.images[index]}
          alt={`${album.title} — image ${index + 1} of ${album.images.length}`}
          className="mc-gallery-img"
        />
        <p className="mc-gallery-counter">{index + 1} / {album.images.length}</p>
      </div>
      <button className="mc-gallery-nav mc-gallery-nav--next" onClick={next} aria-label="Next image">
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────
const MediaCenterPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [galleryAlbum, setGalleryAlbum] = useState(null);

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getPublishedAlbums();
    if (result.isFallback) {
      setIsFallback(true);
      setAlbums(fallbackAlbums);
    } else if (result.error) {
      setError(result.error);
      setAlbums([]);
      setIsFallback(false);
    } else {
      setIsFallback(false);
      setAlbums(result.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  // ── Featured album ──────────────────────────────────────────────────────────
  const featuredAlbum = albums.find((a) => a.isFeatured) || albums[0] || null;

  // ── Category filter options — derived from returned albums ─────────────────
  const categoryOptions = (() => {
    const seen = new Set();
    const cats = [{ id: 'all', label: 'All Events' }];
    albums.forEach((a) => {
      if (a.category && !seen.has(a.category)) {
        seen.add(a.category);
        cats.push({ id: a.category, label: a.category });
      }
    });
    return cats;
  })();

  const countFor = (catId) =>
    catId === 'all' ? albums.length : albums.filter((a) => a.category === catId).length;

  // ── Filtered albums — excludes the featured album from the grid ─────────────
  const gridAlbums = (() => {
    const base =
      activeCategory === 'all'
        ? albums
        : albums.filter((a) => a.category === activeCategory);
    // Remove featured from grid to avoid duplication, unless filter is active
    // and would result in zero grid items.
    if (featuredAlbum && activeCategory === 'all') {
      const withoutFeatured = base.filter((a) => a.id !== featuredAlbum.id);
      // Only de-duplicate in "all" view; keep in category-filtered view.
      return withoutFeatured;
    }
    return base;
  })();

  // ── Collage columns ─────────────────────────────────────────────────────────
  const collageCovers = albums
    .map((a) => a.cover)
    .filter(Boolean);

  const useStaticCollage = isFallback || collageCovers.length === 0;

  const col1 = useStaticCollage
    ? fallbackCollage.col1
    : buildCollageColumn(collageCovers.slice(0, Math.ceil(collageCovers.length / 3)), 6);
  const col2 = useStaticCollage
    ? fallbackCollage.col2
    : buildCollageColumn(
        collageCovers.slice(
          Math.ceil(collageCovers.length / 3),
          Math.ceil((2 * collageCovers.length) / 3)
        ),
        6
      );
  const col3 = useStaticCollage
    ? fallbackCollage.col3
    : buildCollageColumn(collageCovers.slice(Math.ceil((2 * collageCovers.length) / 3)), 6);

  // ── Album action handler ────────────────────────────────────────────────────
  const handleAlbumAction = (album, e) => {
    if (e) e.stopPropagation();
    if (album.albumUrl) {
      openAlbum(album.albumUrl);
    } else if (album.images.length > 0) {
      setGalleryAlbum(album);
    }
    // Neither available → no action (button/link is hidden or disabled).
  };

  const hasAction = (album) => Boolean(album?.albumUrl) || (album?.images?.length > 0);

  // ── Render ──────────────────────────────────────────────────────────────────
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

        {/* RIGHT: Scrolling photo collage */}
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

        {loading ? (
          <FeaturedSkeleton />
        ) : error ? (
          <div className="mc-notice-box">
            <p>Unable to load the featured album.</p>
            <button onClick={loadAlbums} className="mc-retry-btn">Retry</button>
          </div>
        ) : !featuredAlbum ? (
          <div className="mc-notice-box"><p>No featured albums available.</p></div>
        ) : (
          <div
            className="mc-featured-banner"
            onClick={hasAction(featuredAlbum) ? () => handleAlbumAction(featuredAlbum, null) : undefined}
            role={hasAction(featuredAlbum) ? 'button' : undefined}
            tabIndex={hasAction(featuredAlbum) ? 0 : undefined}
            aria-label={hasAction(featuredAlbum) ? `View album: ${featuredAlbum.title}` : undefined}
            onKeyDown={hasAction(featuredAlbum) ? (e) => e.key === 'Enter' && handleAlbumAction(featuredAlbum, null) : undefined}
            style={!hasAction(featuredAlbum) ? { cursor: 'default' } : undefined}
          >
            {featuredAlbum.cover ? (
              <img
                src={featuredAlbum.cover}
                alt={featuredAlbum.title}
                className="mc-featured-img"
              />
            ) : (
              <div className="mc-featured-img mc-cover-missing" aria-hidden="true" />
            )}
            <div className="mc-featured-overlay" />
            <div className="mc-featured-badge">{featuredAlbum.category}</div>
            <div className="mc-featured-content">
              <div className="mc-featured-text">
                <h2 className="mc-featured-title">{featuredAlbum.title}</h2>
                <p className="mc-featured-desc">{featuredAlbum.description}</p>
              </div>
              {featuredAlbum.albumUrl ? (
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
              ) : featuredAlbum.images.length > 0 ? (
                <button
                  className="mc-featured-btn"
                  onClick={(e) => { e.stopPropagation(); setGalleryAlbum(featuredAlbum); }}
                >
                  <Camera size={15} />
                  View Photos
                </button>
              ) : null}
            </div>
          </div>
        )}
      </section>

      {/* ── CATEGORY FILTER ──────────────────────────────────────── */}
      <section className="mc-filter-section">
        <div className="mc-filter-title">Browse by Category</div>
        <div className="mc-filter-tabs" role="tablist">
          {loading ? (
            // Show only "All Events" as placeholder during load
            <button className="mc-filter-tab active" role="tab" aria-selected="true" id="mc-tab-all">
              All Events <span className="mc-filter-count">—</span>
            </button>
          ) : (
            categoryOptions.map((cat) => (
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
            ))
          )}
        </div>
      </section>

      {/* ── ALBUM GRID ───────────────────────────────────────────── */}
      <section id="mc-albums" className="mc-albums-section" aria-live="polite">
        <div className="mc-albums-header">
          <div className="mc-section-eyebrow" style={{ marginBottom: 0 }}>
            PHOTO ALBUMS
          </div>
          {!loading && !error && (
            <p className="mc-albums-count">
              Showing <strong>{gridAlbums.length}</strong>{' '}
              {gridAlbums.length === 1 ? 'album' : 'albums'}
            </p>
          )}
        </div>

        {loading ? (
          <div className="mc-albums-grid">
            <AlbumCardSkeleton />
            <AlbumCardSkeleton />
            <AlbumCardSkeleton />
            <AlbumCardSkeleton />
            <AlbumCardSkeleton />
            <AlbumCardSkeleton />
          </div>
        ) : error ? (
          <div className="mc-notice-box">
            <p>Unable to load albums right now.</p>
            <button onClick={loadAlbums} className="mc-retry-btn">Retry</button>
          </div>
        ) : gridAlbums.length === 0 && isSupabaseConfigured ? (
          <div className="mc-no-results">
            <div className="mc-no-results-icon"><Images size={24} /></div>
            <h3>No albums found</h3>
            <p>
              {activeCategory === 'all'
                ? 'No published albums are available at this time.'
                : 'Try selecting a different category above.'}
            </p>
          </div>
        ) : gridAlbums.length === 0 ? (
          <div className="mc-no-results">
            <div className="mc-no-results-icon"><Images size={24} /></div>
            <h3>No albums found</h3>
            <p>Try selecting a different category above.</p>
          </div>
        ) : (
          <div className="mc-albums-grid">
            {gridAlbums.map((album) => (
              <article
                key={album.id}
                className="mc-album-card"
                onClick={hasAction(album) ? (e) => handleAlbumAction(album, e) : undefined}
                role={hasAction(album) ? 'button' : undefined}
                tabIndex={hasAction(album) ? 0 : undefined}
                aria-label={hasAction(album) ? `Open album: ${album.title}` : undefined}
                onKeyDown={hasAction(album) ? (e) => e.key === 'Enter' && handleAlbumAction(album, e) : undefined}
                style={!hasAction(album) ? { cursor: 'default' } : undefined}
              >
                {/* Image */}
                <div className="mc-album-img-wrapper">
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="mc-album-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="mc-album-img mc-cover-missing" aria-hidden="true" />
                  )}
                  <div className="mc-album-img-overlay" />
                  {hasAction(album) && (
                    <div className="mc-album-view-btn">
                      <div className="mc-album-view-pill">
                        <ExternalLink size={12} />
                        View Full Album
                      </div>
                    </div>
                  )}
                  {album.albumUrl && (
                    <div className="mc-album-photo-count">
                      <Camera size={11} />
                      View on Drive
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="mc-album-body">
                  <span className={`mc-album-category-badge ${badgeClassFor(album.category)}`}>
                    {album.category}
                  </span>
                  <h3 className="mc-album-title">{album.title}</h3>
                  <p className="mc-album-desc">{album.description}</p>
                  <div className="mc-album-meta">
                    <span className="mc-album-date">
                      <Calendar size={12} />
                      {album.date}
                    </span>
                    {album.albumUrl ? (
                      <a
                        href={album.albumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mc-album-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Photos <ArrowRight size={12} />
                      </a>
                    ) : album.images.length > 0 ? (
                      <button
                        className="mc-album-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={(e) => { e.stopPropagation(); setGalleryAlbum(album); }}
                      >
                        View Photos <ArrowRight size={12} />
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <AtwFooter />

      {/* ── Internal Gallery Modal ────────────────────────────────── */}
      {galleryAlbum && galleryAlbum.images.length > 0 && (
        <GalleryModal album={galleryAlbum} onClose={() => setGalleryAlbum(null)} />
      )}
    </div>
  );
};

export default MediaCenterPage;
