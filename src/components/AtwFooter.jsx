import React, { useState } from 'react';

export const AtwFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `mailto:atw@alicetalkworld.org?subject=Newsletter Subscription Request - Alice Talk World&body=Please subscribe my email to the Alice Talk World newsletter: ${email}`;
      setEmail('');
    }
  };

  return (
    <footer className="atw-footer-section">
      <div className="atw-footer-container">
        <div className="atw-footer-top-grid">
          {/* Column 1: Logo, Mission & Social Icons */}
          <div className="atw-footer-logo-col">
            <a href="/">
              <img
                src="/images/atw/logo.png"
                alt="Alice Talk World Logo"
                className="atw-footer-logo-img"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="atw-footer-mission">
              Empowering young people through leadership, mentorship, innovation, and community impact across Africa.
            </p>
            <div className="atw-footer-socials-desktop" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {/* Facebook */}
              <a href="https://web.facebook.com/alicetalkworld" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              {/* Twitter */}
              <a href="https://twitter.com/alicetalkworld" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/alicetalkworld/" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.703.01 5.556 0 5.829 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.556 15.99 5.829 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.444.01 10.172 0 8 0zm0 1.442c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.486.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.11.281-.24.705-.275 1.485C.007 10.445 0 10.172 0 8s.007-2.389.047-3.232c.035-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047z"/><path d="M8 4.938c-1.755 0-3.187 1.432-3.187 3.188 0 1.755 1.432 3.187 3.187 3.187 1.755 0 3.187-1.432 3.187-3.187 0-1.756-1.432-3.188-3.187-3.188zm0 5.156c-1.12 0-2.031-.91-2.031-2.031 0-1.12.91-2.031 2.031-2.031s2.031.91 2.031 2.031c0 1.12-.911 2.031-2.031 2.031zm4.492-6.23c-.328 0-.594.266-.594.594s.266.594.594.594.594-.266.594-.594-.266-.594-.594-.594z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/alicetalkworld-gh-24b513243/" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="atw-footer-col atw-footer-contact-col">
            <h4 className="atw-footer-col-title">Contact Us</h4>
            <ul className="atw-footer-contact-list">
              <li>Accra, Ghana</li>
              <li>
                <a href="mailto:atw@alicetalkworld.org">atw@alicetalkworld.org</a>
              </li>
              <li>
                <a href="tel:+233242010044">0242010044</a> / <a href="tel:+233550407543">+233 55 040 7543</a>
              </li>
            </ul>
          </div>

          {/* Mobile-only Social Media Icons */}
          <div className="atw-footer-socials-mobile">
            {/* Facebook */}
            <a href="https://web.facebook.com/alicetalkworld" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Facebook">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com/alicetalkworld" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/alicetalkworld/" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.703.01 5.556 0 5.829 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.556 15.99 5.829 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.444.01 10.172 0 8 0zm0 1.442c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.486.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.11.281-.24.705-.275 1.485C.007 10.445 0 10.172 0 8s.007-2.389.047-3.232c.035-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.232-.047z"/><path d="M8 4.938c-1.755 0-3.187 1.432-3.187 3.188 0 1.755 1.432 3.187 3.187 3.187 1.755 0 3.187-1.432 3.187-3.187 0-1.756-1.432-3.188-3.187-3.188zm0 5.156c-1.12 0-2.031-.91-2.031-2.031 0-1.12.91-2.031 2.031-2.031s2.031.91 2.031 2.031c0 1.12-.911 2.031-2.031 2.031zm4.492-6.23c-.328 0-.594.266-.594.594s.266.594.594.594.594-.266.594-.594-.266-.594-.594-.594z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/alicetalkworld-gh-24b513243/" target="_blank" rel="noopener noreferrer" className="atw-footer-social-icon" aria-label="LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
          </div>

          {/* Column 3: Quick Links */}
          <div className="atw-footer-col atw-footer-desktop-only">
            <h4 className="atw-footer-col-title">Quick Links</h4>
            <ul className="atw-footer-links-list">
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html#work">Our Work</a></li>
              <li><a href="atw-5-highlights.html">Impact</a></li>
              <li><a href="media-center.html">Media Center</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Get Involved */}
          <div className="atw-footer-col atw-footer-desktop-only">
            <h4 className="atw-footer-col-title">Get Involved</h4>
            <ul className="atw-footer-links-list">
              <li><a href="donation.html">Donate</a></li>
              <li><a href="partner.html">Become a Partner</a></li>
              <li><a href="volunteer.html">Volunteer</a></li>
              <li><a href="mentor.html">Become a Mentor</a></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="atw-footer-col atw-footer-desktop-only">
            <h4 className="atw-footer-col-title">Resources</h4>
            <ul className="atw-footer-links-list">
              <li><a href="resources.html">Reports & Publications</a></li>
              <li><a href="news.html">News & Updates</a></li>
              <li><a href="media-center.html">Gallery</a></li>
              <li><a href="about.html#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Column 6: Newsletter Signup (moved from Column 7, replacing Follow Us list) */}
          <div className="atw-footer-col atw-footer-newsletter-col atw-footer-desktop-only">
            <h4 className="atw-footer-col-title">Stay Connected</h4>
            <p className="atw-footer-newsletter-text">
              Get updates on programs, events, and opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="atw-footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="atw-footer-newsletter-input"
              />
              <button type="submit" className="atw-footer-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="atw-footer-divider" />

        <div className="atw-footer-bottom">
          <p className="atw-footer-copyright">&copy; 2026 Alice Talk World</p>
          <div className="atw-footer-legal-links">
            <a href="#" className="atw-footer-legal-link">Privacy Policy</a>
            <a href="#" className="atw-footer-legal-link">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AtwFooter;
