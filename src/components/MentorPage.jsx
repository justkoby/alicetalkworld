import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { BookOpen, Compass, Award, Share2, Heart, Award as Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import './MentorPage.css';

export const MentorPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mentorTypes = [
    'Professionals',
    'Entrepreneurs',
    'Academics',
    'Industry Experts',
    'Community Leaders',
    'Experienced Practitioners'
  ];

  const mentorDuties = [
    {
      title: 'Career Guidance',
      desc: 'Help mentees navigate career choices and build professional pathways.',
      icon: <BookOpen size={24} className="mtr-do-icon" />
    },
    {
      title: 'Leadership Coaching',
      desc: 'Guide mentees in developing soft skills, executive presence, and management skills.',
      icon: <Star size={24} className="mtr-do-icon" />
    },
    {
      title: 'Skills Development',
      desc: 'Offer technical oversight, code reviews, writing critiques, or business planning assistance.',
      icon: <Award size={24} className="mtr-do-icon" />
    },
    {
      title: 'Networking Support',
      desc: 'Introduce mentees to industry platforms, tools, and valuable career contacts.',
      icon: <Share2 size={24} className="mtr-do-icon" />
    },
    {
      title: 'Personal Growth Support',
      desc: 'Help young leaders build emotional resilience, self-esteem, and work-life balance.',
      icon: <Heart size={24} className="mtr-do-icon" />
    }
  ];

  const commitments = [
    'Monthly mentoring sessions',
    'Virtual or physical engagement',
    'Participation in mentor events',
    'Supporting mentee development goals'
  ];

  const benefits = [
    { title: 'Give Back To Society', desc: 'Directly guide young leaders who will go on to shape communities across Africa.' },
    { title: 'Develop Leadership Skills', desc: 'Refine your coaching, active listening, and constructive feedback skillsets.' },
    { title: 'Expand Your Professional Network', desc: 'Connect with a prestigious cohort of global mentors and industry sponsors.' },
    { title: 'Inspire Future Leaders', desc: 'Unlock new perspectives and pass on hard-earned life lessons to ambitious students.' }
  ];

  const testimonials = [
    {
      quote: "Being a mentor at Alice Talk World allowed me to guide a young developer in Accra. Watching her secure her first engineering role was incredibly rewarding.",
      author: "David Kwadwo",
      role: "Senior Software Engineer & ATW Mentor",
      location: "Accra, Ghana"
    },
    {
      quote: "The monthly sessions are structured yet flexible. It is a fantastic network of professionals who are genuinely dedicated to lifting others up.",
      author: "Gifty Amah",
      role: "Operations Consultant & ATW Mentor",
      location: "Lagos, Nigeria"
    },
    {
      quote: "My mentor helped me refine my business plan and pitching style. Today, our startup employs six young people, and that started with a simple intro chat.",
      author: "Alice Mensah",
      role: "Mentee & Youth Founder",
      location: "Kumasi, Ghana"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="atw-root mtr-root">
      <AtwNavbar />

      <main className="mtr-main">
        {/* Hero Section */}
        <section className="mtr-hero">
          <div className="mtr-hero-overlay" />
          <div className="mtr-hero-container">
            <span className="mtr-hero-eyebrow">MENTORSHIP</span>
            <h1 className="mtr-hero-title">Guide the Next Generation of Leaders</h1>
            <p className="mtr-hero-desc">
              Share your knowledge, experience, and insights with young people seeking growth, direction, and opportunity.
            </p>
            <div className="mtr-hero-cta">
              <a href="contact.html" className="mtr-btn-primary">
                Become a Mentor
              </a>
            </div>
          </div>
        </section>

        {/* Why Mentorship Section */}
        <section className="mtr-why-section">
          <div className="mtr-container">
            <div className="mtr-why-split">
              <div className="mtr-why-content">
                <span className="mtr-section-tag">IMPACT THROUGH RELATIONSHIP</span>
                <h2 className="mtr-why-title">Why Mentorship Matters</h2>
                <p className="mtr-why-text">
                  Mentorship helps young people gain confidence, make informed decisions, and navigate personal and professional challenges.
                </p>
                <p className="mtr-why-text highlight">
                  By matching students with seasoned professionals, we ensure that leadership theory meets practical guidance in the real world.
                </p>
              </div>

              {/* Who can become a mentor */}
              <div className="mtr-who-card">
                <h3 className="mtr-who-title">Who Can Become A Mentor?</h3>
                <ul className="mtr-who-list">
                  {mentorTypes.map((type, index) => (
                    <li key={index} className="mtr-who-item">
                      <span className="mtr-who-dot" />
                      <span className="mtr-who-text">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What Mentors Do */}
        <section className="mtr-do-section">
          <div className="mtr-container">
            <div className="mtr-section-header">
              <span className="mtr-section-tag">ROLE SPECIFICATION</span>
              <h2 className="mtr-section-title">What Mentors Do</h2>
            </div>

            <div className="mtr-do-grid">
              {mentorDuties.map((item, index) => (
                <div key={index} className="mtr-do-card">
                  <div className="mtr-do-icon-wrapper">
                    {item.icon}
                  </div>
                  <h3 className="mtr-do-card-title">{item.title}</h3>
                  <p className="mtr-do-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentor Commitments */}
        <section className="mtr-commit-section">
          <div className="mtr-container">
            <div className="mtr-commit-split">
              <div className="mtr-commit-visual">
                <div className="mtr-commit-image-card">
                  <div className="mtr-commit-image-overlay" />
                </div>
              </div>
              
              <div className="mtr-commit-content">
                <span className="mtr-section-tag">PROGRAM REQUIREMENTS</span>
                <h2 className="mtr-commit-title">Mentor Commitment</h2>
                <ul className="mtr-commit-list">
                  {commitments.map((item, index) => (
                    <li key={index} className="mtr-commit-item">
                      <span className="mtr-commit-marker">&rarr;</span>
                      <span className="mtr-commit-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits of Mentorship */}
        <section className="mtr-benefits-section">
          <div className="mtr-container">
            <div className="mtr-section-header">
              <span className="mtr-section-tag">GROWTH & GIVING</span>
              <h2 className="mtr-section-title">Benefits of Becoming a Mentor</h2>
            </div>

            <div className="mtr-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="mtr-benefit-card">
                  <h3 className="mtr-benefit-card-title">{benefit.title}</h3>
                  <p className="mtr-benefit-card-desc">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Slider */}
        <section className="mtr-success-section">
          <div className="mtr-container">
            <div className="mtr-section-header">
              <span className="mtr-section-tag">TESTIMONIALS</span>
              <h2 className="mtr-section-title">Success Stories</h2>
            </div>

            <div className="mtr-testimonial-slider">
              <button onClick={prevTestimonial} className="mtr-slide-arrow left" aria-label="Previous story">
                <ChevronLeft size={24} />
              </button>

              <div className="mtr-testimonial-content">
                <p className="mtr-testimonial-quote">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="mtr-testimonial-meta">
                  <div className="mtr-testimonial-avatar">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="mtr-testimonial-author">{testimonials[activeTestimonial].author}</h4>
                    <span className="mtr-testimonial-role">{testimonials[activeTestimonial].role}</span>
                    <span className="mtr-testimonial-location"> &bull; {testimonials[activeTestimonial].location}</span>
                  </div>
                </div>
              </div>

              <button onClick={nextTestimonial} className="mtr-slide-arrow right" aria-label="Next story">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mtr-cta-section">
          <div className="mtr-cta-container">
            <h2 className="mtr-cta-title">Help Shape the Future</h2>
            <p className="mtr-cta-desc">
              Become part of a network of leaders dedicated to empowering the next generation across Africa.
            </p>
            <a href="contact.html" className="mtr-btn-primary">
              Join Our Mentors Network
            </a>
          </div>
        </section>
      </main>

      <AtwFooter />
    </div>
  );
};

export default MentorPage;
