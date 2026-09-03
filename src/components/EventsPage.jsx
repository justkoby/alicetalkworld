import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  getPublishedEvents,
  separateAndOrderEvents,
  formatEventDate,
  formatEventTime,
  formatEventLocation,
} from '../services/eventService';
import './EventsPage.css';

const DEFAULT_COVER = '/images/atw/bg-4.jpg';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'upcoming' | 'past'

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublishedEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      setError('Unable to load events at this moment. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadEvents();
  }, []);

  const { upcoming, past, featured } = separateAndOrderEvents(events);

  // Compute displayed list according to active tab
  const getDisplayedEvents = () => {
    if (activeTab === 'upcoming') return upcoming;
    if (activeTab === 'past') return past;
    // 'all': upcoming first (nearest to furthest), then past (newest to oldest)
    return [...upcoming, ...past];
  };

  const displayedEvents = getDisplayedEvents();

  return (
    <div className="atw-root evt-root">
      <AtwNavbar />

      {/* HERO SECTION */}
      <section className="evt-hero">
        <div className="evt-hero-bg" />
        <div className="evt-hero-overlay" />
        <div className="evt-hero-content">
          <span className="evt-hero-eyebrow">Events & Gatherings</span>
          <h1 className="evt-hero-title">Conferences, Summits & Workshops</h1>
          <p className="evt-hero-desc">
            Join young African leaders, innovators, and changemakers as we explore leadership,
            mentorship, and sustainable community impact.
          </p>
          <nav className="evt-hero-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>Events</span>
          </nav>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <section className="evt-tabs-section">
        <div className="evt-container">
          <div className="evt-tabs-nav">
            <button
              type="button"
              className={`evt-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Events
              <span className="evt-tab-badge">{events.length}</span>
            </button>
            <button
              type="button"
              className={`evt-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
              <span className="evt-tab-badge">{upcoming.length}</span>
            </button>
            <button
              type="button"
              className={`evt-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
              <span className="evt-tab-badge">{past.length}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ERROR BANNER */}
      {error && (
        <section className="evt-container" style={{ paddingTop: '30px' }}>
          <div className="evt-empty-state">
            <div className="evt-empty-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}>
              <AlertCircle size={32} />
            </div>
            <h3 className="evt-empty-title">Connection Issue</h3>
            <p className="evt-empty-desc">{error}</p>
            <button type="button" className="evt-retry-btn" onClick={loadEvents}>
              <RefreshCw size={16} /> Try Again
            </button>
          </div>
        </section>
      )}

      {/* LOADING STATE */}
      {loading && !error && (
        <section className="evt-grid-section">
          <div className="evt-container">
            <div className="evt-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="evt-skeleton-card">
                  <div className="evt-skeleton-img" />
                  <div className="evt-skeleton-body">
                    <div className="evt-skeleton-line short" />
                    <div className="evt-skeleton-line title" />
                    <div className="evt-skeleton-line" />
                    <div className="evt-skeleton-line" />
                    <div className="evt-skeleton-line btn" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTENT (WHEN LOADED) */}
      {!loading && !error && (
        <>
          {/* FEATURED EVENT HIGHLIGHT (Shown in All or Upcoming when a featured event exists) */}
          {featured && (activeTab === 'all' || activeTab === 'upcoming') && (
            <section className="evt-featured-section">
              <div className="evt-container">
                <div className="evt-featured-card">
                  <div className="evt-featured-img-wrap">
                    <img
                      src={featured.cover_image_url || DEFAULT_COVER}
                      alt={featured.title}
                      className="evt-featured-img"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_COVER;
                      }}
                    />
                    <span className="evt-featured-badge">
                      <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Featured Event
                    </span>
                  </div>
                  <div className="evt-featured-body">
                    <span className="evt-card-category">{featured.category || 'Special Gathering'}</span>
                    <h2 className="evt-featured-title">{featured.title}</h2>
                    <p className="evt-featured-summary">
                      {featured.summary ||
                        (typeof featured.description === 'object'
                          ? featured.description?.text
                          : featured.description) ||
                        'Join us for this landmark event as we bring together inspiring leaders and emerging changemakers.'}
                    </p>

                    <div className="evt-meta-list">
                      <div className="evt-meta-item">
                        <Calendar size={16} />
                        <span>
                          <strong>Date:</strong> {formatEventDate(featured.start_at, featured.end_at)}
                        </span>
                      </div>
                      {featured.start_at && (
                        <div className="evt-meta-item">
                          <Clock size={16} />
                          <span>
                            <strong>Time:</strong> {formatEventTime(featured.start_at, featured.end_at)}
                          </span>
                        </div>
                      )}
                      <div className="evt-meta-item">
                        {featured.is_online ? <Globe size={16} /> : <MapPin size={16} />}
                        <span>
                          <strong>Location:</strong> {formatEventLocation(featured)}
                        </span>
                      </div>
                    </div>

                    <div className="evt-card-actions">
                      {featured.registration_url ? (
                        <a
                          href={featured.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="evt-btn-primary"
                        >
                          Register for Event <ArrowRight size={16} />
                        </a>
                      ) : featured.is_online && featured.online_url ? (
                        <a
                          href={featured.online_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="evt-btn-primary"
                        >
                          Join Online <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="evt-concluded-badge">Registration Details Forthcoming</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MAIN EVENTS GRID */}
          <section className="evt-grid-section">
            <div className="evt-container">
              <div className="evt-section-header">
                <span className="evt-section-eyebrow">
                  {activeTab === 'upcoming'
                    ? 'What Is Ahead'
                    : activeTab === 'past'
                    ? 'Event Archives'
                    : 'Calendar'}
                </span>
                <h2 className="evt-section-title">
                  {activeTab === 'upcoming'
                    ? 'Upcoming Gatherings'
                    : activeTab === 'past'
                    ? 'Past Conferences & Forums'
                    : 'All Events'}
                </h2>
              </div>

              {displayedEvents.length === 0 ? (
                <div className="evt-empty-state">
                  <div className="evt-empty-icon">
                    <Calendar size={32} />
                  </div>
                  <h3 className="evt-empty-title">
                    {activeTab === 'upcoming'
                      ? 'No Upcoming Events Scheduled'
                      : activeTab === 'past'
                      ? 'No Past Events Recorded'
                      : 'No Events Published'}
                  </h3>
                  <p className="evt-empty-desc">
                    {activeTab === 'upcoming'
                      ? 'We are planning our next conferences and workshops. Follow our social channels or check back soon.'
                      : 'Check back soon for event announcements and community highlights.'}
                  </p>
                  <a href="/news.html" className="evt-btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
                    Read Latest News
                  </a>
                </div>
              ) : (
                <div className="evt-grid">
                  {displayedEvents.map((event) => {
                    const isUpcoming =
                      new Date(event.start_at) >= new Date() ||
                      (event.end_at && new Date(event.end_at) >= new Date());

                    const summaryText =
                      event.summary ||
                      (typeof event.description === 'object'
                        ? event.description?.text
                        : event.description) ||
                      '';

                    return (
                      <article key={event.id || event.slug} className="evt-card">
                        <div className="evt-card-img-wrap">
                          <img
                            src={event.cover_image_url || DEFAULT_COVER}
                            alt={event.title}
                            className="evt-card-img"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_COVER;
                            }}
                          />
                          <span
                            className={`evt-card-timing-badge ${
                              isUpcoming ? 'upcoming' : 'past'
                            }`}
                          >
                            {isUpcoming ? 'Upcoming' : 'Past Event'}
                          </span>
                          <span className="evt-card-date-badge">
                            {formatEventDate(event.start_at, event.end_at)}
                          </span>
                        </div>

                        <div className="evt-card-body">
                          <span className="evt-card-category">
                            {event.category || 'Event'}
                          </span>
                          <h3 className="evt-card-title">{event.title}</h3>
                          {summaryText && (
                            <p className="evt-card-summary">{summaryText}</p>
                          )}

                          <div className="evt-card-meta">
                            <div className="evt-card-meta-item">
                              <Clock size={14} />
                              <span>{formatEventTime(event.start_at, event.end_at)}</span>
                            </div>
                            <div className="evt-card-meta-item">
                              {event.is_online ? <Globe size={14} /> : <MapPin size={14} />}
                              <span>{formatEventLocation(event)}</span>
                            </div>
                          </div>

                          <div className="evt-card-actions">
                            {isUpcoming && event.registration_url ? (
                              <a
                                href={event.registration_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="evt-btn-primary"
                              >
                                Register Now <ArrowRight size={15} />
                              </a>
                            ) : isUpcoming && event.is_online && event.online_url ? (
                              <a
                                href={event.online_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="evt-btn-primary"
                              >
                                Join Online <ExternalLink size={15} />
                              </a>
                            ) : isUpcoming ? (
                              <span className="evt-concluded-badge">Registration TBA</span>
                            ) : (
                              <span className="evt-concluded-badge">Event Concluded</span>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="evt-cta-section">
            <div className="evt-container">
              <div className="evt-cta-card">
                <div className="evt-cta-text">
                  <h3>Host an Event or Partner With Us</h3>
                  <p>
                    Interested in sponsoring an Alice Talk World conference, co-hosting a youth
                    empowerment workshop, or speaking at one of our upcoming forums?
                  </p>
                </div>
                <div className="evt-cta-actions">
                  <a href="/partner.html" className="evt-btn-accent">
                    Become a Partner <ArrowRight size={16} />
                  </a>
                  <a href="/volunteer.html" className="evt-btn-outline">
                    <Users size={16} /> Volunteer With Us
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <AtwFooter />
    </div>
  );
};

export default EventsPage;
