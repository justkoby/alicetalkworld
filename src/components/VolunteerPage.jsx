import React, { useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Calendar, Heart, ShieldAlert, Camera, ArrowDown, Award, Rocket, CheckCircle } from 'lucide-react';
import './VolunteerPage.css';

export const VolunteerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const opportunities = [
    {
      title: 'Event Support',
      desc: 'Assist during conferences, workshops, and outreach activities.',
      icon: <Calendar size={24} className="vln-opp-icon" />
    },
    {
      title: 'Community Engagement',
      desc: 'Support community projects and awareness campaigns.',
      icon: <Heart size={24} className="vln-opp-icon" />
    },
    {
      title: 'Administrative Support',
      desc: 'Contribute behind the scenes to help our programs succeed.',
      icon: <ShieldAlert size={24} className="vln-opp-icon" />
    },
    {
      title: 'Media & Content',
      desc: 'Support storytelling, photography, videography, and communications.',
      icon: <Camera size={24} className="vln-opp-icon" />
    }
  ];

  const benefits = [
    'Professional Development',
    'Leadership Experience',
    'Networking Opportunities',
    'Community Impact',
    'Certificate of Participation'
  ];

  const journeySteps = [
    { num: '1', title: 'Apply', desc: 'Fill out our online volunteer application form.' },
    { num: '2', title: 'Interview', desc: 'Have a short chat with our team to align expectations.' },
    { num: '3', title: 'Orientation', desc: 'Get introduced to our tools, guidelines, and values.' },
    { num: '4', title: 'Join A Team', desc: 'Get assigned to a specific domain or program team.' },
    { num: '5', title: 'Create Impact', desc: 'Start executing tasks and empowering young minds!' }
  ];

  return (
    <div className="atw-root vln-root">
      <AtwNavbar />

      <main className="vln-main">
        {/* Hero Section */}
        <section className="vln-hero">
          <div className="vln-hero-overlay" />
          <div className="vln-hero-container">
            <span className="vln-hero-eyebrow">GET INVOLVED</span>
            <h1 className="vln-hero-title">Give Your Time. Create Impact.</h1>
            <p className="vln-hero-desc">
              Join a growing community of volunteers committed to empowering young people and creating positive change.
            </p>
            <div className="vln-hero-cta">
              <a href="contact.html" className="vln-btn-primary">
                Become a Volunteer
              </a>
            </div>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="vln-why-section">
          <div className="vln-container">
            <div className="vln-why-split">
              <div className="vln-why-content">
                <span className="vln-section-tag">COMMUNITY & SERVICE</span>
                <h2 className="vln-why-title">Why Volunteer With Us</h2>
                <p className="vln-why-text">
                  Volunteers play an important role in helping us deliver programs, events, and initiatives that impact lives.
                </p>
                <p className="vln-why-text highlight">
                  By bringing your unique skills and voice, you support campaigns, conferences, and mentorship rounds that shape future professionals across Africa.
                </p>
              </div>
              <div className="vln-why-visual">
                <div className="vln-visual-card">
                  <div className="vln-visual-overlay" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="vln-opp-section">
          <div className="vln-container">
            <div className="vln-section-header">
              <span className="vln-section-tag">AREAS OF ENGAGEMENT</span>
              <h2 className="vln-section-title">Volunteer Opportunities</h2>
            </div>

            <div className="vln-opp-grid">
              {opportunities.map((item, index) => (
                <div key={index} className="vln-opp-card">
                  <div className="vln-opp-icon-wrapper">
                    {item.icon}
                  </div>
                  <h3 className="vln-opp-card-title">{item.title}</h3>
                  <p className="vln-opp-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits of Volunteering */}
        <section className="vln-benefits-section">
          <div className="vln-container">
            <div className="vln-section-header">
              <span className="vln-section-tag">GROW WITH US</span>
              <h2 className="vln-section-title">Benefits of Volunteering</h2>
            </div>

            <div className="vln-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="vln-benefit-card">
                  <div className="vln-benefit-icon-wrapper">
                    <Award size={20} />
                  </div>
                  <h3 className="vln-benefit-card-title">{benefit}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Journey Flowchart */}
        <section className="vln-journey-section">
          <div className="vln-container">
            <div className="vln-section-header">
              <span className="vln-section-tag">ONBOARDING PATHWAY</span>
              <h2 className="vln-section-title">Volunteer Journey</h2>
            </div>

            <div className="vln-journey-flow">
              {journeySteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="vln-journey-card">
                    <span className="vln-journey-step-num">{step.num}</span>
                    <h3 className="vln-journey-card-title">{step.title}</h3>
                    <p className="vln-journey-card-desc">{step.desc}</p>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="vln-journey-arrow">
                      <ArrowDown size={24} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="vln-cta-section">
          <div className="vln-cta-container">
            <h2 className="vln-cta-title">Ready To Make A Difference?</h2>
            <p className="vln-cta-desc">
              Join our network of changemakers and contribute your skills to support empowerment across Africa.
            </p>
            <a href="contact.html" className="vln-btn-primary icon-btn">
              <Rocket size={18} />
              <span>Volunteer With Us</span>
            </a>
          </div>
        </section>
      </main>

      <AtwFooter />
    </div>
  );
};

export default VolunteerPage;
