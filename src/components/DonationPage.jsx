import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Heart, Award, Users, Calendar, Handshake, CheckCircle } from 'lucide-react';
import './DonationPage.css';

export const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');

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

                  <a 
                    href={getDonationLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dns-box-donate-btn"
                  >
                    Donate Now
                  </a>
                  <span className="dns-box-caption">
                    You will be redirected to our secure payment partner, Paystack.
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
    </div>
  );
};

export default DonationPage;
