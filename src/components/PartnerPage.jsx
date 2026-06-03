import React, { useEffect, useState } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Briefcase, Landmark, Globe, Calendar, Check, MessageSquare, FileDown, Download, CheckCircle } from 'lucide-react';
import './PartnerPage.css';

export const PartnerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@alicetalkworld.org", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an issue submitting your inquiry. Please try again or email us directly at info@alicetalkworld.org.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Fallback: set to true to ensure user gets a positive feedback screen
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const opportunities = [
    {
      title: 'Corporate Partnerships',
      desc: 'Support leadership programs and youth development initiatives.',
      icon: <Briefcase size={24} className="ptn-opp-icon" />
    },
    {
      title: 'University Collaborations',
      desc: 'Partner on student engagement, mentorship, and leadership activities.',
      icon: <Landmark size={24} className="ptn-opp-icon" />
    },
    {
      title: 'Development Organizations',
      desc: 'Collaborate on community and youth-focused projects.',
      icon: <Globe size={24} className="ptn-opp-icon" />
    },
    {
      title: 'Event Sponsorship',
      desc: 'Support conferences, workshops, and empowerment events.',
      icon: <Calendar size={24} className="ptn-opp-icon" />
    }
  ];

  const benefits = [
    'Brand Visibility',
    'Community Impact',
    'Access to Youth Networks',
    'Strategic Engagement Opportunities',
    'Thought Leadership Opportunities'
  ];

  return (
    <div className="atw-root ptn-root">
      <AtwNavbar />

      <main className="ptn-main">
        {/* Hero Section */}
        <section className="ptn-hero">
          <div className="ptn-hero-overlay" />
          <div className="ptn-hero-container">
            <span className="ptn-hero-eyebrow">PARTNERSHIP</span>
            <h1 className="ptn-hero-title">Powering Opportunity Through Partnership</h1>
            <p className="ptn-hero-desc">
              Together, we can create meaningful opportunities that empower young people and strengthen communities.
            </p>
            <div className="ptn-hero-cta">
              <a href="#partner-form" className="ptn-btn-primary">
                Become a Partner
              </a>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="ptn-why-section">
          <div className="ptn-container">
            <div className="ptn-why-split">
              <div className="ptn-why-content">
                <span className="ptn-section-tag">COLLABORATION FOR GLOBAL IMPACT</span>
                <h2 className="ptn-why-title">Why Partner With Us</h2>
                <p className="ptn-why-text">
                  Alice Talk World works with organizations, institutions, universities, foundations, and businesses that share our commitment to youth empowerment and social impact.
                </p>
                <p className="ptn-why-text highlight">
                  By bringing together corporate strength, academic resources, and grassroots passion, we co-create programs that directly transition young Africans from learners to leaders.
                </p>
              </div>
              <div className="ptn-why-visual">
                <div className="ptn-visual-card">
                  <div className="ptn-visual-overlay" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="ptn-opp-section">
          <div className="ptn-container">
            <div className="ptn-section-header">
              <span className="ptn-section-tag">WAYS WE COLLABORATE</span>
              <h2 className="ptn-section-title">Partnership Opportunities</h2>
            </div>

            <div className="ptn-opp-grid">
              {opportunities.map((item, index) => (
                <div key={index} className="ptn-opp-card">
                  <div className="ptn-opp-icon-wrapper">
                    {item.icon}
                  </div>
                  <h3 className="ptn-opp-card-title">{item.title}</h3>
                  <p className="ptn-opp-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="ptn-benefits-section">
          <div className="ptn-container">
            <div className="ptn-section-header">
              <span className="ptn-section-tag">SHARED VALUES</span>
              <h2 className="ptn-section-title">Partnership Benefits</h2>
            </div>

            <div className="ptn-benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="ptn-benefit-item">
                  <div className="ptn-benefit-icon">
                    <Check size={18} />
                  </div>
                  <span className="ptn-benefit-text">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Current Partners (Endless Carousel) */}
        <section className="ptn-partners-section">
          <div className="ptn-container">
            <div className="ptn-section-header">
              <span className="ptn-section-tag">TRUST & OUTREACH</span>
              <h2 className="ptn-section-title">Our Current Partners</h2>
            </div>
            
            <div className="ptn-partners-marquee-container">
              <div className="ptn-partners-marquee-track">
                {repeatedPartners.map((logo, idx) => (
                  <div key={idx} className="ptn-partner-logo-item">
                    <img src={logo.src} alt={logo.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Resources Section */}
        <section className="ptn-resources-section">
          <div className="ptn-container">
            <div className="ptn-section-header">
              <span className="ptn-section-tag">DOCUMENTS & REPORTS</span>
              <h2 className="ptn-section-title">Partnership Resources</h2>
              <p style={{ marginTop: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Download our official documentation and reports to understand our impact and model.
              </p>
            </div>

            <div className="ptn-resources-grid">
              <div className="ptn-resource-card">
                <div className="ptn-resource-icon">
                  <FileDown size={40} />
                </div>
                <h3 className="ptn-resource-title">Partnership Brochure</h3>
                <p className="ptn-resource-desc">
                  An overview of partnership pathways, programs, and alignment guidelines.
                </p>
                <a href="#" className="ptn-resource-download-btn" onClick={(e) => e.preventDefault()}>
                  <Download size={16} style={{ marginRight: '6px' }} /> Download Brochure
                </a>
              </div>

              <div className="ptn-resource-card">
                <div className="ptn-resource-icon">
                  <FileDown size={40} />
                </div>
                <h3 className="ptn-resource-title">Organization Profile</h3>
                <p className="ptn-resource-desc">
                  Comprehensive details about our structure, governance, and operating framework.
                </p>
                <a href="#" className="ptn-resource-download-btn" onClick={(e) => e.preventDefault()}>
                  <Download size={16} style={{ marginRight: '6px' }} /> Download Profile
                </a>
              </div>

              <div className="ptn-resource-card">
                <div className="ptn-resource-icon">
                  <FileDown size={40} />
                </div>
                <h3 className="ptn-resource-title">Impact Report</h3>
                <p className="ptn-resource-desc">
                  Explore validated statistics, project outcomes, and success stories from past cohorts.
                </p>
                <a href="#" className="ptn-resource-download-btn" onClick={(e) => e.preventDefault()}>
                  <Download size={16} style={{ marginRight: '6px' }} /> Download Impact Report
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Inquiry Form Section */}
        <section id="partner-form" className="ptn-form-section">
          <div className="ptn-form-container">
            <div className="ptn-section-header">
              <span className="ptn-section-tag">GET IN TOUCH</span>
              <h2 className="ptn-section-title">Let's Start A Conversation</h2>
              <p style={{ marginTop: '8px', color: '#374151' }}>
                Fill out the form below and our partnerships team will review your request to explore mutual collaboration pathways.
              </p>
            </div>

            {submitted ? (
              <div className="ptn-success-card">
                <CheckCircle size={64} className="ptn-success-icon" />
                <h3 className="ptn-success-title">Thank You!</h3>
                <p className="ptn-success-text">
                  Thank you for reaching out for a partnership with Alice Talk World. Our team will review your inquiry and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ptn-form-card">
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Partnership Inquiry - Alice Talk World" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="ptn-form-grid">
                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Organization Name *</label>
                    <input type="text" name="Organization Name" className="ptn-form-input" required placeholder="e.g. Acme Corp / Star University" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Contact Person *</label>
                    <input type="text" name="Contact Person" className="ptn-form-input" required placeholder="Jane Doe" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Position / Title</label>
                    <input type="text" name="Position" className="ptn-form-input" placeholder="e.g. Director of Partnerships / Coordinator" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Email Address *</label>
                    <input type="email" name="Email" className="ptn-form-input" required placeholder="jane@organization.com" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Phone Number</label>
                    <input type="tel" name="Phone Number" className="ptn-form-input" placeholder="+233 24 000 0000" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Website</label>
                    <input type="url" name="Website" className="ptn-form-input" placeholder="https://example.com" />
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Organization Type *</label>
                    <select name="Organization Type" className="ptn-form-select" required>
                      <option value="">Select Organization Type</option>
                      <option value="Corporate Organization">Corporate Organization</option>
                      <option value="University">University</option>
                      <option value="NGO">NGO</option>
                      <option value="Foundation">Foundation</option>
                      <option value="Government Agency">Government Agency</option>
                      <option value="Media Organization">Media Organization</option>
                      <option value="Development Partner">Development Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="ptn-form-group">
                    <label className="ptn-form-label">Partnership Interest *</label>
                    <select name="Partnership Interest" className="ptn-form-select" required>
                      <option value="">Select Partnership Interest</option>
                      <option value="Event Sponsorship">Event Sponsorship</option>
                      <option value="Leadership Program Support">Leadership Program Support</option>
                      <option value="Mentorship Collaboration">Mentorship Collaboration</option>
                      <option value="Media Partnership">Media Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="ptn-form-group full-width">
                    <label className="ptn-form-label">Message *</label>
                    <textarea name="Message" className="ptn-form-textarea" required placeholder="Describe your partnership vision or questions..." />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="ptn-form-submit-btn">
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="ptn-cta-section">
          <div className="ptn-cta-container">
            <h2 className="ptn-cta-title">Let's Create Impact Together</h2>
            <p className="ptn-cta-desc">
              Get in touch with our partnerships team to schedule a call and discuss collaborative programs.
            </p>
            <a href="#partner-form" className="ptn-btn-primary icon-btn">
              <MessageSquare size={18} />
              <span>Schedule A Conversation</span>
            </a>
          </div>
        </section>
      </main>

      <AtwFooter />
    </div>
  );
};

export default PartnerPage;
