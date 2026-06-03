import React from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { 
  ArrowRight, 
  Award, 
  Heart, 
  Briefcase, 
  Globe, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  Compass, 
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import './MissionVisionPage.css';

export const MissionVisionPage = () => {
  return (
    <div className="atw-mv-root">
      <AtwNavbar />

      {/* PAGE HERO */}
      <section className="atw-mv-hero" style={{ backgroundImage: "url('/images/atw/bg-16.jpg')" }}>
        <div className="atw-mv-hero-overlay" />
        <div className="atw-mv-hero-content">
          <span className="atw-mv-hero-eyebrow">MISSION & VISION</span>
          <h1 className="atw-mv-hero-heading">Purpose-Driven.<br />Future-Focused.</h1>
          <p className="atw-mv-hero-desc">
            Alice Talk World exists to empower young people with the leadership, mentorship, 
            and opportunities needed to thrive and create lasting impact in their communities and beyond.
          </p>
          <div className="atw-mv-breadcrumbs">
            <a href="/">Home</a>
            <span className="atw-mv-bc-separator">/</span>
            <span className="atw-mv-bc-parent">About Us</span>
            <span className="atw-mv-bc-separator">/</span>
            <span className="atw-mv-bc-current">Mission & Vision</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: Why We Exist (Vision & Mission Cards) */}
      <section className="atw-exist-section">
        <div className="atw-exist-container">
          {/* Left Column: Text description */}
          <div className="atw-exist-text-col">
            <span className="atw-exist-eyebrow">OUR ORGANISATION</span>
            <h2 className="atw-exist-heading">Alice TalkWorld (ATW)</h2>
            <div className="atw-exist-desc">
              <p>
                Alice TalkWorld (ATW) is a transformative platform dedicated to bridging the gap between tertiary students and industry stakeholders. With a focus on employability skills, mentorship, and leadership, ATW inspires emerging leaders to create global impact.
              </p>
            </div>
          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="atw-exist-cards-col">
            <div className="atw-mv-card mission-card">
              <div className="atw-mv-card-icon-wrapper">
                <Compass size={24} />
              </div>
              <h3 className="atw-mv-card-title">Our Mission</h3>
              <p className="atw-mv-card-text">
                A world where every young person has the confidence and opportunity to lead a sustainable, inclusive future.
              </p>
            </div>

            <div className="atw-mv-card vision-card">
              <div className="atw-mv-card-icon-wrapper">
                <Target size={24} />
              </div>
              <h3 className="atw-mv-card-title">Our Vision</h3>
              <p className="atw-mv-card-text">
                To bridge the gap between potential and purpose by equipping young leaders with the mentorship and opportunities to transform their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: The Future We Are Building */}
      <section className="atw-future-section">
        <div className="atw-future-container">
          {/* Left Column: Large Image */}
          <div className="atw-future-image-col">
            <div className="atw-future-image-wrapper">
              <img src="/images/atw/795A8639.jpg" alt="A Generation Equipped to Lead" className="atw-future-img" />
              <div className="atw-future-img-overlay" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="atw-future-content-col">
            <span className="atw-future-eyebrow">OUR VISION IN ACTION</span>
            <h2 className="atw-future-heading">A Generation Equipped to Lead</h2>
            <div className="atw-future-desc">
              <p>
                We envision a future where young people are not defined by the limitations they face but 
                by the opportunities they create.
              </p>
              <h3 className="atw-future-list-title">A future where:</h3>
              <ul className="atw-future-list">
                <li className="atw-future-list-item">
                  <span className="atw-li-bullet">•</span>
                  <span><strong>Leadership is accessible</strong> to every motivated young mind.</span>
                </li>
                <li className="atw-future-list-item">
                  <span className="atw-li-bullet">•</span>
                  <span><strong>Young women are empowered</strong> to lead across economic and political spheres.</span>
                </li>
                <li className="atw-future-list-item">
                  <span className="atw-li-bullet">•</span>
                  <span><strong>Innovation is encouraged</strong> as a driver of local social development.</span>
                </li>
                <li className="atw-future-list-item">
                  <span className="atw-li-bullet">•</span>
                  <span><strong>Communities are strengthened</strong> through active youth-led initiatives.</span>
                </li>
                <li className="atw-future-list-item">
                  <span className="atw-li-bullet">•</span>
                  <span><strong>Every voice has the opportunity</strong> to be heard and valued.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Our Theory of Change */}
      <section className="atw-toc-section">
        <div className="atw-toc-container">
          <div className="atw-toc-header">
            <span className="atw-toc-eyebrow">THEORY OF CHANGE</span>
            <h2 className="atw-toc-heading">How We Create Impact</h2>
          </div>

          {/* Visual flowchart diagram */}
          <div className="atw-toc-flowchart">
            <div className="atw-toc-step step-inputs">
              <div className="atw-step-tag">INPUTS & INTERVENTIONS</div>
              <div className="atw-step-box">
                <span className="atw-step-desc">Mentorship • Leadership Training • Community Engagement • Partnerships</span>
              </div>
            </div>

            <div className="atw-toc-arrow">↓</div>

            <div className="atw-toc-step step-short">
              <div className="atw-step-tag">IMMEDIATE OUTCOME</div>
              <div className="atw-step-box">
                <span className="atw-step-desc">Empowered Youth</span>
              </div>
            </div>

            <div className="atw-toc-arrow">↓</div>

            <div className="atw-toc-step step-mid">
              <div className="atw-step-tag">MID-TERM OUTCOME</div>
              <div className="atw-step-box">
                <span className="atw-step-desc">Emerging Leaders</span>
              </div>
            </div>

            <div className="atw-toc-arrow">↓</div>

            <div className="atw-toc-step step-long">
              <div className="atw-step-tag">LONG-TERM OUTCOME</div>
              <div className="atw-step-box">
                <span className="atw-step-desc">Stronger Communities</span>
              </div>
            </div>

            <div className="atw-toc-arrow">↓</div>

            <div className="atw-toc-step step-impact">
              <div className="atw-step-tag">ULTIMATE MISSION IMPACT</div>
              <div className="atw-step-box highlight">
                <span className="atw-step-desc">Lasting Social Impact</span>
              </div>
            </div>
          </div>

          {/* Supporting Text */}
          <div className="atw-toc-footer-text">
            <p>
              We believe that when young people are provided with mentorship, leadership opportunities, 
              skills development, and supportive networks, they are better equipped to create positive change 
              within their communities and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Core Values (Minimal and Elegant List Layout) */}
      <section className="atw-values-section">
        <div className="atw-values-container">
          <div className="atw-values-header">
            <span className="atw-values-eyebrow">OUR VALUES</span>
            <h2 className="atw-values-heading">The Principles That Guide Our Work</h2>
          </div>

          <div className="atw-values-list-container">
            <div className="atw-value-row">
              <div className="atw-value-name">Leadership</div>
              <div className="atw-value-text-block">
                We inspire young people to lead with integrity, confidence, and purpose.
              </div>
            </div>

            <div className="atw-value-row">
              <div className="atw-value-name">Opportunity</div>
              <div className="atw-value-text-block">
                We create pathways that unlock potential and promote growth.
              </div>
            </div>

            <div className="atw-value-row">
              <div className="atw-value-name">Inclusion</div>
              <div className="atw-value-text-block">
                We believe every young person deserves the opportunity to participate and succeed.
              </div>
            </div>

            <div className="atw-value-row">
              <div className="atw-value-name">Innovation</div>
              <div className="atw-value-text-block">
                We embrace creativity, collaboration, and new ideas that drive progress.
              </div>
            </div>

            <div className="atw-value-row">
              <div className="atw-value-name">Impact</div>
              <div className="atw-value-text-block">
                We measure success through meaningful and lasting change.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Strategic Priorities */}
      <section className="atw-priorities-section">
        <div className="atw-priorities-container">
          <div className="atw-priorities-header">
            <span className="atw-priorities-eyebrow">2025–2030 PRIORITIES</span>
            <h2 className="atw-priorities-heading">Areas Driving Our Future Impact</h2>
          </div>

          <div className="atw-priorities-grid">
            <div className="atw-priority-card">
              <div className="atw-priority-num-badge">01</div>
              <h3 className="atw-priority-card-title">Leadership Development</h3>
              <p className="atw-priority-card-text">
                Equipping young people with the skills and confidence to lead.
              </p>
            </div>

            <div className="atw-priority-card">
              <div className="atw-priority-num-badge">02</div>
              <h3 className="atw-priority-card-title">Women's Empowerment</h3>
              <p className="atw-priority-card-text">
                Creating opportunities for women and girls to thrive.
              </p>
            </div>

            <div className="atw-priority-card">
              <div className="atw-priority-num-badge">03</div>
              <h3 className="atw-priority-card-title">Youth Employability</h3>
              <p className="atw-priority-card-text">
                Preparing young people for meaningful careers and economic participation.
              </p>
            </div>

            <div className="atw-priority-card">
              <div className="atw-priority-num-badge">04</div>
              <h3 className="atw-priority-card-title">Entrepreneurship & Innovation</h3>
              <p className="atw-priority-card-text">
                Supporting ideas that create value and solve challenges.
              </p>
            </div>

            <div className="atw-priority-card">
              <div className="atw-priority-num-badge">05</div>
              <h3 className="atw-priority-card-title">Climate Action & Sustainability</h3>
              <p className="atw-priority-card-text">
                Empowering youth to contribute to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Measuring Success */}
      <section className="atw-success-section">
        <div className="atw-success-container">
          <div className="atw-success-header">
            <span className="atw-success-eyebrow">METRICS OF SUCCESS</span>
            <h2 className="atw-success-heading">How We Evaluate Progress</h2>
            <p className="atw-success-subtitle">
              We believe in data-driven outcomes. Our work is measured through rigorous reporting, 
              focusing on key indicators that highlight youth advancement.
            </p>
          </div>

          <div className="atw-success-metrics-grid">
            <div className="atw-success-metric-card">
              <div className="atw-metric-value">92%</div>
              <h3 className="atw-metric-label">Program Completion Rate</h3>
              <p className="atw-metric-desc">Participants who successfully complete full cohort training schedules.</p>
            </div>

            <div className="atw-success-metric-card">
              <div className="atw-metric-value">15+</div>
              <h3 className="atw-metric-label">Local Campaigns Run</h3>
              <p className="atw-metric-desc">Grassroots action events led by certified emerging organizers.</p>
            </div>

            <div className="atw-success-metric-card">
              <div className="atw-metric-value">85%</div>
              <h3 className="atw-metric-label">Transition Rate</h3>
              <p className="atw-metric-desc">Alumni securing professional positions or launching businesses within 6 months.</p>
            </div>

            <div className="atw-success-metric-card">
              <div className="atw-metric-value">20k+</div>
              <h3 className="atw-metric-label">Mentorship Hours</h3>
              <p className="atw-metric-desc">Total combined hours of direct personal counseling sessions held.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: A Shared Vision For The Future */}
      <section className="atw-shared-vision-section">
        <div className="atw-shared-vision-container">
          <blockquote className="atw-shared-vision-quote">
            "We believe the future belongs to young people who are equipped, empowered, and inspired to lead."
          </blockquote>
          <p className="atw-shared-vision-supporting">
            Every mentorship session, leadership program, partnership, and opportunity we create moves us 
            one step closer to that vision.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="atw-mv-cta-section">
        <div className="atw-mv-cta-container">
          <h2 className="atw-mv-cta-heading">Help Us Build the Future We Envision</h2>
          <p className="atw-mv-cta-text">
            Whether as a mentor, volunteer, partner, supporter, or advocate, you can help create 
            opportunities for the next generation of leaders.
          </p>
          <div className="atw-mv-cta-buttons">
            <a href="get-involved.html" className="atw-mv-btn-primary">Partner With Us</a>
            <a href="get-involved.html" className="atw-mv-btn-secondary">Get Involved</a>
          </div>
        </div>
      </section>

      <AtwFooter />
    </div>
  );
};

export default MissionVisionPage;
