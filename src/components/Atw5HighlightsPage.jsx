import React from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { ArrowRight, Share2, Calendar, MapPin, Award, Send, CheckCircle } from 'lucide-react';
import './Atw5HighlightsPage.css';

export const Atw5HighlightsPage = () => {
  const pageUrl = window.location.href;
  const pageTitle = "Alice Talk World @ 5 | Conference Highlights";

  const handleShare = (platform) => {
    let url = '';
    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    }
    if (url) window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('Page link copied to clipboard!');
  };

  return (
    <div className="atw-root">
      <AtwNavbar />

      {/* HERO SECTION */}
      <section className="atw-highlights-hero">
        <div className="atw-highlights-hero-overlay" />
        <div className="atw-highlights-hero-container">
          <span className="atw-highlights-tagline">Event Highlights</span>
          <h1 className="atw-highlights-title">Alice Talk World @ 5</h1>
          <p className="atw-highlights-subtitle">
            British Council, Accra – November 1, 2025
          </p>
          <div className="atw-highlights-theme">
            <span>Theme: </span><strong>"Shaping the Future: Leadership, Innovation and Global Impact"</strong>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="atw-highlights-overview-section">
        <div className="atw-highlights-container">
          <div className="atw-highlights-grid">
            <div className="atw-highlights-content-col">
              <h2 className="atw-highlights-section-title">
                Five Years of Change, Empowerment & Impact
              </h2>
              <p className="atw-highlights-intro-text">
                Alice Talk World @ 5 was more than an anniversary celebration; it was a bold statement about the
                future of youth leadership in Africa. Hosted at the British Council in Accra, the conference
                brought together students, young professionals, policymakers and ecosystem leaders to reflect on
                our journey and co-create the next chapter.
              </p>
              <p className="atw-highlights-body-text">
                Through interactive keynotes, youth-led conversations, and a high-level panel of seasoned
                leaders, participants explored how leadership, innovation and collaboration can unlock new
                opportunities for young people across the continent.
              </p>
              <p className="atw-highlights-body-text">
                Below are some of the key moments, voices and highlights that defined Alice Talk World @ 5.
              </p>
              
              {/* LINK TO ANNIVERSARY ARTICLE */}
              <div className="atw-highlights-article-promo">
                <div className="atw-promo-content">
                  <h3>Anniversary Conference Coverage</h3>
                  <p>Read our full detailed press coverage of the Alice Talk World @ 5 Anniversary event at the British Council.</p>
                </div>
                <a href="news.html?story=atw-5-anniversary" className="atw-btn-promo">
                  Read Full Story <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="atw-highlights-sidebar-col">
              <div className="atw-highlights-snapshot-card">
                <img src="/images/atw/MAIN FLYER WEBSITE.jpg" className="atw-snapshot-img" alt="Alice Talk World @ 5 main event flyer" />
                <div className="atw-snapshot-body">
                  <h3 className="atw-snapshot-title">Event Snapshot</h3>
                  <ul className="atw-snapshot-list">
                    <li>
                      <Calendar size={16} className="atw-snapshot-icon" />
                      <div>
                        <strong>Date:</strong> Saturday, 1st November 2025
                      </div>
                    </li>
                    <li>
                      <MapPin size={16} className="atw-snapshot-icon" />
                      <div>
                        <strong>Venue:</strong> British Council, Accra – Ghana
                      </div>
                    </li>
                    <li>
                      <Award size={16} className="atw-snapshot-icon" />
                      <div>
                        <strong>Theme:</strong> Shaping the Future: Leadership, Innovation and Global Impact
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY STRIP */}
          <div className="atw-highlights-gallery-strip">
            <h3 className="atw-gallery-strip-title">Moments From the Day</h3>
            <div className="atw-gallery-strip-grid">
              <div className="atw-gallery-strip-item">
                <img src="/images/atw/atw@5-1.jpg" alt="Conference highlight 1" />
              </div>
              <div className="atw-gallery-strip-item">
                <img src="/images/atw/atw@5-2.jpg" alt="Conference highlight 2" />
              </div>
              <div className="atw-gallery-strip-item">
                <img src="/images/atw/atw@5-3.jpg" alt="Conference highlight 3" />
              </div>
              <div className="atw-gallery-strip-item">
                <img src="/images/atw/atw@5-4.jpg" alt="Conference highlight 4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUTH PANEL SECTION */}
      <section className="atw-highlights-panel-section">
        <div className="atw-highlights-container">
          <div className="atw-panel-grid">
            <div className="atw-panel-img-col">
              <img src="/images/atw/YOUTH PANEL - WEBSITE.jpg" className="atw-panel-img" alt="Youth Panel flyer" />
            </div>
            <div className="atw-panel-info-col">
              <h2 className="atw-panel-title">Youth Panel: Voices Shaping the Future</h2>
              <p className="atw-panel-desc">
                The Youth Panel brought together some of the continent’s most dynamic emerging leaders
                to discuss the realities and possibilities of leading in a rapidly changing world.
                Moderated by <strong>David Quaye</strong>, the conversation explored courage, purpose,
                career growth and social impact.
              </p>
              <div className="atw-panelists-box">
                <span className="atw-panelists-label">Panelists included:</span>
                <ul className="atw-panelists-list">
                  <li><strong>Dr Ekua Amoako</strong> – Deputy Spokesperson for Former Vice President</li>
                  <li><strong>Alfred Eli Dei</strong> – Co-founder, African Young Leaders Foundation</li>
                  <li><strong>Dr Khadija Owusu</strong> – Award-winning Doctor & Founder, AKAYA Foundation</li>
                  <li><strong>Paa Kwesi Foison</strong> – Entrepreneur & Award-winning Public Speaker</li>
                  <li><strong>Mariam Majeed</strong> – Growth-driven Brand Strategist & Coach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGH LEVEL PANEL SECTION */}
      <section className="atw-highlights-panel-section atw-alt-bg">
        <div className="atw-highlights-container">
          <div className="atw-panel-grid atw-reverse">
            <div className="atw-panel-img-col">
              <img src="/images/atw/HIGH LEVEL PANEL - WEBSITE.jpg" className="atw-panel-img" alt="High Level Panel flyer" />
            </div>
            <div className="atw-panel-info-col">
              <h2 className="atw-panel-title">High Level Panel: Policy, Innovation & Global Impact</h2>
              <p className="atw-panel-desc">
                The High Level Panel gathered influential leaders from policy, business, ministry and
                healthcare to explore how systems can better serve young people and accelerate Africa’s growth.
                The conversation was moderated by <strong>Mrs Belinda Boadu</strong>.
              </p>
              <div className="atw-panelists-box">
                <span className="atw-panelists-label">Panelists included:</span>
                <ul className="atw-panelists-list text-purple">
                  <li><strong>Dr Augustine Blay</strong> – Senior Policy & Governance Leader</li>
                  <li><strong>Prophet Prakash Pyne</strong> – President, Empower Young Lives Africa</li>
                  <li><strong>Sheena Sue Biney</strong> – General Manager, WOPECAR</li>
                  <li><strong>Nana-Kwame Asafo-Adjei Ayen</strong> – Member of Parliament, Bosome Freho</li>
                  <li><strong>Dr Vanessa Aseye Atikpui</strong> – Medical Doctor & Founder, First Aid on Wheels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ACTIONS SECTION */}
      <section className="atw-highlights-actions-section">
        <div className="atw-highlights-container">
          <div className="atw-actions-row">
            <div className="atw-actions-content">
              <h2>Share & Explore Further</h2>
              <p>Help spread the word about Alice Talk World's impact, or check out our other key articles.</p>
              
              <div className="atw-actions-btn-group">
                <button onClick={copyToClipboard} className="atw-action-btn copy">
                  Copy Link
                </button>
                <button onClick={() => handleShare('facebook')} className="atw-action-btn facebook">
                  Facebook
                </button>
                <button onClick={() => handleShare('twitter')} className="atw-action-btn twitter">
                  X (Twitter)
                </button>
                <button onClick={() => handleShare('linkedin')} className="atw-action-btn linkedin">
                  LinkedIn
                </button>
              </div>
            </div>

            <div className="atw-next-article-box">
              <h3>Next Story</h3>
              <p className="atw-next-title">Alice Talk World @ 5: Anniversary Conference at the British Council</p>
              <p className="atw-next-desc">Read about the keynote addresses and partner engagements from the landmark session.</p>
              <a href="news.html?story=atw-5-anniversary" className="atw-next-btn">
                Read Story <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <AtwFooter />
    </div>
  );
};

export default Atw5HighlightsPage;
