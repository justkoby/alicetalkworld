import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { storiesData } from '../data/storiesData';
import { 
  Calendar, 
  MapPin, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Download, 
  Image as ImageIcon, 
  Check, 
  Search,
  BookOpen,
  Award,
  Users,
  Compass
} from 'lucide-react';
import './NewsPage.css';

export const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStorySlug, setCurrentStorySlug] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Handle routing based on URL query params
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const story = params.get('story');
      if (story) {
        setCurrentStorySlug(story);
        window.scrollTo(0, 0);
      } else {
        setCurrentStorySlug('');
      }
    };

    // Initial check
    handleUrlChange();

    // Listen for custom navigation or back/forward button clicks
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateToStory = (slug) => {
    if (slug) {
      window.history.pushState({}, '', `?story=${slug}`);
      setCurrentStorySlug(slug);
    } else {
      window.history.pushState({}, '', window.location.pathname);
      setCurrentStorySlug('');
    }
    window.scrollTo(0, 0);
  };

  const handleShare = (platform, storyTitle) => {
    const shareUrl = window.location.href;
    let url = '';
    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(storyTitle)}&url=${encodeURIComponent(shareUrl)}`;
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      window.location.href = `mailto:info@alicetalkworld.org?subject=Newsletter Subscription Request - Alice Talk World&body=Please subscribe my email to the Alice Talk World newsletter: ${newsletterEmail}`;
      setNewsletterEmail('');
    }
  };

  // Categories list
  const categories = ['All', 'Events', 'Leadership', 'Partnerships', 'Announcements', 'Opportunities'];

  // Filter and search logic
  const filteredStories = storiesData.filter(story => {
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Find the current active story
  const activeStory = storiesData.find(story => story.slug === currentStorySlug);

  // Get related stories (excluding current)
  const relatedStories = activeStory 
    ? storiesData.filter(story => story.slug !== activeStory.slug).slice(0, 3)
    : [];

  return (
    <div className="atw-root news-root">
      <AtwNavbar />

      <main className="news-main">
        {activeStory ? (
          /* ==========================================
             SINGLE STORY DETAIL VIEW
             ========================================== */
          <div className="news-detail-view">
            {/* HERO SECTION */}
            <section 
              className="news-detail-hero" 
              style={{ backgroundImage: `url(${activeStory.image})` }}
            >
              <div className="news-detail-hero-overlay" />
              <div className="news-detail-hero-container">
                <button onClick={() => navigateToStory('')} className="news-back-btn">
                  <ArrowLeft size={16} /> Back to Stories
                </button>
                <div className="news-detail-hero-meta-top">
                  <span className="news-detail-category-badge">{activeStory.tagline || activeStory.category}</span>
                  <span className="news-detail-read-time">{activeStory.readTime || '5 min read'}</span>
                </div>
                <h1 className="news-detail-hero-title">{activeStory.title}</h1>
                {activeStory.subtitle && <p className="news-detail-hero-subtitle">{activeStory.subtitle}</p>}
                
                {/* Mobile-only Sticky Sidebar Buttons converted beneath the hero */}
                <div className="news-mobile-hero-actions">
                  {activeStory.isConference && (
                    <>
                      <a href="#gallery-section" className="news-mobile-action-btn btn-view-gallery">
                        <ImageIcon size={16} /> View Gallery
                      </a>
                      <a href="mailto:info@alicetalkworld.org?subject=Request Conference Report - Alice Talk World" className="news-mobile-action-btn btn-download-report">
                        <Download size={16} /> Download Report
                      </a>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* MAIN ARTICLE BODY WRAPPER */}
            <div className="news-detail-layout-container">
              <div className="news-detail-main-grid">
                
                {/* LEFT CONTENT COLUMN */}
                <div className="news-detail-content-column">
                  
                  {/* Article Meta Section */}
                  <div className="news-article-meta-bar">
                    <div className="meta-item">
                      <span className="meta-label">Published</span>
                      <span className="meta-value">{activeStory.date}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Author</span>
                      <span className="meta-value">{activeStory.author}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Share</span>
                      <div className="meta-share-links">
                        <button onClick={() => handleShare('facebook', activeStory.title)}>Facebook</button>
                        <span className="divider">|</span>
                        <button onClick={() => handleShare('linkedin', activeStory.title)}>LinkedIn</button>
                        <span className="divider">|</span>
                        <button onClick={() => handleShare('twitter', activeStory.title)}>X</button>
                      </div>
                    </div>
                  </div>

                  {/* Featured Full-Width Image */}
                  <div className="news-detail-featured-image-wrapper">
                    <img src={activeStory.image} alt={activeStory.title} className="news-detail-featured-image" />
                    <span className="news-image-caption">{activeStory.title} - Alice Talk World</span>
                  </div>

                  {/* Article Introduction */}
                  <div className="news-article-introduction">
                    {activeStory.introduction.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Pull Quote */}
                  {activeStory.pullQuote && (
                    <blockquote className="news-article-pull-quote">
                      <span className="quote-mark">&ldquo;</span>
                      <p>{activeStory.pullQuote}</p>
                      <span className="quote-mark-end">&rdquo;</span>
                    </blockquote>
                  )}

                  {/* Sections */}
                  {activeStory.sections && activeStory.sections.map((section, sIndex) => (
                    <div key={sIndex} className="news-article-section">
                      <h2 className="news-section-heading">{section.heading}</h2>
                      
                      {section.content.split('\n\n').map((para, pIndex) => (
                        <p key={pIndex} className="news-section-paragraph">{para}</p>
                      ))}

                      {/* Optional Gallery inside section */}
                      {section.gallery && (
                        <div className="news-inline-gallery" id="gallery-section">
                          <div className="gallery-top-row">
                            {section.gallery.slice(0, 2).map((img, iIndex) => (
                              <img key={iIndex} src={img} alt={`Gallery ${iIndex}`} className="gallery-thumb" />
                            ))}
                          </div>
                          {section.gallery[2] && (
                            <img src={section.gallery[2]} alt="Featured Gallery" className="gallery-large" />
                          )}
                        </div>
                      )}

                      {/* Optional Speaker Highlight inside section */}
                      {section.speakerHighlight && (
                        <div className="news-speaker-highlight">
                          <div className="speaker-avatar">
                            <User size={32} />
                          </div>
                          <div className="speaker-info">
                            <h4 className="speaker-name">{section.speakerHighlight.name}</h4>
                            <span className="speaker-role">{section.speakerHighlight.role}</span>
                            <div className="speaker-takeaway">
                              <strong>Key Takeaway:</strong> {section.speakerHighlight.takeaway}
                            </div>
                            <p className="speaker-quote">"{section.speakerHighlight.quote}"</p>
                          </div>
                        </div>
                      )}

                      {/* Optional Speaker Highlights array */}
                      {section.speakers && (
                        <div className="news-speakers-panel">
                          <h4 className="panel-subtitle">Featured Speakers & Panelists:</h4>
                          <div className="speakers-list-grid">
                            {section.speakers.map((spk, spkIdx) => (
                              <div key={spkIdx} className="speaker-list-item">
                                <span className="speaker-bullet">&bull;</span>
                                <div>
                                  <div className="speaker-list-name">{spk.name}</div>
                                  <div className="speaker-list-role">{spk.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {section.speakerImage && (
                            <img src={section.speakerImage} alt="Speakers Panel" className="panel-promo-image" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Key Takeaways */}
                  {activeStory.keyTakeaways && (
                    <div className="news-takeaways-block">
                      <h3 className="takeaways-title">Key Takeaways</h3>
                      <ul className="takeaways-list">
                        {activeStory.keyTakeaways.map((takeaway, tIndex) => (
                          <li key={tIndex}>
                            <span className="takeaway-check-icon">✓</span>
                            <span className="takeaway-text">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Next Chapter */}
                  {activeStory.nextChapter && (
                    <div className="news-article-next-chapter">
                      <h2 className="news-section-heading">Looking Ahead: The Next Chapter</h2>
                      {activeStory.nextChapter.split('\n\n').map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  )}

                  {/* Photo Gallery Preview */}
                  {activeStory.galleryPreview && (
                    <div className="news-gallery-preview-block">
                      <h3 className="preview-block-title">Moments From The Conference</h3>
                      <div className="preview-images-grid">
                        {activeStory.galleryPreview.map((img, idx) => (
                          <div key={idx} className="preview-image-item">
                            <img src={img} alt={`Gallery preview ${idx}`} />
                          </div>
                        ))}
                      </div>
                      <a href="media-center.html" className="view-full-gallery-btn">
                        View Full Gallery &rarr;
                      </a>
                    </div>
                  )}

                </div>

                {/* RIGHT STICKY SIDEBAR (DESKTOP) */}
                <aside className="news-detail-sidebar">
                  <div className="news-sidebar-sticky-card">
                    {activeStory.isConference && activeStory.eventDetails && (
                      <div className="sidebar-section event-snapshot-box">
                        <h4 className="sidebar-section-title">Event Details</h4>
                        <ul className="event-details-snapshot-list">
                          <li>
                            <span className="detail-key">Date:</span>
                            <span className="detail-val">{activeStory.eventDetails.date}</span>
                          </li>
                          <li>
                            <span className="detail-key">Location:</span>
                            <span className="detail-val">{activeStory.eventDetails.location}</span>
                          </li>
                          <li>
                            <span className="detail-key">Theme:</span>
                            <span className="detail-val">{activeStory.eventDetails.theme}</span>
                          </li>
                          <li>
                            <span className="detail-key">Speakers:</span>
                            <span className="detail-val">{activeStory.eventDetails.speakers}</span>
                          </li>
                          <li>
                            <span className="detail-key">Attendees:</span>
                            <span className="detail-val">{activeStory.eventDetails.participants}</span>
                          </li>
                          <li>
                            <span className="detail-key">Milestone:</span>
                            <span className="detail-val">{activeStory.eventDetails.milestone}</span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <div className="sidebar-section share-box">
                      <h4 className="sidebar-section-title">Share Story</h4>
                      <div className="sidebar-share-buttons">
                        <button onClick={() => handleShare('facebook', activeStory.title)} className="share-btn facebook">
                          Facebook
                        </button>
                        <button onClick={() => handleShare('linkedin', activeStory.title)} className="share-btn linkedin">
                          LinkedIn
                        </button>
                        <button onClick={() => handleShare('twitter', activeStory.title)} className="share-btn twitter">
                          X (Twitter)
                        </button>
                      </div>
                    </div>

                    {activeStory.isConference && (
                      <div className="sidebar-section downloads-box">
                        <h4 className="sidebar-section-title">Resources</h4>
                        <a href="mailto:info@alicetalkworld.org?subject=Request Conference Report - Alice Talk World" className="sidebar-action-btn btn-report">
                          <Download size={16} /> Download Report
                        </a>
                        <a href="#gallery-section" className="sidebar-action-btn btn-gallery">
                          <ImageIcon size={16} /> View Gallery
                        </a>
                      </div>
                    )}
                  </div>
                </aside>

              </div>
            </div>

            {/* RELATED STORIES SECTION */}
            <section className="news-related-section">
              <div className="related-section-container">
                <h3 className="related-section-title">Related Stories</h3>
                <div className="related-stories-grid">
                  {relatedStories.map((story) => (
                    <article key={story.id} className="related-story-card">
                      <div className="related-card-img-wrapper">
                        <img src={story.image} alt={story.title} />
                      </div>
                      <div className="related-card-content">
                        <span className="related-card-category">{story.category}</span>
                        <h4 className="related-card-title">{story.title}</h4>
                        <button onClick={() => navigateToStory(story.slug)} className="related-card-link-btn">
                          Read Story &rarr;
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="related-footer-actions">
                  <button onClick={() => navigateToStory('')} className="view-all-stories-btn">
                    View All Stories &rarr;
                  </button>
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* ==========================================
             STORIES INDEX / GRID VIEW
             ========================================== */
          <div className="news-index-view">
            {/* Header banner */}
            <section className="news-index-hero">
              <div className="news-index-hero-overlay" />
              <div className="news-index-hero-content">
                <span className="news-index-eyebrow">INSPIRATION & UPDATES</span>
                <h1 className="news-index-title">News & Insights</h1>
                <p className="news-index-desc">
                  Explore stories of youth leadership, ecosystem updates, announcements, and opportunities from Alice Talk World.
                </p>
              </div>
            </section>

            {/* Filter and Search Bar Container */}
            <section className="news-filter-search-bar">
              <div className="news-filter-container-inner">
                {/* Category filters */}
                <div className="news-category-tabs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`news-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="news-search-box">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            </section>

            {/* Stories Grid */}
            <section className="news-grid-section">
              <div className="news-grid-container-inner">
                {filteredStories.length === 0 ? (
                  <div className="news-no-results">
                    <h3>No stories found matching your criteria.</h3>
                    <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="reset-filters-btn">
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Render featured story at the top if category is "All" and there is no active search */}
                    {selectedCategory === 'All' && searchQuery === '' && (
                      <div className="news-index-featured-block">
                        <span className="index-section-label">Featured Story</span>
                        <article className="index-featured-card">
                          <div className="index-featured-img-wrapper">
                            <img src="/images/atw/795A9243.jpg" alt="Anniversary Conference" />
                          </div>
                          <div className="index-featured-content">
                            <div className="index-featured-meta">
                              <span className="index-featured-category">Events</span>
                              <span className="index-featured-date">July 04, 2025</span>
                            </div>
                            <h3 className="index-featured-title">
                              Alice Talk World @ 5: Anniversary Conference at the British Council
                            </h3>
                            <p className="index-featured-desc">
                              Alice Talk World celebrated five years of Change, Empowerment and Impact with a milestone anniversary conference at the British Council in Accra. Under the theme “Shaping the Future: Leadership, Innovation and Global Impact.”
                            </p>
                            <button onClick={() => navigateToStory('atw-5-anniversary')} className="read-story-link-btn">
                              Read Story &rarr;
                            </button>
                          </div>
                        </article>
                      </div>
                    )}

                    {/* Standard Grid */}
                    <div className="news-index-grid-block">
                      <span className="index-section-label">
                        {selectedCategory === 'All' && searchQuery === '' ? 'Latest Insights' : `${selectedCategory} Stories`}
                      </span>
                      <div className="index-stories-grid">
                        {filteredStories
                          // If showing "All", filter out the main featured story so it is not duplicated
                          .filter(story => !(selectedCategory === 'All' && searchQuery === '' && story.slug === 'atw-5-anniversary'))
                          .map((story) => (
                            <article key={story.id} className="index-story-card">
                              <div className="index-card-img-wrapper">
                                <img 
                                  src={story.image} 
                                  alt={story.title} 
                                  className="index-card-img"
                                  style={story.slug === 'partnership-mtn-nokofio-2026' ? { objectFit: 'contain', padding: '16px', background: '#f9f9f9' } : {}}
                                />
                              </div>
                              <div className="index-card-content">
                                <div className="index-card-meta">
                                  <span className="index-card-category">{story.category}</span>
                                  <span className="index-card-date">{story.date}</span>
                                </div>
                                <h3 className="index-card-title">{story.title}</h3>
                                <p className="index-card-desc two-line-limit">{story.excerpt}</p>
                                <button onClick={() => navigateToStory(story.slug)} className="read-story-link-btn">
                                  Read Story &rarr;
                                </button>
                              </div>
                            </article>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

          </div>
        )}

        {/* ==========================================
           COMMON NEWSLETTER SIGNUP BLOCK
           ========================================== */}
        <section className="news-newsletter-block">
          <div className="newsletter-block-container">
            <h3 className="newsletter-title">Stay Connected</h3>
            <p className="newsletter-desc">
              Receive updates on events, programs, opportunities, and stories of change directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* ==========================================
           COMMON CTA SECTION
           ========================================== */}
        <section className="news-cta-section">
          <div className="news-cta-container">
            <h2 className="news-cta-title">Join the Movement</h2>
            <p className="news-cta-desc">
              Whether as a volunteer, mentor, partner, or supporter, you can help create opportunities for the next generation of leaders.
            </p>
            <div className="news-cta-buttons">
              <a href="get-involved.html" className="news-cta-btn btn-involved">Get Involved</a>
              <a href="partner.html" className="news-cta-btn btn-partner">Become a Partner</a>
            </div>
          </div>
        </section>

      </main>

      <AtwFooter />
    </div>
  );
};

export default NewsPage;
