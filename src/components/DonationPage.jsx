import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Heart, Award, Users, Calendar, Handshake, CheckCircle, X, Info, Phone, Mail } from 'lucide-react';
import './DonationPage.css';

export const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paystackLinks = {
    '25': 'https://paystack.com/pay/your-25-cedi-link',
    '50': 'https://paystack.com/pay/your-50-cedi-link',
    '100': 'https://paystack.com/pay/your-100-cedi-link',
    '250': 'https://paystack.com/pay/your-250-cedi-link',
    'custom': 'https://paystack.com/pay/your-general-donation-link'
  };

  const getDonationLink = () => {
    if (customAmount) {
      return paystackLinks.custom;
    }
    return paystackLinks[selectedAmount] || paystackLinks.custom;
  };

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('custom');
  };

  const scrollToDonateBox = (e) => {
    e.preventDefault();
    const element = document.getElementById('donation-selector-box');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const donationSupports = [
    {
      title: 'Leadership Development',
      desc: 'Empowering young people with the skills and confidence to lead.',
      icon: <Award size={24} className="dns-support-icon" />
    },
    {
      title: 'Mentorship Programs',
      desc: 'Connecting young people with experienced professionals and role models.',
      icon: <Users size={24} className="dns-support-icon" />
    },
    {
      title: 'Community Outreach',
      desc: 'Creating opportunities for impact at the grassroots level.',
      icon: <Heart size={24} className="dns-support-icon" />
    },
    {
      title: 'Conferences & Events',
      desc: 'Bringing together young leaders, innovators, and changemakers.',
      icon: <Calendar size={24} className="dns-support-icon" />
    }
  ];

  const waysToGive = [
    {
      title: 'One-Time Donation',
      desc: 'Make a direct financial contribution to support our immediate needs and program runs.'
    },
    {
      title: 'Monthly Giving',
      desc: 'Provide consistent, predictable funding by becoming a monthly recurring donor.'
    },
    {
      title: 'Corporate Giving',
      desc: 'Engage your company in social impact through matching programs or direct sponsorships.'
    },
    {
      title: 'In-Kind Support',
      desc: 'Contribute resources, venue spaces, tech licenses, or equipment to back our activities.'
    }
  ];

  return (
    <div className="atw-root dns-root">
      <AtwNavbar />

      <main className="dns-main">
        {/* Hero Section */}
        <section className="dns-hero">
          <div className="dns-hero-overlay" />
          <div className="dns-hero-container">
            <span className="dns-hero-eyebrow">MAKE A DIFFERENCE</span>
            <h1 className="dns-hero-title">Support the Next Generation of Leaders</h1>
            <p className="dns-hero-desc">
              Your contribution helps create opportunities for young people through leadership development, mentorship, skills training, and community engagement.
            </p>
            <div className="dns-hero-cta">
              <a href="#donation-selector-box" onClick={scrollToDonateBox} className="dns-btn-primary">
                Donate Now
              </a>
            </div>
          </div>
        </section>

        {/* Why Support & Donate Box Section */}
        <section className="dns-calculator-section">
          <div className="dns-container">
            <div className="dns-calc-split">
              {/* Left Side: Why support */}
              <div className="dns-calc-info">
                <span className="dns-section-tag">WHY YOUR SUPPORT MATTERS</span>
                <h2 className="dns-calc-title">Bridging the Gap for Young Minds</h2>
                <p className="dns-calc-text">
                  Every year, thousands of young people face barriers to mentorship, leadership opportunities, and personal development.
                </p>
                <p className="dns-calc-text highlight">
                  Your support helps us bridge those gaps, providing the guidance and platforms they need to build confidence and map out their future.
                </p>
              </div>

              {/* Right Side: paystack donation selector */}
              <div className="dns-calc-box-wrapper" id="donation-selector-box">
                <div className="dns-calc-box">
                  <h3 className="dns-box-title">Choose an Amount to Give (GHS)</h3>
                  
                  <div className="dns-presets">
                    {['25', '50', '100', '250'].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountClick(amount)}
                        className={`dns-preset-btn ${selectedAmount === amount && !customAmount ? 'active' : ''}`}
                      >
                        ₵{amount}
                      </button>
                    ))}
                  </div>

                  <div className="dns-custom-input-wrapper">
                    <span className="dns-currency-symbol">₵</span>
                    <input
                      type="number"
                      placeholder="Other Amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="dns-custom-input"
                    />
                  </div>

                   <button 
                    onClick={() => setShowPaymentModal(true)} 
                    className="dns-box-donate-btn"
                    style={{ border: 'none', cursor: 'pointer', width: '100%', display: 'block', textAlign: 'center' }}
                  >
                    Donate Now
                  </button>
                  <span className="dns-box-caption">
                    Click to view payment methods and direct support options.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Your Donation Supports */}
        <section className="dns-supports-section">
          <div className="dns-container">
            <div className="dns-section-header">
              <span className="dns-section-tag">TRANSPARENCY & IMPACT</span>
              <h2 className="dns-section-title">What Your Donation Supports</h2>
            </div>

            <div className="dns-supports-grid">
              {donationSupports.map((item, index) => (
                <div key={index} className="dns-support-card">
                  <div className="dns-support-icon-wrapper">
                    {item.icon}
                  </div>
                  <h3 className="dns-support-card-title">{item.title}</h3>
                  <p className="dns-support-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact in Action */}
        <section className="dns-impact-section">
          <div className="dns-impact-overlay" />
          <div className="dns-container">
            <div className="dns-impact-grid">
              <div className="dns-impact-card">
                <span className="dns-impact-number">5,000+</span>
                <span className="dns-impact-label">Youth Reached</span>
              </div>
              <div className="dns-impact-card">
                <span className="dns-impact-number">25+</span>
                <span className="dns-impact-label">Programs Delivered</span>
              </div>
              <div className="dns-impact-card">
                <span className="dns-impact-number">15+</span>
                <span className="dns-impact-label">Strategic Partners</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ways to Give */}
        <section className="dns-ways-section">
          <div className="dns-container">
            <div className="dns-section-header">
              <span className="dns-section-tag">METHODS OF GIVING</span>
              <h2 className="dns-section-title">Ways To Give</h2>
            </div>

            <div className="dns-ways-grid">
              {waysToGive.map((way, index) => (
                <div key={index} className="dns-way-card">
                  <h3 className="dns-way-title">
                    <CheckCircle size={18} className="dns-way-icon" /> {way.title}
                  </h3>
                  <p className="dns-way-desc">{way.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="dns-cta-section">
          <div className="dns-cta-container">
            <h2 className="dns-cta-title">Invest in Potential. Create Lasting Impact.</h2>
            <p className="dns-cta-desc">
              Every contribution directly powers leadership workshops, mentorship hubs, and developmental conferences across Africa.
            </p>
            <a href="#donation-selector-box" onClick={scrollToDonateBox} className="dns-btn-primary">
              Donate Today
            </a>
          </div>
        </section>
      </main>

      <AtwFooter />

      {/* Payment details / Paystack setup info modal */}
      {showPaymentModal && (
        <div className="atw-modal-overlay" onClick={() => setShowPaymentModal(false)} style={{ zIndex: 1100 }}>
          <div className="atw-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="atw-modal-close-btn" onClick={() => setShowPaymentModal(false)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="atw-modal-content" style={{ padding: '10px 0' }}>
              <h3 className="atw-modal-name" style={{ color: 'var(--atw-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={24} fill="var(--atw-primary)" /> Support Alice Talk World
              </h3>
              <p className="atw-modal-bio" style={{ margin: '12px 0 20px 0' }}>
                Thank you for your willingness to donate! We support multiple options for processing your contribution.
              </p>

              {/* Direct MoMo details */}
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#111827' }}>Option 1: Mobile Money (Direct Transfer)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
                    <span>MTN MoMo:</span>
                    <strong>0242010044 (Alice Yakubu)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                    <span>MTN MoMo:</span>
                    <strong>0550407543 (David Yeboah)</strong>
                  </div>
                </div>
              </div>

              {/* Inquiry details */}
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#111827' }}>Option 2: Alternative Transfer / Inquiries</h4>
                <p style={{ fontSize: '13px', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                  To coordinate other donation methods (Bank transfer, corporate matches, or international contributions), reach out to our finance department:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a href="mailto:atw@alicetalkworld.org?subject=Donation%20Inquiry" className="atw-modal-contact-link" style={{ margin: 0 }}>
                    <Mail size={16} /> Email Finance
                  </a>
                  <a href="https://wa.me/233242010044" target="_blank" rel="noopener noreferrer" className="atw-modal-contact-link" style={{ margin: 0 }}>
                    <Phone size={16} /> WhatsApp Admin
                  </a>
                </div>
              </div>

              {/* Configuration advice */}
              <div style={{ borderLeft: '3px solid var(--atw-accent)', paddingLeft: '12px', fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
                <strong>For Administrators:</strong> To activate Paystack credit/debit card checkouts, create Payment Pages on your Paystack Dashboard and update the <code>paystackLinks</code> variable inside the <code>DonationPage.jsx</code> source file.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;
