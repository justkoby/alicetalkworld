import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { 
  Eye, 
  Target, 
  Users, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  Award, 
  Heart, 
  Briefcase, 
  Sparkles, 
  Zap, 
  Compass, 
  Globe 
} from 'lucide-react';
import './AboutPage.css';

export const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('who-we-are');

  // Handle Hash Navigation on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const isStoryTab = hash === '#story' || hash === '#timeline' || hash === '#challenge';
        setActiveTab(isStoryTab ? 'our-story' : 'who-we-are');
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setActiveTab('who-we-are');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    // Remove hash when shifting tabs manually to prevent lock
    if (window.location.hash) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timeline Data
  const [activeYear, setActiveYear] = useState(2025);
  const timelineData = {
    2019: {
      title: 'The Beginning',
      desc: 'Alice Talk World was established with a vision to create a platform that empowers young people through leadership, mentorship, and meaningful opportunities for growth.',
      image: '/images/atw/bg-3.jpg',
      metrics: [
        { label: 'Vision Formulated', value: '100%' },
        { label: 'Founding Members', value: '3 Core' },
        { label: 'Initial Focus Communities', value: '1' }
      ]
    },
    2020: {
      title: 'Building the Foundation',
      desc: 'The organization began creating spaces for dialogue, networking, and youth engagement, bringing together young people committed to personal growth and community impact.',
      image: '/images/atw/bg-2.jpg',
      metrics: [
        { label: 'Core Programs Launched', value: '2' },
        { label: 'Youth Reached', value: '150+' },
        { label: 'Active Mentors Signed', value: '10' }
      ]
    },
    2021: {
      title: 'Expanding Opportunities',
      desc: 'Alice Talk World expanded its mentorship and empowerment initiatives, connecting young people with leaders, professionals, and role models from diverse sectors.',
      image: '/images/atw/bg-4.jpg',
      metrics: [
        { label: 'Youth Reached', value: '450+' },
        { label: 'Guest Speakers Invited', value: '15+' },
        { label: 'Strategic Partners Added', value: '5' }
      ]
    },
    2022: {
      title: 'Growing Community Impact',
      desc: 'Programs increasingly focused on skills development, leadership training, and community engagement, reaching more young people across different backgrounds.',
      image: '/images/atw/bg-12.jpg',
      metrics: [
        { label: 'Communities Reached', value: '5+' },
        { label: 'Youth Reached', value: '1,200+' },
        { label: 'Programs Run', value: '8' }
      ]
    },
    2023: {
      title: 'Strengthening Partnerships',
      desc: 'Strategic collaborations with institutions, organizations, and stakeholders helped broaden the reach and effectiveness of Alice Talk World\'s initiatives.',
      image: '/images/atw/bg-14.jpg',
      metrics: [
        { label: 'Strategic Partners', value: '+8' },
        { label: 'Youth Reached', value: '+500' },
        { label: 'Programs Delivered', value: '+12' }
      ]
    },
    2024: {
      title: 'Empowering More Young Leaders',
      desc: 'The organization continued to scale its impact through conferences, mentorship programs, leadership forums, and youth-centered development initiatives.',
      image: '/images/atw/bg-16.jpg',
      metrics: [
        { label: 'Anniversary Event Attendees', value: '1,200+' },
        { label: 'Thematic Projects', value: '4 Core' },
        { label: 'Virtual Sessions Held', value: '20+' }
      ]
    },
    2025: {
      title: 'Celebrating Five Years of Impact',
      desc: 'Alice Talk World marked a significant milestone—five years of empowering young people, fostering leadership, and creating opportunities for future generations.',
      image: '/images/atw/2024-conference.jpg',
      metrics: [
        { label: 'Total Youth Reach', value: '5,000+' },
        { label: 'Active Mentors Network', value: '100+' },
        { label: 'Programs Completed', value: '25+' }
      ]
    }
  };

  // Partner logos data for infinite scrolling marquee
  const partnerLogos = [
    { src: '/images/atw/nokofio-logo.png', alt: 'Nokofio' },
    { src: '/images/atw/MTN-Logo.png', alt: 'MTN' },
    { src: '/images/atw/British_Council_logo.svg.png', alt: 'British Council' },
    { src: '/images/atw/unilever-logo-png_seeklogo-145123.png', alt: 'Unilever' },
    { src: '/images/atw/PMCM20LOGO-02-min202_11zon201.png', alt: 'PMC' },
    { src: '/images/atw/Twi-logo-pxx.png', alt: 'Twi' },
    { src: '/images/atw/FANMILK.webp', alt: 'Fanmilk' },
    { src: '/images/atw/streamlined_stay_solutions_cover.jpg', alt: 'Streamlined Stay Solutions' },
    { src: '/images/atw/global capacity hub.png', alt: 'Global Capacity Hub' },
    { src: '/images/atw/Verna-Mineral-Water-Logo.png', alt: 'Verna Mineral Water' },
    { src: '/images/atw/6009-476_import.png', alt: 'Import Logo' },
    { src: '/images/atw/Asaase-radio-logo-02-01.webp', alt: 'Asaase Radio' },
    { src: '/images/atw/GHOne_TV_logo.png', alt: 'GHOne TV' },
    { src: '/images/atw/atinka tv.png', alt: 'Atinka TV' },
    { src: '/images/atw/mx24.jpg', alt: 'MX24' }
  ];

  const repeatedPartners = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <div className="atw-about-root">
      <AtwNavbar />

      {/* Render Active Tab's Hero Banner first at the top */}
      {activeTab === 'who-we-are' ? (
        <section className="atw-about-hero" style={{ backgroundImage: "url('/images/atw/team-bg.jpg')" }}>
          <div className="atw-about-hero-overlay" />
          <div className="atw-about-hero-content">
            <span className="atw-about-hero-tag">WHO IS ALICE TALK WORLD?</span>
            <h1 className="atw-about-hero-title">Building Opportunities.<br />Inspiring Leadership.</h1>
            <p className="atw-about-hero-desc">
              Alice Talk World is a youth-focused organization committed to empowering young people 
              through leadership development, mentorship, innovation, and community engagement.
            </p>
          </div>
        </section>
      ) : (
        <section className="atw-about-hero" style={{ backgroundImage: "url('/images/atw/161852.jpg')" }}>
          <div className="atw-about-hero-overlay" />
          <div className="atw-about-hero-content">
            <span className="atw-about-hero-tag">HOW DID THIS BEGIN?</span>
            <h1 className="atw-about-hero-title">From a Vision<br />to a Movement</h1>
            <p className="atw-about-hero-desc">
              The story of Alice Talk World is one of purpose, passion, and possibility.
            </p>
          </div>
        </section>
      )}

      {/* Sub navigation sticky tabs */}
      <div className="atw-subnav-sticky">
        <div className="atw-subnav-container">
          <button 
            className={`atw-subnav-tab ${activeTab === 'who-we-are' ? 'active' : ''}`}
            onClick={() => switchTab('who-we-are')}
          >
            Who We Are
          </button>
          <button 
            className={`atw-subnav-tab ${activeTab === 'our-story' ? 'active' : ''}`}
            onClick={() => switchTab('our-story')}
          >
            Our Story & Journey
          </button>
        </div>
      </div>

      {activeTab === 'who-we-are' ? (
        /* ================= WHO WE ARE TAB ================= */
        <div className="atw-tab-content fade-in">

          {/* Introduce the organization */}
          <section className="atw-intro-section">
            <div className="atw-intro-container">
              <div className="atw-intro-content">
                <span className="atw-intro-tag">Who We Are</span>
                <h2 className="atw-intro-heading">Empowering Africa's Next Generation of Leaders</h2>
                <div className="atw-intro-body">
                  <p>
                    Alice Talk World exists to equip young people with the skills, networks, mentorship, 
                    and opportunities needed to thrive as leaders and changemakers.
                  </p>
                  <p>
                    Through programs, partnerships, and community engagement, we are creating pathways 
                    for growth, innovation, and impact across Africa.
                  </p>
                </div>
              </div>

              {/* Impact Snapshot */}
              <div className="atw-intro-stats-card">
                <h3 className="atw-stats-card-title">Impact Snapshot</h3>
                <div className="atw-stats-card-grid">
                  <div className="atw-snapshot-item">
                    <span className="atw-snapshot-number">5,000+</span>
                    <span className="atw-snapshot-label">Youth Reached</span>
                  </div>
                  <div className="atw-snapshot-item">
                    <span className="atw-snapshot-number">100+</span>
                    <span className="atw-snapshot-label">Mentors</span>
                  </div>
                  <div className="atw-snapshot-item">
                    <span className="atw-snapshot-number">25+</span>
                    <span className="atw-snapshot-label">Programs Delivered</span>
                  </div>
                  <div className="atw-snapshot-item">
                    <span className="atw-snapshot-number">15+</span>
                    <span className="atw-snapshot-label">Partners</span>
                  </div>
                  <div className="atw-snapshot-item">
                    <span className="atw-snapshot-number">10+</span>
                    <span className="atw-snapshot-label">Communities</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Focus Areas Preview */}
          <section className="atw-focus-preview-section" id="work">
            <div className="atw-focus-preview-container">
              <div className="atw-focus-preview-header">
                <span className="atw-focus-preview-tag">Focus Areas</span>
                <h2 className="atw-focus-preview-title">Strategic Pillars of Impact</h2>
                <p className="atw-focus-preview-subtitle">
                  We design target-oriented interventions across five core thematic areas to support 
                  young people at every stage of their developmental and professional journey.
                </p>
              </div>

              <div className="atw-focus-preview-grid">
                <div className="atw-focus-card">
                  <div className="atw-focus-card-icon-wrapper">
                    <Award size={24} />
                  </div>
                  <h3 className="atw-focus-card-title">Leadership Development</h3>
                  <p className="atw-focus-card-text">
                    Nurturing executive capacity, ethical leadership mindset, and civic ownership 
                    among outstanding young individuals.
                  </p>
                </div>

                <div className="atw-focus-card">
                  <div className="atw-focus-card-icon-wrapper">
                    <Heart size={24} />
                  </div>
                  <h3 className="atw-focus-card-title">Women Empowerment</h3>
                  <p className="atw-focus-card-text">
                    Fostering gender equity, leadership training, mentorship circles, and advocacy 
                    opportunities for young girls and women.
                  </p>
                </div>

                <div className="atw-focus-card">
                  <div className="atw-focus-card-icon-wrapper">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="atw-focus-card-title">Youth Employability</h3>
                  <p className="atw-focus-card-text">
                    Equipping school graduates with essential digital skills, professional readiness, 
                    and corporate exposure.
                  </p>
                </div>

                <div className="atw-focus-card">
                  <div className="atw-focus-card-icon-wrapper">
                    <Globe size={24} />
                  </div>
                  <h3 className="atw-focus-card-title">Climate Action</h3>
                  <p className="atw-focus-card-text">
                    Mobilizing grassroots climate advocates, awareness campaigns, and sustainable 
                    community solutions.
                  </p>
                </div>

                <div className="atw-focus-card">
                  <div className="atw-focus-card-icon-wrapper">
                    <Zap size={24} />
                  </div>
                  <h3 className="atw-focus-card-title">Entrepreneurship & Innovation</h3>
                  <p className="atw-focus-card-text">
                    Nurturing early-stage businesses, incubating tech ideas, and supplying youth 
                    with entrepreneurial mentorship.
                  </p>
                </div>
              </div>

              <div className="atw-focus-preview-footer">
                <a href="about.html#work" className="atw-focus-link-btn" onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>
                  View Our Work <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* Leadership Preview */}
          <section className="atw-leadership-preview-section">
            <div className="atw-leadership-preview-container">
              <div className="atw-leadership-preview-header">
                <span className="atw-lead-preview-tag">Governance</span>
                <h2 className="atw-lead-preview-title">Our Leadership Team</h2>
                <p className="atw-lead-preview-subtitle">
                  Guided by vision and driven by collective impact. Meet the executive directors 
                  steering Alice Talk World's mission.
                </p>
              </div>

              <div className="atw-lead-preview-grid">
                <div className="atw-lead-preview-card">
                  <div className="atw-lead-img-container">
                    <img src="/images/atw/Alice Yakubu.jpeg" alt="Alice Yakubu" className="atw-lead-img" />
                  </div>
                  <div className="atw-lead-info">
                    <h3 className="atw-lead-name">Alice Yakubu</h3>
                    <span className="atw-lead-role">Founder & Executive Director</span>
                    <p className="atw-lead-desc">Empowering young people and women through mentorship, leadership development, and innovation.</p>
                  </div>
                </div>

                <div className="atw-lead-preview-card">
                  <div className="atw-lead-img-container">
                    <img src="/images/atw/David Baah.jpeg" alt="David Tonkouru Baah" className="atw-lead-img" />
                  </div>
                  <div className="atw-lead-info">
                    <h3 className="atw-lead-name">David Tonkouru Baah</h3>
                    <span className="atw-lead-role">Co-Director</span>
                    <p className="atw-lead-desc">Specializing in IT infrastructure management, digital transformation, and leadership support.</p>
                  </div>
                </div>

                <div className="atw-lead-preview-card">
                  <div className="atw-lead-img-container">
                    <img src="/images/atw/David Yeboah.jpeg" alt="David Yeboah" className="atw-lead-img" />
                  </div>
                  <div className="atw-lead-info">
                    <h3 className="atw-lead-name">David Yeboah</h3>
                    <span className="atw-lead-role">Chief Operations Officer</span>
                    <p className="atw-lead-desc">Project & Operations Management, AI/Cybersecurity researcher, and political strategist.</p>
                  </div>
                </div>

                <div className="atw-lead-preview-card">
                  <div className="atw-lead-img-container">
                    <img src="/images/atw/Gifty Adobeah.jpg" alt="Elizabeth Otu" className="atw-lead-img" />
                  </div>
                  <div className="atw-lead-info">
                    <h3 className="atw-lead-name">Elizabeth Otu</h3>
                    <span className="atw-lead-role">Secretary</span>
                    <p className="atw-lead-desc">Supporting report writing, meeting coordination, and community engagement workflows.</p>
                  </div>
                </div>
              </div>

              <div className="atw-lead-preview-footer">
                <a href="our-team.html" className="atw-lead-link-btn">
                  Meet Our Leadership Team <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* Partners Preview Logo Marquee */}
          <section className="atw-partners-preview-section" id="partners">
            <div className="atw-partners-preview-container">
              <div className="atw-partners-preview-label">
                OUR PARTNERS & SUPPORTERS
              </div>
              <div className="atw-partners-preview-marquee">
                <div className="atw-partners-preview-track">
                  {repeatedPartners.map((logo, idx) => (
                    <div key={idx} className="atw-partner-logo-item">
                      <img src={logo.src} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Block */}
          <section className="atw-about-cta-section">
            <div className="atw-about-cta-container">
              <h2 className="atw-about-cta-title">Join us in creating opportunities for young people across Africa.</h2>
              <p className="atw-about-cta-desc">
                Whether as a mentor, strategic partner, donor, or volunteer, your involvement 
                helps us build a future where every young person can learn, lead, and thrive.
              </p>
              <div className="atw-about-cta-actions">
                <a href="get-involved.html" className="atw-about-cta-primary">Get Involved</a>
                <a href="contact.html" className="atw-about-cta-secondary">Contact Us</a>
              </div>
            </div>
          </section>

        </div>
      ) : (
        /* ================= OUR STORY TAB ================= */
        <div className="atw-tab-content fade-in">

          {/* Where It All Began */}
          <section className="atw-story-intro-section">
            <div className="atw-story-intro-container">
              <div className="atw-story-intro-content">
                <span className="atw-story-intro-tag">Where It All Began</span>
                <h2 className="atw-story-intro-heading">A Simple Belief</h2>
                <div className="atw-story-intro-body">
                  <p>
                    Every young person deserves the opportunity to lead, grow, and succeed.
                  </p>
                  <p>
                    Alice Talk World was founded to create spaces where young people can access 
                    mentorship, leadership development, and meaningful opportunities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Challenge Section */}
          <section className="atw-challenge-section" id="challenge">
            <div className="atw-challenge-container">
              <div className="atw-challenge-header">
                <span className="atw-challenge-tag">The Challenge</span>
                <h2 className="atw-challenge-title">The Challenge We Set Out To Address</h2>
                <p className="atw-challenge-subtitle">
                  Across Africa, young people are full of ambition, talent, and ideas. Yet many face 
                  barriers that limit their access to leadership opportunities, mentorship, professional 
                  networks, and the resources needed to achieve their full potential.
                </p>
                <p className="atw-challenge-subtitle-sub">
                  Alice Talk World was founded to help bridge these gaps and create pathways for growth, 
                  opportunity, and impact.
                </p>
              </div>

              <div className="atw-challenge-grid">
                <div className="atw-challenge-card">
                  <span className="atw-challenge-num">01</span>
                  <h3 className="atw-challenge-card-title">Limited Access to Mentorship</h3>
                  <p className="atw-challenge-card-text">
                    Many young people lack access to mentors who can provide guidance, support, and real-world 
                    insights that shape personal and professional growth.
                  </p>
                </div>

                <div className="atw-challenge-card">
                  <span className="atw-challenge-num">02</span>
                  <h3 className="atw-challenge-card-title">Opportunity Gaps</h3>
                  <p className="atw-challenge-card-text">
                    Talented young people often struggle to access internships, leadership opportunities, 
                    scholarships, and professional networks that can accelerate their development.
                  </p>
                </div>

                <div className="atw-challenge-card">
                  <span className="atw-challenge-num">03</span>
                  <h3 className="atw-challenge-card-title">Youth Employability</h3>
                  <p className="atw-challenge-card-text">
                    Many graduates leave school with potential but without the practical skills, exposure, 
                    and support needed to thrive in today's rapidly evolving world.
                  </p>
                </div>

                <div className="atw-challenge-card">
                  <span className="atw-challenge-num">04</span>
                  <h3 className="atw-challenge-card-title">Leadership Representation</h3>
                  <p className="atw-challenge-card-text">
                    Young people—especially young women—are often excluded from decision-making spaces where 
                    their voices, ideas, and contributions matter most.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Horizontal Timeline */}
          <section className="atw-timeline-section" id="timeline">
            <div className="atw-timeline-container">
              <div className="atw-timeline-header">
                <span className="atw-timeline-tag">Our Journey</span>
                <h2 className="atw-timeline-title">5 Years of Progress & Growth</h2>
                <p className="atw-timeline-subtitle">
                  Click through the years below to explore our milestones, impact metrics, and key 
                  breakthroughs since our founding.
                </p>
              </div>

              {/* Horizontal Year Selector Track */}
              <div className="atw-timeline-scroll-wrapper">
                <div className="atw-timeline-years-track">
                  {Object.keys(timelineData).map((year, index) => {
                    const isLast = index === Object.keys(timelineData).length - 1;
                    const isSelected = activeYear === parseInt(year);
                    return (
                      <div key={year} className="atw-timeline-node-wrapper">
                        <button 
                          className={`atw-timeline-year-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setActiveYear(parseInt(year))}
                        >
                          <span className="atw-year-txt">{year}</span>
                          <span className="atw-year-indicator-dot">
                            {isSelected ? '●' : '○'}
                          </span>
                        </button>
                        {!isLast && (
                          <div className={`atw-timeline-connector-line ${isSelected ? 'active' : ''}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Year details block */}
              <div className="atw-timeline-display-card fade-in" key={activeYear}>
                <div className="atw-timeline-display-info">
                  <div className="atw-timeline-year-large">{activeYear}</div>
                  <h3 className="atw-timeline-year-title">{timelineData[activeYear].title}</h3>
                  <p className="atw-timeline-year-desc">{timelineData[activeYear].desc}</p>
                  
                  {/* Year Specific Impact Metrics */}
                  <div className="atw-timeline-metrics-box">
                    <h4 className="atw-metrics-box-title">Yearly Milestone Statistics:</h4>
                    <div className="atw-timeline-metrics-grid">
                      {timelineData[activeYear].metrics.map((metric, idx) => (
                        <div key={idx} className="atw-timeline-metric-col">
                          <span className="atw-timeline-metric-value">{metric.value}</span>
                          <span className="atw-timeline-metric-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="atw-timeline-display-image-wrapper">
                  <img 
                    src={timelineData[activeYear].image} 
                    alt={`Alice Talk World in ${activeYear}`} 
                    className="atw-timeline-display-image" 
                  />
                  <div className="atw-timeline-image-caption">
                    Alice Talk World Journey • {activeYear}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Looking Ahead section */}
          <section className="atw-looking-ahead-section">
            <div className="atw-looking-ahead-container">
              <div className="atw-looking-ahead-card">
                <span className="atw-looking-ahead-tag">Looking Ahead</span>
                <h2 className="atw-looking-ahead-title">The Future We Are Building</h2>
                <p className="atw-looking-ahead-text">
                  We envision a future where every young person has access to the tools and opportunities 
                  needed to thrive. Our journey has only just begun, and we are committed to scaling our 
                  programs, deepening our community partnerships, and reaching more youth across the continent.
                </p>
                <div className="atw-looking-ahead-features">
                  <div className="atw-la-feature-item">
                    <Compass className="atw-la-icon" />
                    <span>Expanding outreach programs into additional regions.</span>
                  </div>
                  <div className="atw-la-feature-item">
                    <Users className="atw-la-icon" />
                    <span>Onboarding 200+ new mentors across diverse fields.</span>
                  </div>
                  <div className="atw-la-feature-item">
                    <Sparkles className="atw-la-icon" />
                    <span>Implementing digital-first learning platforms for skill certification.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      <AtwFooter />
    </div>
  );
};

export default AboutPage;
