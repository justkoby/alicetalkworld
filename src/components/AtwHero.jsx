import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Users, UserCheck, BookOpen, Handshake, MapPin } from 'lucide-react';

const SLIDES_DATA = [
  {
    id: 1,
    image: '/images/atw/bg-2.jpg',
    prefix: "EMPOWERING YOUNG LEADERS",
    heading: (
      <>
        Building a <span className="atw-highlight">future</span> where every young person can <span className="atw-highlight">lead</span> and <span className="atw-highlight">thrive</span>.
      </>
    ),
    mobileHeading: (
      <>
        Empowering Africa's next generation of <span className="atw-highlight">changemakers</span>.
      </>
    ),
    subheading: "We equip young people—especially women—with the skills, mentorship, and opportunities to drive change in their communities and across Africa.",
    cta: "Explore Our Impact",
    mobileCta: "Discover Our Story",
    link: "about.html"
  },
  {
    id: 2,
    image: '/images/atw/bg-14.jpg',
    prefix: "UNLOCKING OPPORTUNITY",
    heading: (
      <>
        Empowering <span className="atw-highlight">Africa's</span> next generation of <span className="atw-highlight">leaders</span>.
      </>
    ),
    subheading: "Equipping young people with the leadership skills, mentorship, networks, and opportunities needed to create lasting impact in their communities.",
    cta: "Explore Our Impact",
    link: "about.html"
  },
  {
    id: 3,
    image: '/images/atw/bg-3.jpg',
    prefix: "YOUTH LEADERSHIP",
    heading: (
      <>
        Bridging the gap from <span className="atw-highlight">potential</span> to <span className="atw-highlight">purpose</span>.
      </>
    ),
    subheading: "Across Africa, talented young people face barriers to mentorship, professional networks, and career opportunities. We help bridge that gap.",
    cta: "See Our Programs",
    link: "about.html"
  },
  {
    id: 4,
    image: '/images/atw/bg-16.jpg',
    prefix: "WOMEN EMPOWERMENT",
    heading: (
      <>
        Creating <span className="atw-highlight">pathways</span> for women to <span className="atw-highlight">lead</span>.
      </>
    ),
    subheading: "Empowering women and girls through mentorship, leadership development, entrepreneurship support, and access to opportunities that transform futures.",
    cta: "Support Women Leaders",
    link: "get-involved.html"
  },
  {
    id: 5,
    image: '/images/atw/bg-14.jpg',
    prefix: "COMMUNITY IMPACT",
    heading: (
      <>
        Building stronger <span className="atw-highlight">communities</span> through youth <span className="atw-highlight">action</span>.
      </>
    ),
    subheading: "Helping create communities that are more inclusive, innovative, and resilient tomorrow.",
    cta: "View Our Projects",
    link: "news.html"
  },
  {
    id: 6,
    image: '/images/atw/4.jpg',
    prefix: "PARTNER WITH US",
    heading: (
      <>
        Expand <span className="atw-highlight">impact</span> across <span className="atw-highlight">Africa</span> together.
      </>
    ),
    subheading: "Together with donors, institutions, and corporate partners, we are creating opportunities that empower thousands of young people to thrive.",
    cta: "Become a Partner",
    link: "get-involved.html"
  }
];

const STATS_DATA = [
  {
    id: 1,
    number: "5,000+",
    label: "Youth Reached",
    icon: <Users size={22} />
  },
  {
    id: 2,
    number: "100+",
    label: "Mentors",
    icon: <UserCheck size={22} />
  },
  {
    id: 3,
    number: "25+",
    label: "Programs Delivered",
    icon: <BookOpen size={22} />
  },
  {
    id: 4,
    number: "15+",
    label: "Strategic Partners",
    icon: <Handshake size={22} />
  },
  {
    id: 5,
    number: "10+",
    label: "Communities Impacted",
    icon: <MapPin size={22} />
  }
];

export const AtwHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
      }
    }, 6000); // 6 seconds slide interval
  }, [isHovered]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      className="atw-hero-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Interactive Home Hero Slideshow"
    >
      <div className="atw-hero-track">
        {SLIDES_DATA.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div 
              key={slide.id} 
              className={`atw-hero-slide ${isActive ? 'active' : ''}`}
            >
              {/* Background Image */}
              <div 
                className="atw-slide-bg" 
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Overlay gradients */}
              <div className="atw-slide-overlay" />

              {/* Slide Content */}
              <div className="atw-hero-content-wrapper">
                <div className="atw-hero-content-container">
                  <span className="atw-hero-prefix">{slide.prefix}</span>
                  <h1 className="atw-hero-head">
                    {isMobile && slide.mobileHeading ? slide.mobileHeading : slide.heading}
                  </h1>
                  {!isMobile && <p className="atw-hero-sub">{slide.subheading}</p>}
                  <a 
                    href={slide.link} 
                    className="atw-hero-cta-btn"
                  >
                    {isMobile && slide.mobileCta ? slide.mobileCta : slide.cta} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators (Dots) */}
      <div className="atw-hero-dots-outer">
        <div className="atw-hero-dots-container">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              className={`atw-hero-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Mockup Stats Bar */}
      <div className="atw-stats-floating-bar">
        {STATS_DATA.map((stat) => (
          <div key={stat.id} className="atw-stat-col">
            <div className="atw-stat-icon-wrapper">
              {stat.icon}
            </div>
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
