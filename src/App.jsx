import React, { useState, useEffect } from 'react';
import AtwNavbar from './components/AtwNavbar';
import AtwHero from './components/AtwHero';
import AtwFooter from './components/AtwFooter';
import { Eye, Target, MapPin, ArrowRight, Users, UserCheck, BookOpen, Handshake } from 'lucide-react';
import { storiesData } from './data/storiesData';
import './atw.css';

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

function App() {
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

  const statsData = [
    { id: 1, number: "5,000+", label: "Youth Reached", icon: <Users size={22} /> },
    { id: 2, number: "100+", label: "Mentors", icon: <UserCheck size={22} /> },
    { id: 3, number: "25+", label: "Programs Delivered", icon: <BookOpen size={22} /> },
    { id: 4, number: "15+", label: "Strategic Partners", icon: <Handshake size={22} /> },
    { id: 5, number: "10+", label: "Communities Impacted", icon: <MapPin size={22} /> }
  ];

  const highlightsImages = [
    '/images/atw/795A8620.jpg',
    '/images/atw/795A8545.jpg',
    '/images/atw/bg-4.jpg',
    '/images/atw/bg-12.jpg',
    '/images/atw/bg-3.jpg'
  ];

  const breastImages = [
    '/images/atw/bba-01.jpg',
    '/images/atw/bba-02.jpg',
    '/images/atw/bba-03.jpg',
    '/images/atw/bba-04.jpg',
    '/images/atw/bba-05.jpg',
    '/images/atw/bba-06.jpg'
  ];

  const tamaleImages = [
    '/images/atw/1.jpg',
    '/images/atw/2.jpg',
    '/images/atw/3.jpg',
    '/images/atw/4a.jpg'
  ];

  const knustImages = [
    '/images/atw/kic-01.jpg',
    '/images/atw/kic-02.jpg',
    '/images/atw/kic-03.jpg',
    '/images/atw/kic-04.jpg',
    '/images/atw/kic-05.jpg',
    '/images/atw/kic-06.jpg',
    '/images/atw/kic-07.jpg'
  ];

  // Gallery images list split between Row 1 (Right to Left) and Row 2 (Left to Right)
  const galleryRow1 = [
    '/images/atw/bg-1.jpg',
    '/images/atw/Lenz IMG_0098.jpg',
    '/images/atw/lenz Addict 219.jpg',
    '/images/atw/1.jpg',
    '/images/atw/795A9243.jpg',
    '/images/atw/4a.jpg',
    '/images/atw/1.webp',
    '/images/atw/3.webp',
    '/images/atw/2024-conference.jpg',
    '/images/atw/ai-image.jpeg',
    '/images/atw/atw@5-1.jpg'
  ];

  const galleryRow2 = [
    '/images/atw/img-2a.jpg',
    '/images/atw/162211.jpg',
    '/images/atw/162200.jpg',
    '/images/atw/162142.jpg',
    '/images/atw/162109.jpg',
    '/images/atw/162054.jpg',
    '/images/atw/162022.jpg',
    '/images/atw/161852.jpg',
    '/images/atw/161927.jpg',
    '/images/atw/161936.jpg'
  ];

  // Duplicate for seamless endless looping marquee effect
  const repeatedRow1 = [...galleryRow1, ...galleryRow1];
  const repeatedRow2 = [...galleryRow2, ...galleryRow2];

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
            OUR PARTNERS & SUPPORTERS
          </div>
          <div className="atw-partners-marquee-container">
            <div className="atw-partners-marquee-track">
              {repeatedPartners.map((logo, idx) => (
                <div key={idx} className="atw-partner-logo-item">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>
      
      {/* White background section with Vision and Mission Cards */}
      <section className="atw-why-we-exist-section">
        <div className="atw-why-exist-container">
          {/* Left Column: Text Content */}
          <div className="atw-why-exist-text-col">
            <span className="atw-why-exist-tagline">OUR ORGANISATION</span>
            <h2 className="atw-why-exist-main-statement">
              Alice TalkWorld (ATW)
            </h2>
            <p className="atw-why-exist-supporting">
              Alice TalkWorld (ATW) is a transformative platform dedicated to bridging the gap between tertiary students and industry stakeholders. With a focus on employability skills, mentorship, and leadership, ATW inspires emerging leaders to create global impact.
            </p>
          </div>

          {/* Middle Column: Mission Card */}
          <div className="atw-card-mission">
            <div className="atw-card-icon-wrapper mission-icon">
              <Target size={24} />
            </div>
            <h3 className="atw-card-title mission-title">Our Mission</h3>
            <p className="atw-card-text mission-text">
              A world where every young person has the confidence and opportunity to lead a sustainable, inclusive future.
            </p>
          </div>

          {/* Right Column: Vision Card */}
          <div className="atw-card-vision">
            <div className="atw-card-icon-wrapper vision-icon">
              <Eye size={24} />
            </div>
            <h3 className="atw-card-title vision-title">Our Vision</h3>
            <p className="atw-card-text vision-text">
              To bridge the gap between potential and purpose by equipping young leaders with the mentorship and opportunities to transform their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Dark background section with Our Impact: 5 Years & Growing */}
      <section className="atw-impact-section">
        <div className="atw-impact-header">
          <h2 className="atw-impact-title">Our Impact: 5 Years and Growing</h2>
          <p className="atw-impact-subtitle">
            For five years, we have championed a new model of change—one led by 
            empowered young leaders. Our approach focuses on providing the tools, 
            mentorship, and platforms necessary to turn passion into tangible impact at 
            the community level.
          </p>
          <a href="atw-5-highlights.html" className="atw-impact-header-link">
            Learn more about our approach
          </a>
        </div>

        {/* Row 1: ALICE TALK WORLD @ 5 HIGHLIGHTS */}
        <div className="atw-impact-row">
          <div className="atw-impact-image-container">
            <AtwFadeSlider images={highlightsImages} />
          </div>
          <div className="atw-impact-content-col">
            <span className="atw-impact-location">
              <MapPin size={14} style={{ marginRight: '4px' }} /> Accra, Ghana
            </span>
            <h3 className="atw-impact-row-title">Alice Talk World @ 5 Highlights</h3>
            <p className="atw-impact-row-text">
              In 2025, Alice Talk World marked five years of impact with a landmark 
              anniversary conference at the British Council, under the theme <strong>"Shaping 
              the Future: Leadership, Innovation and Global Impact."</strong> Hundreds of 
              young leaders, professionals and partners gathered to reflect on our 
              journey and chart bold new paths for the next decade.
            </p>
            <p className="atw-impact-row-text">
              From inspiring keynotes to engaging youth and high-level panels, the 
              celebration showcased the power of collaboration, mentorship, and 
              purpose-driven leadership across Africa.
            </p>
            <a href="atw-5-highlights.html" className="atw-btn-outline">
              View 2025 Highlights
            </a>
          </div>
        </div>

        {/* Row 2: BREAST CANCER AWARENESS CAMPAIGN */}
        <div className="atw-impact-row">
          <div className="atw-impact-content-col">
            <span className="atw-impact-location">
              <MapPin size={14} style={{ marginRight: '4px' }} /> Ghana
            </span>
            <h3 className="atw-impact-row-title">Breast Cancer Awareness Campaign</h3>
            <p className="atw-impact-row-text">
              Through our Breast Cancer Awareness Campaign, we coordinate outreach and health 
              support systems in Ghana, mobilizing young leaders to lead awareness sessions, 
              conduct screenings, and support women in vulnerable situations. By coupling 
              health education with local advocacy, we break taboos and empower communities 
              to prioritize preventative care.
            </p>
            <div className="atw-impact-tags-wrapper">
              <span className="atw-impact-tag">Health & Wellness</span>
              <span className="atw-impact-tag">Community Outreach</span>
              <span className="atw-impact-tag">Youth Leadership</span>
            </div>
          </div>
          <div className="atw-impact-image-container">
            <AtwFadeSlider images={breastImages} />
          </div>
        </div>

        {/* Row 3: Visit to Tamale */}
        <div className="atw-impact-row">
          <div className="atw-impact-image-container">
            <AtwFadeSlider images={tamaleImages} />
          </div>
          <div className="atw-impact-content-col">
            <span className="atw-impact-location">
              <MapPin size={14} style={{ marginRight: '4px' }} /> West Africa
            </span>
            <h3 className="atw-impact-row-title">Visit to Tamale</h3>
            <p className="atw-impact-row-text">
              During our Visit to Tamale, we engaged with local schools and community centers 
              to deliver critical hygiene resources, distribute sanitizing packs, and run peer 
              workshops. Our initiative aims to support young girls, eliminate educational 
              barriers due to period poverty, and build sustainable health awareness pathways 
              across the region.
            </p>
            <div className="atw-impact-tags-wrapper">
              <span className="atw-impact-tag">Advocacy</span>
              <span className="atw-impact-tag">Community Support</span>
              <span className="atw-impact-tag">Empowerment</span>
            </div>
          </div>
        </div>

        {/* Row 4: KUMASI (KNUST) - Inspire Conference 1.0 */}
        <div className="atw-impact-row">
          <div className="atw-impact-content-col">
            <span className="atw-impact-location">
              <MapPin size={14} style={{ marginRight: '4px' }} /> Kumasi, Ghana
            </span>
            <h3 className="atw-impact-row-title">KUMASI (KNUST) - Inspire Conference 1.0</h3>
            <p className="atw-impact-row-text">
              The inaugural Inspire Conference at KNUST united science and tech students with industry mentors, sparking bold conversations about Africa's future. By bridging the gap between academia and professional fields, we equipped students with the leadership tools and guidance needed to navigate their career paths successfully.
            </p>
            <div className="atw-impact-tags-wrapper">
              <span className="atw-impact-tag">Education</span>
              <span className="atw-impact-tag">Mentorship</span>
              <span className="atw-impact-tag">Tech & Innovation</span>
            </div>
          </div>
          <div className="atw-impact-image-container">
            <AtwFadeSlider images={knustImages} />
          </div>
        </div>
      </section>

      {/* White background section with Latest News */}
      <section className="atw-news-section">
        <div className="atw-news-container">
          <div className="atw-news-header">
            <span className="atw-news-tagline">Stories of Impact</span>
            <h2 className="atw-news-title">News & Insights</h2>
            <div className="atw-news-divider"></div>
          </div>

          {/* Featured Story Section */}
          <div className="atw-featured-story-section">
            <h3 className="atw-news-section-subtitle">Featured Story</h3>
            <article className="atw-featured-card">
              <div className="atw-featured-img-wrapper">
                <img src="/images/atw/795A9243.jpg" alt="Anniversary Conference" className="atw-featured-img" />
              </div>
              <div className="atw-featured-content">
                <div className="atw-featured-meta">
                  <span className="atw-featured-category">Events</span>
                  <span className="atw-featured-date">Jul 04, 2025</span>
                </div>
                <h4 className="atw-featured-card-title">
                  Alice Talk World @ 5: Anniversary Conference at the British Council
                </h4>
                <p className="atw-featured-card-desc">
                  Alice Talk World celebrated five years of Change, Empowerment and Impact with a milestone anniversary conference at the British Council in Accra. Under the theme “Shaping the Future: Leadership, Innovation and Global Impact.”
                </p>
                <a href="news.html?story=atw-5-anniversary" className="atw-news-readmore">
                  Read Story <ArrowRight size={16} />
                </a>
              </div>
            </article>
          </div>

          {/* Latest Insights Section */}
          <div className="atw-latest-insights-section" style={{ marginTop: '60px' }}>
            <h3 className="atw-news-section-subtitle">Latest Insights</h3>
            <div className="atw-news-grid">
              {/* Card 1 */}
              <article className="atw-news-card">
                <div className="atw-news-img-wrapper">
                  <img src="/images/atw/YOUTH PANEL - WEBSITE.jpg" alt="Youth Panel" className="atw-news-img" />
                </div>
                <div className="atw-news-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="atw-news-category" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--atw-primary)', textTransform: 'uppercase' }}>Leadership</span>
                    <span className="atw-news-date" style={{ margin: 0 }}>Nov 01, 2025</span>
                  </div>
                  <h4 className="atw-news-card-title" style={{ minHeight: '52px' }}>
                    Youth Panel: Shaping the Future of African Leadership
                  </h4>
                  <p className="atw-news-card-desc two-line-limit">
                    The Youth Panel brought together dynamic young leaders including Dr Ekua Amoako, Alfred Eli Dei, Dr Khadija Owusu, Paa Kwesi Foison and Mariam Majeed, with David Quaye as moderator.
                  </p>
                  <a href="news.html?story=youth-panel-african-leadership" className="atw-news-readmore">
                    Read Story <ArrowRight size={16} />
                  </a>
                </div>
              </article>

              {/* Card 2 */}
              <article className="atw-news-card">
                <div className="atw-news-img-wrapper">
                  <img src="/images/atw/HIGH LEVEL PANEL - WEBSITE.jpg" alt="High Level Panel" className="atw-news-img" />
                </div>
                <div className="atw-news-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="atw-news-category" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--atw-primary)', textTransform: 'uppercase' }}>Partnerships</span>
                    <span className="atw-news-date" style={{ margin: 0 }}>Nov 01, 2025</span>
                  </div>
                  <h4 className="atw-news-card-title" style={{ minHeight: '52px' }}>
                    High Level Panel: Policy, Innovation & Global Impact
                  </h4>
                  <p className="atw-news-card-desc two-line-limit">
                    On the high level panel, leaders discussed how policy, innovation and partnerships can unlock opportunities for young people, moderated by Mrs Belinda Boadu.
                  </p>
                  <a href="news.html?story=high-level-panel-policy-innovation" className="atw-news-readmore">
                    Read Story <ArrowRight size={16} />
                  </a>
                </div>
              </article>

              {/* Card 3 */}
              <article className="atw-news-card">
                <div className="atw-news-img-wrapper">
                  <img src="/images/atw/nokofio-logo.png" alt="MTN and Nokofio Partnership" className="atw-news-img" style={{ objectFit: 'contain', padding: '16px', background: '#f9f9f9' }} />
                </div>
                <div className="atw-news-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="atw-news-category" style={{ fontSize: '11px', fontWeight: '800', color: 'var(--atw-primary)', textTransform: 'uppercase' }}>Announcements</span>
                    <span className="atw-news-date" style={{ margin: 0 }}>Jan 15, 2026</span>
                  </div>
                  <h4 className="atw-news-card-title" style={{ minHeight: '52px' }}>
                    Announcing 2026 Cohort Partnerships with MTN and Nokofio
                  </h4>
                  <p className="atw-news-card-desc two-line-limit">
                    Alice Talk World is thrilled to announce strategic partnerships with MTN and Nokofio to power digital literacy and financial masterclasses for our next cohort.
                  </p>
                  <a href="news.html?story=partnership-mtn-nokofio-2026" className="atw-news-readmore">
                    Read Story <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </div>
          </div>

          <div className="atw-news-footer">
            <a href="news.html" className="atw-btn-partner">
              View All Stories
            </a>
          </div>
        </div>
      </section>

      {/* White background section with endless scrolling Gallery */}
      <section className="atw-gallery-section">
        <div className="atw-gallery-header-container">
          <span className="atw-gallery-tagline">Visual Journey</span>
          <h2 className="atw-gallery-title">Gallery</h2>
          <p className="atw-gallery-subtitle">
            Moments from our programs, events, and community engagements.
          </p>
        </div>

        <div className="atw-gallery-marquee-wrapper">
          {/* Row 1: Scrolling Right to Left */}
          <div className="atw-marquee-row">
            <div className="atw-marquee-track atw-marquee-track-left">
              {repeatedRow1.map((img, idx) => (
                <img 
                  key={`r1-${idx}`} 
                  src={img} 
                  alt={`Gallery moment ${idx + 1}`} 
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
                  src={img} 
                  alt={`Gallery moment ${idx + 1}`} 
                  className="atw-gallery-img-item" 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="atw-gallery-footer">
          <a href="media-center.html" className="atw-gallery-view-link">
            View All Photos <ArrowRight size={16} />
          </a>
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
      <AtwFooter />
    </div>
  );
}

export default App;
