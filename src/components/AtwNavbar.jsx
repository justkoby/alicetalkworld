import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X, Heart, Users, Award, GraduationCap, Globe } from 'lucide-react';

export const AtwNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef(null);

  // Google Translate Integration States
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'es', name: 'Spanish' },
    { code: 'sw', name: 'Swahili' }
  ];

  // Load language from cookie on mount
  useEffect(() => {
    const getLanguageFromCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      return match ? match[1] : 'en';
    };
    setSelectedLang(getLanguageFromCookie());
  }, []);

  // Dynamically load Google Translate script and bind initialiser
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,pt,ar,es,sw',
        autoDisplay: false
      }, 'google_translate_element');
    };
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (langCode) => {
    setSelectedLang(langCode);
    setIsLangOpen(false);

    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Cookie fallback if the widget select is not yet in DOM
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      window.location.reload();
    }
  };

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search.html?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleQuickSearch = (term) => {
    window.location.href = `/search.html?q=${encodeURIComponent(term)}`;
  };

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
                About Us 
                <span className="atw-nav-arrow-desktop"><ChevronDown size={14} /></span>
                <span className="atw-nav-toggle-indicator-mobile">{activeDropdown === 'about' ? '−' : '+'}</span>
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'about' ? 'show' : ''}`}>
                <div className="atw-mega-container">
                  <div className="atw-mega-links-grid">
                    <a href="about.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Our Story</span>
                      <span className="atw-mega-item-desc">Where we started and how we have grown.</span>
                    </a>
                    <a href="mission-vision.html" className="atw-mega-item-link">
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
                Our Work 
                <span className="atw-nav-arrow-desktop"><ChevronDown size={14} /></span>
                <span className="atw-nav-toggle-indicator-mobile">{activeDropdown === 'work' ? '−' : '+'}</span>
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'work' ? 'show' : ''}`}>
                <div className="atw-mega-container">
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
                Impact 
                <span className="atw-nav-arrow-desktop"><ChevronDown size={14} /></span>
                <span className="atw-nav-toggle-indicator-mobile">{activeDropdown === 'impact' ? '−' : '+'}</span>
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'impact' ? 'show' : ''}`}>
                <div className="atw-mega-container">
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
                Resources 
                <span className="atw-nav-arrow-desktop"><ChevronDown size={14} /></span>
                <span className="atw-nav-toggle-indicator-mobile">{activeDropdown === 'resources' ? '−' : '+'}</span>
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'resources' ? 'show' : ''}`}>
                <div className="atw-mega-container">
                  <div className="atw-mega-links-grid">
                    <a href="news.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Blog / News</span>
                      <span className="atw-mega-item-desc">Latest updates and articles from our team.</span>
                    </a>
                    <a href="ai-conference.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Events</span>
                      <span className="atw-mega-item-desc">Upcoming webinars, conferences, and meetups.</span>
                    </a>
                    <a href="media-center.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Media Center</span>
                      <span className="atw-mega-item-desc">Photo albums and event galleries from our campaigns.</span>
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
                Get Involved 
                <span className="atw-nav-arrow-desktop"><ChevronDown size={14} /></span>
                <span className="atw-nav-toggle-indicator-mobile">{activeDropdown === 'get-involved' ? '−' : '+'}</span>
              </a>
              <div className={`atw-mega-menu ${activeDropdown === 'get-involved' ? 'show' : ''}`}>
                <div className="atw-mega-container">
                  {/* Desktop Layout */}
                  <div className="atw-mega-links-grid atw-desktop-only-grid">
                    <a href="donation.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Donate</span>
                      <span className="atw-mega-item-desc">Support our programs directly.</span>
                    </a>
                    <a href="partner.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Become a Partner</span>
                      <span className="atw-mega-item-desc">Co-create opportunities with us.</span>
                    </a>
                    <a href="volunteer.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Volunteer</span>
                      <span className="atw-mega-item-desc">Give your time and make a difference.</span>
                    </a>
                    <a href="mentor.html" className="atw-mega-item-link">
                      <span className="atw-mega-item-title">Mentor</span>
                      <span className="atw-mega-item-desc">Guide and inspire the next generation.</span>
                    </a>
                  </div>
                  <div className="atw-mega-sidebar atw-desktop-only-sidebar">
                    <div className="atw-mega-card-placeholder" style={{ backgroundImage: "url('/images/atw/lenz Addict 175.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', border: 'none', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 10, 20, 0.75) 0%, rgba(15, 10, 20, 0.1) 100%)', borderRadius: '10px' }} />
                      <span className="atw-mega-placeholder-title" style={{ color: '#ffffff', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>JOIN THE MOVEMENT</span>
                    </div>
                    <div className="atw-mega-sidebar-meta">
                      <span className="atw-mega-meta-title" style={{ textTransform: 'uppercase' }}>Join The Movement</span>
                      <span className="atw-mega-meta-desc" style={{ fontSize: '12px', lineHeight: '1.4', marginBottom: '8px' }}>There are many ways to create impact. Whether through giving, partnership, volunteering, or mentorship, your contribution helps unlock opportunities for young people across Africa.</span>
                      <a href="get-involved.html" style={{ color: 'var(--atw-accent, #ffb703)', fontSize: '13px', fontWeight: '800', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Explore Opportunities &rarr;</a>
                    </div>
                  </div>

                  {/* Mobile custom layout for Get Involved */}
                  <div className="atw-mobile-get-involved-menu">
                    <div className="atw-mobile-get-involved-title">JOIN THE MOVEMENT</div>
                    <div className="atw-mobile-get-involved-grid">
                      <a href="donation.html" className="atw-mobile-get-involved-card">
                        <span className="atw-get-involved-icon-wrapper"><Heart size={18} /></span>
                        <div className="atw-get-involved-text">
                          <span className="atw-get-involved-title">Donate</span>
                          <span className="atw-get-involved-desc">Support our programs directly</span>
                        </div>
                      </a>
                      <a href="partner.html" className="atw-mobile-get-involved-card">
                        <span className="atw-get-involved-icon-wrapper"><Users size={18} /></span>
                        <div className="atw-get-involved-text">
                          <span className="atw-get-involved-title">Become a Partner</span>
                          <span className="atw-get-involved-desc">Co-create opportunities with us</span>
                        </div>
                      </a>
                      <a href="volunteer.html" className="atw-mobile-get-involved-card">
                        <span className="atw-get-involved-icon-wrapper"><Award size={18} /></span>
                        <div className="atw-get-involved-text">
                          <span className="atw-get-involved-title">Volunteer</span>
                          <span className="atw-get-involved-desc">Give your time & create impact</span>
                        </div>
                      </a>
                      <a href="mentor.html" className="atw-mobile-get-involved-card">
                        <span className="atw-get-involved-icon-wrapper"><GraduationCap size={18} /></span>
                        <div className="atw-get-involved-text">
                          <span className="atw-get-involved-title">Mentor</span>
                          <span className="atw-get-involved-desc">Guide the next generation</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            
            {/* Mobile-only Search Link */}
            <li className="atw-nav-item mobile-search-item" style={{ display: 'none' }}>
              <button 
                onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }} 
                className="atw-nav-link" 
                style={{ width: '100%', textAlign: 'left', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit' }}
              >
                <Search size={16} /> Search Site
              </button>
            </li>

            {/* Mobile Drawer Footer Area */}
            <li className="atw-mobile-drawer-footer">
              <div className="atw-mobile-lang-footer">
                <div className="atw-mobile-lang-title">
                  <Globe size={16} /> Language
                </div>
                <div className="atw-mobile-lang-links">
                  {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => { handleLangChange(lang.code); setIsMobileMenuOpen(false); }}
                      className={`atw-mobile-lang-btn-link ${selectedLang === lang.code ? 'active' : ''}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Two Quick Action CTA Buttons */}
              <div className="atw-mobile-cta-group">
                <a href="donation.html" className="atw-mobile-cta-btn donate">
                  Donate
                </a>
                <a href="partner.html" className="atw-mobile-cta-btn partner">
                  Partner With Us
                </a>
              </div>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions Section */}
        <div className="atw-navbar-actions">
          <button className="atw-search-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search site">
            <Search size={20} />
          </button>

          {/* Desktop Language Selector */}
          <div className="atw-lang-dropdown-wrapper" ref={langDropdownRef}>
            <button className="atw-lang-btn" onClick={() => setIsLangOpen(!isLangOpen)} aria-label="Select Language">
              <span>🌐 Language</span> <ChevronDown size={14} />
            </button>
            {isLangOpen && (
              <ul className="atw-lang-dropdown-menu">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button 
                      onClick={() => handleLangChange(lang.code)}
                      className={`atw-lang-option ${selectedLang === lang.code ? 'active' : ''}`}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="donation.html" className="atw-btn-partner">
            Donate
          </a>
        </div>
      </div>

      {/* Full-bleed Search Overlay */}
      {isSearchOpen && (
        <div className="atw-search-overlay">
          <div className="atw-search-overlay-blur" onClick={() => setIsSearchOpen(false)} />
          <div className="atw-search-overlay-container">
            <button className="atw-search-close-btn" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
              <X size={28} />
            </button>
            <div className="atw-search-form-wrapper">
              <h2 className="atw-search-overlay-heading">Search Alice Talk World</h2>
              <form onSubmit={handleSearchSubmit} className="atw-search-overlay-form">
                <input 
                  type="text" 
                  placeholder="Type your search query..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="atw-search-overlay-input"
                  autoFocus
                />
                <button type="submit" className="atw-search-overlay-submit" aria-label="Submit search">
                  <Search size={22} />
                </button>
              </form>
              <div className="atw-search-overlay-suggestions">
                <span className="atw-suggestion-label">Popular Searches:</span>
                <div className="atw-suggestion-pills">
                  {['Leadership', 'Mission & Vision', 'Mentorship', 'Climate Action', 'Volunteer'].map((term) => (
                    <button 
                      key={term}
                      type="button" 
                      onClick={() => handleQuickSearch(term)} 
                      className="atw-suggestion-pill"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden target element for Google Translate widget */}
      <div id="google_translate_element" style={{ display: 'none', visibility: 'hidden', width: 0, height: 0, overflow: 'hidden' }}></div>

      {/* Inline styles for toggle show/hide inside mobile menu */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .atw-nav-menu .mobile-search-item {
            display: block !important;
          }
        }
      `}} />
    </header>
  );
};

export default AtwNavbar;
