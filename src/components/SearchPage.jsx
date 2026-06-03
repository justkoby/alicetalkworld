import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { searchIndex } from '../data/searchIndex';
import { Search, ArrowRight, HelpCircle, FileText, Users, Award, ShieldAlert, X, Image, Newspaper, Heart, ExternalLink } from 'lucide-react';
import './SearchPage.css';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [results, setResults] = useState([]);

  // Retrieve initial query from URL search parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    setQuery(q);
    setSearchTerm(q);
  }, []);

  // Sync URL parameter if state query changes via the in-page search bar
  const triggerSearch = (searchVal) => {
    const trimmed = searchVal.trim();
    setQuery(trimmed);
    // Update browser URL without reloading the page
    const newUrl = trimmed 
      ? `${window.location.pathname}?q=${encodeURIComponent(trimmed)}`
      : window.location.pathname;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    triggerSearch(searchTerm);
  };

  const handlePillClick = (term) => {
    setSearchTerm(term);
    triggerSearch(term);
  };

  // Perform search scoring and sorting when query changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) {
      setResults([]);
      return;
    }

    const scored = searchIndex.map(item => {
      let score = 0;
      const lowerTitle = item.title.toLowerCase();
      const lowerSnippet = item.snippet.toLowerCase();
      const lowerContent = item.content.toLowerCase();

      // 1. Exact full-phrase match checks (high value)
      const queryLower = query.toLowerCase();
      if (lowerTitle.includes(queryLower)) score += 15;
      if (lowerSnippet.includes(queryLower)) score += 8;

      // 2. Individual keyword matching
      keywords.forEach(keyword => {
        // Match in title
        if (lowerTitle.includes(keyword)) score += 6;
        // Match in keyword tags
        if (item.keywords.some(tag => tag.toLowerCase() === keyword)) score += 4;
        // Match in snippet summary
        if (lowerSnippet.includes(keyword)) score += 2;
        // Match in content database
        if (lowerContent.includes(keyword)) score += 1;
      });

      return { ...item, score };
    });

    // Filter out items with 0 score, then sort by highest score first
    const filtered = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    setResults(filtered);
  }, [query]);

  // Filter results by selected category tab
  const displayedResults = results.filter(item => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  // Unique categories list with item counts for UI badges
  const categoriesList = ['All', 'Pages', 'Programs & Values', 'People & Team', 'Media', 'Events & News', 'Get Involved'];

  const getCategoryCount = (cat) => {
    if (cat === 'All') return results.length;
    return results.filter(item => item.category === cat).length;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Pages':          return <FileText size={16} />;
      case 'People & Team':  return <Users size={16} />;
      case 'Programs & Values': return <Award size={16} />;
      case 'Media':          return <Image size={16} />;
      case 'Events & News':  return <Newspaper size={16} />;
      case 'Get Involved':   return <Heart size={16} />;
      default:               return <HelpCircle size={16} />;
    }
  };

  // Helper function to safely highlight matching words in search result snippets
  const highlightText = (text, highlightQuery) => {
    if (!highlightQuery) return text;
    const words = highlightQuery.split(/\s+/).filter(Boolean);
    if (words.length === 0) return text;

    // Create regex matching any of the search words (escaped to prevent injection)
    const escapedWords = words.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');

    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="atw-highlight-mark">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="atw-root atw-search-page-root">
      <AtwNavbar />

      {/* SEARCH BANNER HERO */}
      <section className="atw-search-hero">
        <div className="atw-search-hero-overlay" />
        <div className="atw-search-hero-content">
          <span className="atw-search-eyebrow">EXPLORE ALICE TALK WORLD</span>
          <h1 className="atw-search-heading">Platform Search</h1>
          
          <form onSubmit={handleSearchSubmit} className="atw-search-main-form">
            <div className="atw-search-input-wrapper">
              <Search className="atw-search-bar-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search for pages, programs, team leaders, values..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="atw-search-bar-input"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')} 
                  className="atw-search-clear-btn"
                  aria-label="Clear input"
                >
                  <X size={18} style={{ color: 'var(--atw-text-gray)' }} />
                </button>
              )}
            </div>
            <button type="submit" className="atw-search-submit-btn">
              Search
            </button>
          </form>

          {/* Quick links tag container */}
          <div className="atw-search-popular-tags">
            <span className="atw-tags-label">Try searching:</span>
            <div className="atw-tags-list">
              {['Conference 2024', 'Media Center', 'Tamale', 'Volunteer', 'ATW @5', 'KNUST', 'Vision'].map(tag => (
                <button 
                  key={tag} 
                  type="button" 
                  onClick={() => handlePillClick(tag)}
                  className="atw-tag-btn"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS DISPLAY LAYER */}
      <section className="atw-search-results-section">
        <div className="atw-search-results-container">
          
          {query ? (
            <>
              {/* Results status banner */}
              <div className="atw-results-info">
                <h2>
                  Search Results for <span className="atw-query-highlight">"{query}"</span>
                </h2>
                <span className="atw-results-count">
                  Found {results.length} total matched item{results.length !== 1 && 's'}
                </span>
              </div>

              {/* Filter tabs */}
              <div className="atw-results-tabs-wrapper">
                <div className="atw-results-tabs">
                  {categoriesList.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`atw-tab-pill ${activeTab === tab ? 'active' : ''}`}
                    >
                      <span className="atw-tab-text">{tab}</span>
                      <span className="atw-tab-count-badge">{getCategoryCount(tab)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* List grid */}
              {displayedResults.length > 0 ? (
                <div className="atw-results-grid">
                  {displayedResults.map(item => (
                    <a
                      href={item.url}
                      key={item.id}
                      className="atw-search-result-card"
                      target={item.external ? '_blank' : '_self'}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <div className="atw-card-top-meta">
                        <span className="atw-result-category-badge">
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </span>
                        {item.external && (
                          <span className="atw-external-badge">
                            <ExternalLink size={11} /> Google Drive
                          </span>
                        )}
                      </div>
                      
                      <h3 className="atw-result-card-title">
                        {highlightText(item.title, query)}
                      </h3>
                      
                      <p className="atw-result-card-snippet">
                        {highlightText(item.snippet, query)}
                      </p>

                      <div className="atw-result-card-action">
                        <span className="atw-action-text">
                          {item.external ? 'Open photo album' : 'Read full section'}
                        </span>
                        <ArrowRight size={16} className="atw-arrow-icon" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                /* No tab category matches */
                <div className="atw-search-no-results">
                  <ShieldAlert size={48} className="atw-no-results-icon" />
                  <h3>No matches found in category "{activeTab}"</h3>
                  <p>There are matched results in other tabs. Please click the "All Results" tab or select another category above.</p>
                  <button onClick={() => setActiveTab('All')} className="atw-back-to-all-btn">
                    View All Results ({results.length})
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Idle state - User has not inputted a query */
            <div className="atw-search-idle-state">
              <Search size={64} className="atw-idle-icon" />
              <h2>What are you looking for today?</h2>
              <p>Type in keywords above to instantly search our platform. Find leadership departments, program schedules, values, articles, and biographies.</p>
              <div className="atw-idle-quick-links">
                <a href="about.html" className="atw-quick-link-card">
                  <h4>Our Story</h4>
                  <span>Where we started</span>
                </a>
                <a href="mission-vision.html" className="atw-quick-link-card">
                  <h4>Mission & Vision</h4>
                  <span>Why we exist</span>
                </a>
                <a href="media-center.html" className="atw-quick-link-card">
                  <h4>Media Center</h4>
                  <span>Photos & albums</span>
                </a>
                <a href="our-team.html" className="atw-quick-link-card">
                  <h4>Leadership Team</h4>
                  <span>Who is steering us</span>
                </a>
                <a href="get-involved.html" className="atw-quick-link-card">
                  <h4>Get Involved</h4>
                  <span>Join the movement</span>
                </a>
              </div>
            </div>
          )}

          {/* No results fallback */}
          {query && results.length === 0 && (
            <div className="atw-search-empty-fallback">
              <ShieldAlert size={64} className="atw-empty-icon" />
              <h2>No results matched your search</h2>
              <p>We couldn't find any content matching "{query}". Please check your spelling or try different, broader keywords.</p>
              
              <div className="atw-search-tips">
                <h4>Search Tips:</h4>
                <ul>
                  <li>Check spelling and try again.</li>
                  <li>Use simple, single terms (e.g., "climate" instead of "climate action strategy").</li>
                  <li>Search for specific staff names like "Alice", "David", "Richard", or "Lydia".</li>
                  <li>Try navigating to our key pages directly below:</li>
                </ul>
              </div>

              <div className="atw-idle-quick-links" style={{ marginTop: '30px' }}>
                <a href="/index.html" className="atw-quick-link-card">
                  <h4>Platform Home</h4>
                  <span>Return to start</span>
                </a>
                <a href="mission-vision.html" className="atw-quick-link-card">
                  <h4>Theory of Change</h4>
                  <span>Our visual pathway</span>
                </a>
                <a href="get-involved.html" className="atw-quick-link-card">
                  <h4>Volunteer</h4>
                  <span>Get involved today</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      <AtwFooter />
    </div>
  );
};

export default SearchPage;
