import React, { useState, useEffect, useCallback } from 'react';
import AtwNavbar from './components/AtwNavbar';
import AtwHero from './components/AtwHero';
import AtwFooter from './components/AtwFooter';
import { Eye, Target, MapPin, ArrowRight, Users, UserCheck, BookOpen, Handshake } from 'lucide-react';
import { getActivePartners } from './services/partnerService';
import { fallbackPartners } from './data/fallbackPartnerData';
import { getPublishedPosts, resolveHomepagePosts } from './services/newsService';
import { fallbackFeaturedStory, fallbackLatestStories } from './data/fallbackNewsData';
import { getHomepageSection, normalizeGalleryImages } from './services/homepageService';
import { fallbackOrganisationContent } from './data/fallbackOrganisationData';
import { getPublishedProgramsByIds, normalizeProgramImages } from './services/programService';
import { fallbackImpactSection, fallbackImpactPrograms } from './data/fallbackImpactData';
import { fallbackGalleryContent } from './data/fallbackGalleryData';
import './atw.css';

const isExternalUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(url.trim(), window.location.origin);
      return parsed.origin !== window.location.origin;
    } catch {
      return true;
    }
  }
  return false;
};

// Custom Instagram icon since it was deprecated/removed in newer lucide-react versions
const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


// A premium image slider with cross-fade transition
const AtwFadeSlider = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="atw-fade-slider">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`atw-fade-slide ${idx === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
};

// Helper: get up to 2 initials from a partner name
const getPartnerInitials = (name) => {
  if (!name) return 'P';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

function App() {
  // ── Partner data state ──────────────────────────────────────────────────────
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [partnersError, setPartnersError] = useState(null);
  const [failedLogos, setFailedLogos] = useState(new Set());

  const handleLogoError = useCallback((id) => {
    setFailedLogos((prev) => { const s = new Set(prev); s.add(id); return s; });
  }, []);

  const loadPartners = useCallback(async () => {
    setPartnersLoading(true);
    setPartnersError(null);
    const result = await getActivePartners();
    if (result.isFallback) {
      setPartners(fallbackPartners);
    } else if (result.error) {
      setPartnersError(result.error);
      setPartners([]);
    } else {
      setPartners(result.data || []);
    }
    setPartnersLoading(false);
  }, []);

  useEffect(() => { loadPartners(); }, [loadPartners]);

  // ── News data state ─────────────────────────────────────────────────────────
  const [featuredStory, setFeaturedStory] = useState(null);
  const [latestStories, setLatestStories] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const loadNews = useCallback(async () => {
    setNewsLoading(true);
    setNewsError(null);
    try {
      const result = await getPublishedPosts();
      if (result.isFallback) {
        setFeaturedStory(fallbackFeaturedStory);
        setLatestStories(fallbackLatestStories);
      } else if (result.error) {
        setNewsError(result.error);
        setFeaturedStory(null);
        setLatestStories([]);
      } else {
        const { featured, latest } = resolveHomepagePosts(result.data);
        setFeaturedStory(featured);
        setLatestStories(latest);
      }
    } catch {
      setNewsError(new Error('Unexpected error loading news'));
    }
    setNewsLoading(false);
  }, []);

  useEffect(() => { loadNews(); }, [loadNews]);

  // ── Organisation data state ──────────────────────────────────────────────────
  const [orgData, setOrgData] = useState(null);
  const [orgLoading, setOrgLoading] = useState(true);
  const [orgError, setOrgError] = useState(null);

  const loadOrganisation = useCallback(async () => {
    setOrgLoading(true);
    setOrgError(null);
    try {
      const result = await getHomepageSection('organisation');
      if (result.isFallback) {
        setOrgData({ content: fallbackOrganisationContent, is_visible: true });
      } else if (result.error) {
        setOrgError(result.error);
        setOrgData(null);
      } else if (!result.data) {
        setOrgData(null);
      } else {
        setOrgData(result.data);
      }
    } catch {
      setOrgError(new Error('Unexpected error loading organisation section'));
      setOrgData(null);
    } finally {
      setOrgLoading(false);
    }
  }, []);

  useEffect(() => { loadOrganisation(); }, [loadOrganisation]);

  // ── Impact data state ────────────────────────────────────────────────────────
  const [impactSection, setImpactSection] = useState(null);
  const [impactPrograms, setImpactPrograms] = useState([]);
  const [impactLoading, setImpactLoading] = useState(true);
  const [impactError, setImpactError] = useState(null);

  const loadImpact = useCallback(async () => {
    setImpactLoading(true);
    setImpactError(null);
    try {
      const sectionRes = await getHomepageSection('impact');
      if (sectionRes.isFallback) {
        setImpactSection({ content: fallbackImpactSection, is_visible: true });
        setImpactPrograms(fallbackImpactPrograms);
      } else if (sectionRes.error) {
        setImpactError(sectionRes.error);
        setImpactSection(null);
        setImpactPrograms([]);
      } else if (!sectionRes.data) {
        // Section is intentionally hidden (is_visible = false) or not in DB
        setImpactSection(null);
        setImpactPrograms([]);
      } else {
        setImpactSection(sectionRes.data);
        const programIds = Array.isArray(sectionRes.data.content?.program_ids)
          ? sectionRes.data.content.program_ids
          : [];

        if (programIds.length > 0) {
          const progsRes = await getPublishedProgramsByIds(programIds);
          if (progsRes.error) {
            setImpactError(progsRes.error);
            setImpactPrograms([]);
          } else {
            setImpactPrograms(progsRes.data || []);
          }
        } else {
          setImpactPrograms([]);
        }
      }
    } catch {
      setImpactError(new Error('Unexpected error loading impact section'));
      setImpactSection(null);
      setImpactPrograms([]);
    } finally {
      setImpactLoading(false);
    }
  }, []);

  useEffect(() => { loadImpact(); }, [loadImpact]);

  // ── Gallery data state ───────────────────────────────────────────────────────
  const [gallerySection, setGallerySection] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState(null);

  const loadGallery = useCallback(async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const result = await getHomepageSection('gallery');
      if (result.isFallback) {
        setGallerySection({ content: fallbackGalleryContent, is_visible: true });
      } else if (result.error) {
        setGalleryError(result.error);
        setGallerySection(null);
      } else if (!result.data) {
        // Section is intentionally hidden (is_visible = false) or not in DB
        setGallerySection(null);
      } else {
        setGallerySection(result.data);
      }
    } catch {
      setGalleryError(new Error('Unexpected error loading gallery section'));
      setGallerySection(null);
    } finally {
      setGalleryLoading(false);
    }
  }, []);

  useEffect(() => { loadGallery(); }, [loadGallery]);

  // Repeat partners enough times for a seamless infinite loop.
  // Minimum 3× so the CSS animation always has content to loop through.
  const REPEAT = partners.length > 0 ? Math.max(3, Math.ceil(30 / partners.length)) : 3;
  const repeatedPartners = Array.from({ length: REPEAT }, (_, ri) =>
    partners.map((p) => ({ ...p, _key: `${p.id}-${ri}` }))
  ).flat();

  const statsData = [

    { id: 1, number: "5,000+", label: "Youth Reached", icon: <Users size={22} /> },
    { id: 2, number: "100+", label: "Mentors", icon: <UserCheck size={22} /> },
    { id: 3, number: "25+", label: "Programs Delivered", icon: <BookOpen size={22} /> },
    { id: 4, number: "15+", label: "Strategic Partners", icon: <Handshake size={22} /> },
    { id: 5, number: "10+", label: "Communities Impacted", icon: <MapPin size={22} /> }
  ];

  return (
    <div className="atw-root">
      {/* Premium Navigation Header */}
      <AtwNavbar />
      
      {/* Full screen carousel slider with stats bar */}
      <AtwHero />

      {/* OUR PARTNERS & SUPPORTERS */}
      <section className="atw-partners-section">
        <div className="atw-partners-container">
          <div className="atw-partners-label">
            OUR PARTNERS &amp; SUPPORTERS
          </div>

          {partnersLoading && (
            <div className="atw-partners-marquee-container" aria-hidden="true">
              <div className="atw-partners-marquee-track atw-partners-marquee-track--static">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="atw-partner-logo-item atw-partner-skeleton" />
                ))}
              </div>
            </div>
          )}

          {!partnersLoading && partnersError && (
            <div className="atw-partners-notice">
              <p>Unable to load partners.</p>
              <button onClick={loadPartners} className="atw-partners-retry-btn">Retry</button>
            </div>
          )}

          {!partnersLoading && !partnersError && partners.length === 0 && (
            <div className="atw-partners-notice">
              <p>Partner information coming soon.</p>
            </div>
          )}

          {!partnersLoading && !partnersError && partners.length > 0 && (
            <div className="atw-partners-marquee-container">
              <div className="atw-partners-marquee-track">
                {repeatedPartners.map((p) => {
                  const showInitials = !p.logo || failedLogos.has(p.id);
                  const inner = showInitials ? (
                    <div className="atw-partner-initials" aria-label={p.name}>
                      {getPartnerInitials(p.name)}
                    </div>
                  ) : (
                    <img
                      src={p.logo}
                      alt={p.name}
                      onError={() => handleLogoError(p.id)}
                    />
                  );

                  return (
                    <div key={p._key} className="atw-partner-logo-item">
                      {p.website ? (
                        <a
                          href={p.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={p.name}
                          tabIndex={-1}
                        >
                          {inner}
                        </a>
                      ) : inner}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Organisation loading skeleton */}
      {orgLoading && (
        <section className="atw-why-we-exist-section" aria-hidden="true">
          <div className="atw-why-exist-container">
            <div className="atw-why-exist-text-col">
              <div className="atw-org-skeleton-line" style={{ height: 14, width: 140, marginBottom: 16 }} />
              <div className="atw-org-skeleton-line" style={{ height: 32, width: '80%', marginBottom: 24 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '95%', marginBottom: 10 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '90%', marginBottom: 10 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '60%' }} />
            </div>
            <div className="atw-card-mission atw-org-skeleton-card">
              <div className="atw-org-skeleton-box" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 24 }} />
              <div className="atw-org-skeleton-line" style={{ height: 22, width: 120, marginBottom: 16 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '90%', marginBottom: 8 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '70%' }} />
            </div>
            <div className="atw-card-vision atw-org-skeleton-card">
              <div className="atw-org-skeleton-box" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 24 }} />
              <div className="atw-org-skeleton-line" style={{ height: 22, width: 120, marginBottom: 16 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '90%', marginBottom: 8 }} />
              <div className="atw-org-skeleton-line" style={{ height: 14, width: '70%' }} />
            </div>
          </div>
        </section>
      )}

      {/* Organisation error retry notice */}
      {!orgLoading && orgError && (
        <section className="atw-why-we-exist-section" aria-label="Organisation section notice">
          <div className="atw-org-notice">
            <p>Unable to load organisation information at this time.</p>
            <button type="button" onClick={loadOrganisation} className="atw-org-retry-btn">
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Organisation section (rendered only when visible and loaded) */}
      {!orgLoading && !orgError && orgData && (() => {
        const c = orgData.content || {};
        const eyebrow = typeof c.eyebrow === 'string' ? c.eyebrow.trim() : '';
        const orgName = typeof c.organisation_name === 'string' ? c.organisation_name.trim() : '';
        const intro = typeof c.introduction === 'string' ? c.introduction.trim() : '';
        const missionTitle = typeof c.mission_title === 'string' ? c.mission_title.trim() : '';
        const missionText = typeof c.mission_text === 'string' ? c.mission_text.trim() : '';
        const visionTitle = typeof c.vision_title === 'string' ? c.vision_title.trim() : '';
        const visionText = typeof c.vision_text === 'string' ? c.vision_text.trim() : '';

        const hasTextCol = Boolean(eyebrow || orgName || intro);
        const hasMission = Boolean(missionTitle || missionText);
        const hasVision = Boolean(visionTitle || visionText);

        if (!hasTextCol && !hasMission && !hasVision) return null;

        const introParagraphs = intro ? intro.split(/\n\s*\n/).filter(Boolean) : [];

        return (
          <section className="atw-why-we-exist-section">
            <div className="atw-why-exist-container">
              {/* Left Column: Text Content */}
              {hasTextCol && (
                <div className="atw-why-exist-text-col">
                  {eyebrow && <span className="atw-why-exist-tagline">{eyebrow}</span>}
                  {orgName && <h2 className="atw-why-exist-main-statement">{orgName}</h2>}
                  {introParagraphs.map((para, idx) => (
                    <p key={idx} className="atw-why-exist-supporting">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Middle Column: Mission Card */}
              {hasMission && (
                <div className="atw-card-mission">
                  <div className="atw-card-icon-wrapper mission-icon" aria-hidden="true">
                    <Target size={24} aria-hidden="true" />
                  </div>
                  {missionTitle && <h3 className="atw-card-title mission-title">{missionTitle}</h3>}
                  {missionText && (
                    <p className="atw-card-text mission-text">
                      {missionText}
                    </p>
                  )}
                </div>
              )}

              {/* Right Column: Vision Card */}
              {hasVision && (
                <div className="atw-card-vision">
                  <div className="atw-card-icon-wrapper vision-icon" aria-hidden="true">
                    <Eye size={24} aria-hidden="true" />
                  </div>
                  {visionTitle && <h3 className="atw-card-title vision-title">{visionTitle}</h3>}
                  {visionText && (
                    <p className="atw-card-text vision-text">
                      {visionText}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Impact loading skeleton */}
      {impactLoading && (
        <section className="atw-impact-section" aria-hidden="true">
          <div className="atw-impact-header">
            <div className="atw-impact-skeleton-line" style={{ height: 32, width: '40%', margin: '0 auto 16px auto' }} />
            <div className="atw-impact-skeleton-line" style={{ height: 16, width: '70%', margin: '0 auto 10px auto' }} />
            <div className="atw-impact-skeleton-line" style={{ height: 16, width: '50%', margin: '0 auto 24px auto' }} />
            <div className="atw-impact-skeleton-line" style={{ height: 18, width: 180, margin: '0 auto' }} />
          </div>
          {Array.from({ length: 4 }).map((_, i) => {
            const isEven = i % 2 === 0;
            const imgSkeleton = (
              <div className="atw-impact-image-container atw-impact-skeleton-img" />
            );
            const contentSkeleton = (
              <div className="atw-impact-content-col">
                <div className="atw-impact-skeleton-line" style={{ height: 14, width: 120, marginBottom: 12 }} />
                <div className="atw-impact-skeleton-line" style={{ height: 28, width: '75%', marginBottom: 16 }} />
                <div className="atw-impact-skeleton-line" style={{ height: 14, width: '100%', marginBottom: 8 }} />
                <div className="atw-impact-skeleton-line" style={{ height: 14, width: '95%', marginBottom: 8 }} />
                <div className="atw-impact-skeleton-line" style={{ height: 14, width: '80%', marginBottom: 20 }} />
                <div className="atw-impact-skeleton-line" style={{ height: 36, width: 160, borderRadius: 6 }} />
              </div>
            );
            return (
              <div key={i} className="atw-impact-row">
                {isEven ? (
                  <>
                    {imgSkeleton}
                    {contentSkeleton}
                  </>
                ) : (
                  <>
                    {contentSkeleton}
                    {imgSkeleton}
                  </>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* Impact error retry notice */}
      {!impactLoading && impactError && (
        <section className="atw-impact-section" aria-label="Impact section notice">
          <div className="atw-impact-notice">
            <p>Unable to load impact initiatives right now.</p>
            <button onClick={loadImpact} className="atw-impact-retry-btn">
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Impact configured-empty state */}
      {!impactLoading && !impactError && impactSection && impactPrograms.length === 0 && (
        <section className="atw-impact-section" aria-label="Impact initiatives">
          <div className="atw-impact-notice">
            <p>No impact initiatives are currently featured.</p>
          </div>
        </section>
      )}

      {/* Impact section (rendered only when visible, loaded, and has programs) */}
      {!impactLoading && !impactError && impactSection && impactPrograms.length > 0 && (() => {
        const c = impactSection.content || {};
        const heading = typeof c.heading === 'string' ? c.heading.trim() : 'Our Impact: 5 Years and Growing';
        const description = typeof c.description === 'string' ? c.description.trim() : '';
        const buttonLabel = typeof c.button_label === 'string' ? c.button_label.trim() : '';
        const buttonUrl = typeof c.button_url === 'string' ? c.button_url.trim() : '';

        return (
          <section className="atw-impact-section">
            <div className="atw-impact-header">
              {heading && <h2 className="atw-impact-title">{heading}</h2>}
              {description && <p className="atw-impact-subtitle">{description}</p>}
              {buttonLabel && buttonUrl && (
                <a href={buttonUrl} className="atw-impact-header-link">
                  {buttonLabel}
                </a>
              )}
            </div>

            {impactPrograms.map((program, index) => {
              const images = normalizeProgramImages(program);
              const isEven = index % 2 === 0;

              const descText =
                typeof program.description === 'object' && program.description !== null
                  ? program.description.text || ''
                  : typeof program.description === 'string'
                  ? program.description
                  : '';

              const tags =
                typeof program.description === 'object' &&
                program.description !== null &&
                Array.isArray(program.description.tags)
                  ? program.description.tags.filter((t) => typeof t === 'string' && t.trim().length > 0)
                  : [];

              const descParagraphs = descText ? descText.split(/\n\s*\n/).filter(Boolean) : [];

              const hasExternalUrl =
                typeof program.external_url === 'string' && program.external_url.trim().length > 0;

              const ctaLabel =
                program.slug === 'atw-5-highlights' ? 'View 2025 Highlights' : 'Learn More';

              const imageBlock = (
                <div className="atw-impact-image-container">
                  <AtwFadeSlider images={images} />
                </div>
              );

              const contentBlock = (
                <div className="atw-impact-content-col">
                  {program.location && (
                    <span className="atw-impact-location">
                      <MapPin size={14} style={{ marginRight: '4px' }} aria-hidden="true" /> {program.location}
                    </span>
                  )}
                  {program.title && <h3 className="atw-impact-row-title">{program.title}</h3>}
                  {descParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className="atw-impact-row-text">
                      {para}
                    </p>
                  ))}
                  {tags.length > 0 && (
                    <div className="atw-impact-tags-wrapper">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className="atw-impact-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {hasExternalUrl && (
                    <a
                      href={program.external_url.trim()}
                      className="atw-btn-outline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {ctaLabel}
                    </a>
                  )}
                </div>
              );

              return (
                <div key={program.id || program.slug || index} className="atw-impact-row">
                  {isEven ? (
                    <>
                      {imageBlock}
                      {contentBlock}
                    </>
                  ) : (
                    <>
                      {contentBlock}
                      {imageBlock}
                    </>
                  )}
                </div>
              );
            })}
          </section>
        );
      })()}

      {/* White background section with Latest News */}
      <section className="atw-news-section">
        <div className="atw-news-container">
          <div className="atw-news-header">
            <span className="atw-news-tagline">Stories of Impact</span>
            <h2 className="atw-news-title">News & Insights</h2>
            <div className="atw-news-divider"></div>
          </div>

          {/* Error state */}
          {!newsLoading && newsError && (
            <div className="atw-news-notice">
              <p>Unable to load stories right now.</p>
              <button onClick={loadNews} className="atw-news-retry-btn">Retry</button>
            </div>
          )}

          {/* Empty state — configured Supabase returned nothing */}
          {!newsLoading && !newsError && !featuredStory && latestStories.length === 0 && (
            <div className="atw-news-notice">
              <p>No published stories available yet. Check back soon.</p>
            </div>
          )}

          {/* Featured Story Section */}
          {(newsLoading || featuredStory) && (
            <div className="atw-featured-story-section">
              <h3 className="atw-news-section-subtitle">Featured Story</h3>
              {newsLoading ? (
                <div className="atw-featured-card atw-news-skeleton-card" aria-hidden="true">
                  <div className="atw-featured-img-wrapper atw-news-skeleton-shimmer" />
                  <div className="atw-featured-content">
                    <div className="atw-news-skeleton-line" style={{ height: 12, width: '30%', marginBottom: 12 }} />
                    <div className="atw-news-skeleton-line" style={{ height: 26, width: '85%', marginBottom: 10 }} />
                    <div className="atw-news-skeleton-line" style={{ height: 13, width: '95%', marginBottom: 6 }} />
                    <div className="atw-news-skeleton-line" style={{ height: 13, width: '70%', marginBottom: 24 }} />
                    <div className="atw-news-skeleton-line" style={{ height: 14, width: '22%' }} />
                  </div>
                </div>
              ) : featuredStory ? (
                <article className="atw-featured-card">
                  <div className="atw-featured-img-wrapper">
                    {featuredStory.cover ? (
                      <img
                        src={featuredStory.cover}
                        alt={featuredStory.title}
                        className="atw-featured-img"
                      />
                    ) : (
                      <div className="atw-featured-img atw-news-img-missing" aria-hidden="true" />
                    )}
                  </div>
                  <div className="atw-featured-content">
                    <div className="atw-featured-meta">
                      <span className="atw-featured-category">{featuredStory.category}</span>
                      <span className="atw-featured-date">{featuredStory.date}</span>
                    </div>
                    <h4 className="atw-featured-card-title">{featuredStory.title}</h4>
                    <p className="atw-featured-card-desc">{featuredStory.excerpt}</p>
                    <a
                      href={`news.html?story=${featuredStory.slug}`}
                      className="atw-news-readmore"
                    >
                      Read Story <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ) : null}
            </div>
          )}

          {/* Latest Insights Section */}
          {(newsLoading || latestStories.length > 0) && (
            <div className="atw-latest-insights-section" style={{ marginTop: '60px' }}>
              <h3 className="atw-news-section-subtitle">Latest Insights</h3>
              <div className="atw-news-grid">
                {newsLoading ? (
                  [0, 1, 2].map((i) => (
                    <article key={i} className="atw-news-card atw-news-skeleton-card" aria-hidden="true">
                      <div className="atw-news-img-wrapper atw-news-skeleton-shimmer" style={{ height: 200 }} />
                      <div className="atw-news-content">
                        <div className="atw-news-skeleton-line" style={{ height: 11, width: '40%', marginBottom: 8 }} />
                        <div className="atw-news-skeleton-line" style={{ height: 18, width: '90%', marginBottom: 6 }} />
                        <div className="atw-news-skeleton-line" style={{ height: 18, width: '75%', marginBottom: 10 }} />
                        <div className="atw-news-skeleton-line" style={{ height: 12, width: '95%', marginBottom: 4 }} />
                        <div className="atw-news-skeleton-line" style={{ height: 12, width: '60%', marginBottom: 16 }} />
                        <div className="atw-news-skeleton-line" style={{ height: 12, width: '25%' }} />
                      </div>
                    </article>
                  ))
                ) : (
                  latestStories.map((story) => (
                    <article key={story.id} className="atw-news-card">
                      <div className="atw-news-img-wrapper">
                        {story.cover ? (
                          <img
                            src={story.cover}
                            alt={story.title}
                            className="atw-news-img"
                          />
                        ) : (
                          <div className="atw-news-img atw-news-img-missing" aria-hidden="true" />
                        )}
                      </div>
                      <div className="atw-news-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span className="atw-news-category" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--atw-primary)', textTransform: 'uppercase' }}>
                            {story.category}
                          </span>
                          <span className="atw-news-date" style={{ margin: 0 }}>{story.date}</span>
                        </div>
                        <h4 className="atw-news-card-title" style={{ minHeight: '52px' }}>
                          {story.title}
                        </h4>
                        <p className="atw-news-card-desc two-line-limit">{story.excerpt}</p>
                        <a
                          href={`news.html?story=${story.slug}`}
                          className="atw-news-readmore"
                        >
                          Read Story <ArrowRight size={16} />
                        </a>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="atw-news-footer">
            <a href="news.html" className="atw-btn-partner">
              View All Stories
            </a>
          </div>
        </div>
      </section>

      {/* ─── Gallery Section ─────────────────────────────────────────────────── */}
      {galleryLoading && (
        <section className="atw-gallery-section" aria-hidden="true">
          <div className="atw-gallery-header-container">
            <div className="atw-gallery-skeleton-line" style={{ height: 14, width: 120, margin: '0 auto 12px auto' }} />
            <div className="atw-gallery-skeleton-line" style={{ height: 32, width: 220, margin: '0 auto 16px auto' }} />
            <div className="atw-gallery-skeleton-line" style={{ height: 16, width: '60%', maxWidth: 480, margin: '0 auto' }} />
          </div>
          <div className="atw-gallery-marquee-wrapper" style={{ opacity: 0.6 }}>
            <div className="atw-marquee-row">
              <div className="atw-marquee-track atw-marquee-track-left">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="atw-gallery-skeleton-item" />
                ))}
              </div>
            </div>
            <div className="atw-marquee-row">
              <div className="atw-marquee-track atw-marquee-track-right">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="atw-gallery-skeleton-item" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {!galleryLoading && galleryError && (
        <section className="atw-gallery-section" aria-label="Gallery notice">
          <div className="atw-gallery-notice">
            <p>Unable to load gallery photos right now.</p>
            <button onClick={loadGallery} className="atw-gallery-retry-btn">
              Retry
            </button>
          </div>
        </section>
      )}

      {!galleryLoading && !galleryError && gallerySection && (() => {
        const c = gallerySection.content || {};
        const heading = typeof c.heading === 'string' && c.heading.trim() ? c.heading.trim() : 'Gallery';
        const description = typeof c.description === 'string' ? c.description.trim() : '';
        const buttonLabel = typeof c.button_label === 'string' ? c.button_label.trim() : '';
        const buttonUrl = typeof c.button_url === 'string' ? c.button_url.trim() : '';
        const normalized = normalizeGalleryImages(c.images);

        if (normalized.length === 0) {
          return (
            <section className="atw-gallery-section" aria-label="Gallery">
              <div className="atw-gallery-header-container">
                <span className="atw-gallery-tagline">Visual Journey</span>
                <h2 className="atw-gallery-title">{heading}</h2>
                {description && <p className="atw-gallery-subtitle">{description}</p>}
              </div>
              <div className="atw-gallery-notice">
                <p>No gallery images are currently featured.</p>
              </div>
            </section>
          );
        }

        const half = Math.ceil(normalized.length / 2);
        const row1 = normalized.slice(0, half);
        const row2 = normalized.slice(half).length > 0 ? normalized.slice(half) : row1;

        // Repeat items to ensure seamless infinite looping marquee track
        const makeRepeated = (arr) => {
          if (!arr || arr.length === 0) return [];
          const repeatCount = Math.max(2, Math.ceil(12 / arr.length));
          const res = [];
          for (let r = 0; r < repeatCount; r++) {
            res.push(...arr);
          }
          return res;
        };

        const repeatedRow1 = makeRepeated(row1);
        const repeatedRow2 = makeRepeated(row2);

        return (
          <section className="atw-gallery-section">
            <div className="atw-gallery-header-container">
              <span className="atw-gallery-tagline">Visual Journey</span>
              <h2 className="atw-gallery-title">{heading}</h2>
              {description && <p className="atw-gallery-subtitle">{description}</p>}
            </div>

            <div className="atw-gallery-marquee-wrapper">
              {/* Row 1: Scrolling Right to Left */}
              <div className="atw-marquee-row">
                <div className="atw-marquee-track atw-marquee-track-left">
                  {repeatedRow1.map((img, idx) => (
                    <img
                      key={`r1-${idx}`}
                      src={img.url}
                      alt={img.altText}
                      className="atw-gallery-img-item"
                    />
                  ))}
                </div>
              </div>

              {/* Row 2: Scrolling Left to Right */}
              <div className="atw-marquee-row">
                <div className="atw-marquee-track atw-marquee-track-right">
                  {repeatedRow2.map((img, idx) => (
                    <img
                      key={`r2-${idx}`}
                      src={img.url}
                      alt={img.altText}
                      className="atw-gallery-img-item"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="atw-gallery-footer">
              {buttonLabel && buttonUrl && (
                <a
                  href={buttonUrl}
                  className="atw-gallery-view-link"
                  {...(isExternalUrl(buttonUrl) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {buttonLabel} <ArrowRight size={16} />
                </a>
              )}
              <a
                href="https://instagram.com/alicetalkworld"
                target="_blank"
                rel="noopener noreferrer"
                className="atw-gallery-insta-link"
              >
                <Instagram size={18} style={{ marginRight: '6px' }} /> Follow our journey <strong>@alicetalkworld</strong>
              </a>
            </div>
          </section>
        );
      })()}
      <AtwFooter />
    </div>
  );
}

export default App;
