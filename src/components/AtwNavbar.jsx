import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export const AtwNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (menuName, e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === menuName ? null : menuName);
    }
  };

  const handleMouseEnter = (menuName) => {
    if (window.innerWidth > 900) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(menuName);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 900) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200); // 200ms delay prevents closing when crossing minor padding gaps
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className={`atw-navbar-header ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className="atw-nav-container">
        {/* Logo */}
        <a href="/" className="atw-nav-logo">
          <img src="/images/atw/logo.png" alt="Alice Talk World logo" className="atw-logo-img" />
        </a>

        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          className={`atw-nav-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu Links */}
        <nav className="atw-nav-navigation">
          <ul className={`atw-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            
            {/* About Us Dropdown */}
            <li 
              className="atw-nav-item"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="about.html" 
                className="atw-nav-link"
                onClick={(e) => toggleDropdown('about', e)}
              >
                About Us <ChevronDown size={14} />
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'about' ? 'show' : ''}`}>
                <div className="atw-mega-links-grid">
                  <a href="about.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Our Story</span>
                    <span className="atw-mega-item-desc">Where we started and how we have grown.</span>
                  </a>
                  <a href="about.html#mission" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Mission & Vision</span>
                    <span className="atw-mega-item-desc">Our core values and future aspirations.</span>
                  </a>
                  <a href="our-team.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Leadership & Governance</span>
                    <span className="atw-mega-item-desc">Meet the team steering our organization.</span>
                  </a>
                  <a href="about.html#partners" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Partners</span>
                    <span className="atw-mega-item-desc">Collaborations driving collective impact.</span>
                  </a>
                  <a href="get-involved.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Careers / Opportunities</span>
                    <span className="atw-mega-item-desc">Join us in creating lasting change.</span>
                  </a>
                </div>
                <div className="atw-mega-sidebar">
                  <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/795A9195.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                    <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>About Us</span>
                  </div>
                  <div className="atw-mega-sidebar-meta">
                    <span className="atw-mega-meta-title">About Our Movement</span>
                    <span className="atw-mega-meta-desc">Empowering Africa's next generation of leaders.</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Our Work Dropdown */}
            <li 
              className="atw-nav-item"
              onMouseEnter={() => handleMouseEnter('work')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="about.html#work" 
                className="atw-nav-link"
                onClick={(e) => toggleDropdown('work', e)}
              >
                Our Work <ChevronDown size={14} />
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'work' ? 'show' : ''}`}>
                <div className="atw-mega-links-grid">
                  <a href="ai-conference.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Leadership Development</span>
                    <span className="atw-mega-item-desc">Cultivating visionary African leaders.</span>
                  </a>
                  <a href="about.html#work" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Women Empowerment</span>
                    <span className="atw-mega-item-desc">Fostering gender equity and leadership.</span>
                  </a>
                  <a href="about.html#work" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Youth Employability</span>
                    <span className="atw-mega-item-desc">Equipping youth for career success.</span>
                  </a>
                  <a href="about.html#work" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Entrepreneurship</span>
                    <span className="atw-mega-item-desc">Nurturing innovation and business skills.</span>
                  </a>
                  <a href="about.html#work" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Community Development</span>
                    <span className="atw-mega-item-desc">Driving positive local community impact.</span>
                  </a>
                </div>
                <div className="atw-mega-sidebar">
                  <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/795A2050.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                    <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Our Work</span>
                  </div>
                  <div className="atw-mega-sidebar-meta">
                    <span className="atw-mega-meta-title">Our Core Pillars</span>
                    <span className="atw-mega-meta-desc">Thematic areas of strategic local action.</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Impact Dropdown */}
            <li 
              className="atw-nav-item"
              onMouseEnter={() => handleMouseEnter('impact')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="atw-5-highlights.html" 
                className="atw-nav-link"
                onClick={(e) => toggleDropdown('impact', e)}
              >
                Impact <ChevronDown size={14} />
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'impact' ? 'show' : ''}`}>
                <div className="atw-mega-links-grid">
                  <a href="atw-5-highlights.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Success Stories</span>
                    <span className="atw-mega-item-desc">Real stories of lives transformed.</span>
                  </a>
                  <a href="about.html#projects" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Projects</span>
                    <span className="atw-mega-item-desc">Current and past campaigns.</span>
                  </a>
                  <a href="about.html#reports" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Annual Reports</span>
                    <span className="atw-mega-item-desc">Our transparency and yearly milestones.</span>
                  </a>
                  <a href="conference-article.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Publications</span>
                    <span className="atw-mega-item-desc">Insights, research papers, and studies.</span>
                  </a>
                </div>
                <div className="atw-mega-sidebar">
                  <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/bg-4.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                    <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Impact</span>
                  </div>
                  <div className="atw-mega-sidebar-meta">
                    <span className="atw-mega-meta-title">Proven Impact</span>
                    <span className="atw-mega-meta-desc">Explore how we drive tangible results.</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Resources Dropdown */}
            <li 
              className="atw-nav-item"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="news.html" 
                className="atw-nav-link"
                onClick={(e) => toggleDropdown('resources', e)}
              >
                Resources <ChevronDown size={14} />
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'resources' ? 'show' : ''}`}>
                <div className="atw-mega-links-grid">
                  <a href="news.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Blog / News</span>
                    <span className="atw-mega-item-desc">Latest updates and articles from our team.</span>
                  </a>
                  <a href="ai-conference.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Events</span>
                    <span className="atw-mega-item-desc">Upcoming webinars, conferences, and meetups.</span>
                  </a>
                  <a href="news.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Media Gallery</span>
                    <span className="atw-mega-item-desc">Photos and videos from our campaigns.</span>
                  </a>
                  <a href="news.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Downloads</span>
                    <span className="atw-mega-item-desc">Access templates, guides, and worksheets.</span>
                  </a>
                </div>
                <div className="atw-mega-sidebar">
                  <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/795A9243.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                    <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Resources</span>
                  </div>
                  <div className="atw-mega-sidebar-meta">
                    <span className="atw-mega-meta-title">Serving Our Community</span>
                    <span className="atw-mega-meta-desc">This serves: Journalists, Researchers, Students, Partners</span>
                  </div>
                </div>
              </div>
            </li>

            {/* Get Involved Dropdown */}
            <li 
              className="atw-nav-item"
              onMouseEnter={() => handleMouseEnter('get-involved')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="get-involved.html" 
                className="atw-nav-link"
                onClick={(e) => toggleDropdown('get-involved', e)}
              >
                Get Involved <ChevronDown size={14} />
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'get-involved' ? 'show' : ''}`}>
                <div className="atw-mega-links-grid">
                  <a href="donation.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Donate</span>
                    <span className="atw-mega-item-desc">Support our programs directly.</span>
                  </a>
                  <a href="get-involved.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Become a Partner</span>
                    <span className="atw-mega-item-desc">Co-create opportunities with us.</span>
                  </a>
                  <a href="get-involved.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Volunteer</span>
                    <span className="atw-mega-item-desc">Give your time and make a difference.</span>
                  </a>
                  <a href="get-involved.html" className="atw-mega-item-link">
                    <span className="atw-mega-item-title">Mentor</span>
                    <span className="atw-mega-item-desc">Guide and inspire the next generation.</span>
                  </a>
                </div>
                <div className="atw-mega-sidebar">
                  <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/lenz Addict 175.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                    <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Get Involved</span>
                  </div>
                  <div className="atw-mega-sidebar-meta">
                    <span className="atw-mega-meta-title">Join The Movement</span>
                    <span className="atw-mega-meta-desc">Your contribution shapes the future.</span>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Mobile-only Action */}
            <li className="atw-nav-item mobile-action-item" style={{ display: 'none' }}>
              <a href="donation.html" className="atw-btn-partner" style={{ width: '100%', display: 'flex', gap: '8px' }}>
                Donate
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions Section */}
        <div className="atw-navbar-actions">
          <button className="atw-search-btn" aria-label="Search site">
            <Search size={20} />
          </button>
          <a href="donation.html" className="atw-btn-partner">
            Donate
          </a>
        </div>
      </div>
      
      {/* Inline styles for toggle show/hide inside mobile menu */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .atw-nav-menu .mobile-action-item {
            display: block !important;
          }
        }
      `}} />
    </header>
  );
};

export default AtwNavbar;
