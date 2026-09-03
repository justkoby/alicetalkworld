import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Users, UserCheck, BookOpen, Handshake, MapPin } from 'lucide-react';
import { getHomepageSection } from '../services/homepageService';
import { fallbackHeroContent } from '../data/fallbackHeroData';

const STATS_DATA = [
  {
    id: 1,
    number: '5,000+',
    label: 'Youth Reached',
    icon: <Users size={22} />,
  },
  {
    id: 2,
    number: '100+',
    label: 'Mentors',
    icon: <UserCheck size={22} />,
  },
  {
    id: 3,
    number: '25+',
    label: 'Programs Delivered',
    icon: <BookOpen size={22} />,
  },
  {
    id: 4,
    number: '15+',
    label: 'Strategic Partners',
    icon: <Handshake size={22} />,
  },
  {
    id: 5,
    number: '10+',
    label: 'Communities Impacted',
    icon: <MapPin size={22} />,
  },
];

const isExternalUrl = (url) => {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(url.trim());
      return (
        typeof window !== 'undefined' &&
        parsed.hostname !== window.location.hostname &&
        !parsed.hostname.includes('alicetalkworld.org')
      );
    } catch {
      return true;
    }
  }
  return false;
};

export const AtwHero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const loadHero = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getHomepageSection('hero');
      if (result.isFallback) {
        setHeroData({ content: fallbackHeroContent, is_visible: true });
      } else if (result.error) {
        setError(result.error);
        setHeroData(null);
      } else if (!result.data) {
        // Section is intentionally hidden (is_visible = false) or not in DB
        setHeroData(null);
      } else {
        setHeroData(result.data);
      }
    } catch {
      setError(new Error('Unexpected error loading hero section'));
      setHeroData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHero();
  }, [loadHero]);

  // Extract content
  const content = heroData?.content || {};
  const eyebrow = typeof content.eyebrow === 'string' ? content.eyebrow : '';
  const heading = typeof content.heading === 'string' ? content.heading : '';
  const description = typeof content.description === 'string' ? content.description : '';

  const primaryLabel = typeof content.primary_button_label === 'string' ? content.primary_button_label.trim() : '';
  const primaryUrl = typeof content.primary_button_url === 'string' ? content.primary_button_url.trim() : '';
  const secondaryLabel = typeof content.secondary_button_label === 'string' ? content.secondary_button_label.trim() : '';
  const secondaryUrl = typeof content.secondary_button_url === 'string' ? content.secondary_button_url.trim() : '';

  const rawSlides = Array.isArray(content.slides) ? content.slides : [];
  const slides = rawSlides.filter(
    (s) => s && typeof s.image_url === 'string' && s.image_url.trim() !== ''
  );

  // Slides slideshow timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length <= 1) return; // Do not run interval for single slide

    timerRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 6000);
  }, [isHovered, slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Ensure currentIndex stays within range when slides change
  useEffect(() => {
    if (currentIndex >= slides.length && slides.length > 0) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Loading state skeleton
  if (loading) {
    return (
      <section className="atw-hero-slider atw-hero-skeleton" aria-hidden="true">
        <div className="atw-hero-skeleton-shimmer" />
        <div className="atw-hero-content-wrapper">
          <div className="atw-hero-content-container">
            <div className="atw-hero-skeleton-line" style={{ height: 16, width: 220, marginBottom: 20 }} />
            <div className="atw-hero-skeleton-line" style={{ height: 48, width: '70%', maxWidth: 640, marginBottom: 16 }} />
            <div className="atw-hero-skeleton-line" style={{ height: 48, width: '50%', maxWidth: 460, marginBottom: 20 }} />
            <div className="atw-hero-skeleton-line" style={{ height: 16, width: '60%', maxWidth: 520, marginBottom: 12 }} />
            <div className="atw-hero-skeleton-line" style={{ height: 16, width: '40%', maxWidth: 360, marginBottom: 36 }} />
            <div className="atw-hero-skeleton-line" style={{ height: 48, width: 180, borderRadius: 8 }} />
          </div>
        </div>
        <div className="atw-stats-floating-bar">
          {STATS_DATA.map((stat) => (
            <div key={stat.id} className="atw-stat-col">
              <div className="atw-stat-icon-wrapper">{stat.icon}</div>
              <div className="atw-stat-text">
                <span className="atw-stat-number">{stat.number}</span>
                <span className="atw-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="atw-hero-slider atw-hero-error" aria-label="Hero section error">
        <div className="atw-hero-error-content">
          <p className="atw-hero-error-text">Unable to load hero content at this time.</p>
          <button type="button" onClick={loadHero} className="atw-hero-retry-btn">
            Retry
          </button>
        </div>
        <div className="atw-stats-floating-bar">
          {STATS_DATA.map((stat) => (
            <div key={stat.id} className="atw-stat-col">
              <div className="atw-stat-icon-wrapper">{stat.icon}</div>
              <div className="atw-stat-text">
                <span className="atw-stat-number">{stat.number}</span>
                <span className="atw-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Intentionally hidden or unavailable section
  if (!heroData) {
    return null;
  }

  // Display slides or fallback single slide container
  const displaySlides =
    slides.length > 0
      ? slides
      : [
          {
            image_url: '',
            alt_text: 'Alice Talk World',
          },
        ];

  return (
    <section
      className="atw-hero-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive Home Hero Slideshow"
    >
      <div className="atw-hero-track">
        {displaySlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`atw-hero-slide ${isActive ? 'active' : ''}`}
              role="img"
              aria-label={slide.alt_text || 'Alice Talk World'}
            >
              {/* Background Image */}
              <div
                className="atw-slide-bg"
                style={slide.image_url ? { backgroundImage: `url("${slide.image_url}")` } : undefined}
              />

              {/* Overlay gradients */}
              <div className="atw-slide-overlay" />

              {/* Slide Content */}
              <div className="atw-hero-content-wrapper">
                <div className="atw-hero-content-container">
                  {eyebrow && <span className="atw-hero-prefix">{eyebrow}</span>}
                  {heading && <h1 className="atw-hero-head">{heading}</h1>}
                  {description && <p className="atw-hero-sub">{description}</p>}

                  {(Boolean(primaryLabel && primaryUrl) || Boolean(secondaryLabel && secondaryUrl)) && (
                    <div className="atw-hero-btn-group">
                      {primaryLabel && primaryUrl && (
                        <a
                          href={primaryUrl}
                          className="atw-hero-cta-btn"
                          {...(isExternalUrl(primaryUrl) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {primaryLabel} <ArrowRight size={18} />
                        </a>
                      )}
                      {secondaryLabel && secondaryUrl && (
                        <a
                          href={secondaryUrl}
                          className="atw-hero-cta-btn atw-hero-cta-btn--secondary"
                          {...(isExternalUrl(secondaryUrl) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {secondaryLabel}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators (Dots) — rendered only when more than one slide */}
      {displaySlides.length > 1 && (
        <div className="atw-hero-dots-outer">
          <div className="atw-hero-dots-container">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                className={`atw-hero-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating Mockup Stats Bar */}
      <div className="atw-stats-floating-bar">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="atw-stat-col">
            <div className="atw-stat-icon-wrapper">{stat.icon}</div>
            <div className="atw-stat-text">
              <span className="atw-stat-number">{stat.number}</span>
              <span className="atw-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AtwHero;
