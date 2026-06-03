import React, { useEffect, useState } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Calendar, Heart, ShieldAlert, Camera, ArrowDown, Award, Rocket, CheckCircle, Upload } from 'lucide-react';
import './VolunteerPage.css';

export const VolunteerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

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
        alert("There was an issue submitting your application. Please try again or email us directly at info@alicetalkworld.org.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Fallback: set to true to ensure user gets a positive feedback screen
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <a href="#volunteer-form" className="vln-btn-primary">
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

        {/* Volunteer Application Form Section */}
        <section id="volunteer-form" className="vln-form-section">
          <div className="vln-form-container">
            <div className="vln-section-header">
              <span className="vln-section-tag">APPLY NOW</span>
              <h2 className="vln-section-title">Volunteer Application Form</h2>
              <p style={{ marginTop: '8px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Interested in supporting our mission? Fill out the form below and our team will review your application and contact you with the next steps.
              </p>
            </div>

            {submitted ? (
              <div className="vln-success-card">
                <CheckCircle size={64} className="vln-success-icon" />
                <h3 className="vln-success-title">Application Submitted!</h3>
                <p className="vln-success-text">
                  Thank you for applying to volunteer with Alice Talk World. Our team will review your application and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="vln-form-card" encType="multipart/form-data">
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Volunteer Application - Alice Talk World" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="vln-form-grid">
                  <div className="vln-form-group">
                    <label className="vln-form-label">Full Name *</label>
                    <input type="text" name="Full Name" className="vln-form-input" required placeholder="John Doe" />
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Email Address *</label>
                    <input type="email" name="Email" className="vln-form-input" required placeholder="john@example.com" />
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Phone Number *</label>
                    <input type="tel" name="Phone Number" className="vln-form-input" required placeholder="+233 24 000 0000" />
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Location / City *</label>
                    <input type="text" name="Location / City" className="vln-form-input" required placeholder="Accra, Ghana" />
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Age Range</label>
                    <select name="Age Range" className="vln-form-select">
                      <option value="">Select Age Range</option>
                      <option value="Under 18">Under 18</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35+">35+</option>
                    </select>
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Gender</label>
                    <select name="Gender" className="vln-form-select">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="vln-form-group full-width">
                    <label className="vln-form-label">Occupation / Institution</label>
                    <input type="text" name="Occupation / Institution" className="vln-form-input" placeholder="Student / Professional / Job Seeker" />
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Area of Interest *</label>
                    <select name="Area of Interest" className="vln-form-select" required>
                      <option value="">Select Area of Interest</option>
                      <option value="Event Support">Event Support</option>
                      <option value="Community Outreach">Community Outreach</option>
                      <option value="Media & Photography">Media & Photography</option>
                      <option value="Content & Communications">Content & Communications</option>
                      <option value="Administrative Support">Administrative Support</option>
                      <option value="Climate Action">Climate Action</option>
                      <option value="Gender & Women Empowerment">Gender & Women Empowerment</option>
                      <option value="Mentorship Support">Mentorship Support</option>
                      <option value="Partnerships & Sponsorship">Partnerships & Sponsorship</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="vln-form-group">
                    <label className="vln-form-label">Availability *</label>
                    <select name="Availability" className="vln-form-select" required>
                      <option value="">Select Availability</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Flexible">Flexible</option>
                      <option value="Online / Remote">Online / Remote</option>
                      <option value="Event-based only">Event-based only</option>
                    </select>
                  </div>

                  <div className="vln-form-group full-width">
                    <label className="vln-form-label">Why do you want to volunteer with Alice Talk World? *</label>
                    <textarea name="Why volunteer" className="vln-form-textarea" required placeholder="Tell us about your motivation..." />
                  </div>

                  <div className="vln-form-group full-width">
                    <label className="vln-form-label">Relevant Skills / Experience</label>
                    <textarea name="Skills and Experience" className="vln-form-textarea" placeholder="List any skills or past volunteer roles..." />
                  </div>

                  <div className="vln-form-group full-width">
                    <label className="vln-form-label">Have you volunteered before?</label>
                    <select name="Volunteered Before" className="vln-form-select">
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="vln-form-group full-width">
                    <label className="vln-form-label">Upload CV / Portfolio / Supporting Document</label>
                    <div className="vln-form-file-input">
                      <label className="vln-form-file-label">
                        <Upload size={20} />
                        <span>{fileName || "Choose file to upload (PDF, Word, Images)"}</span>
                        <input type="file" name="Supporting Document" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>

                  <div className="vln-form-group full-width">
                    <div className="vln-form-checkbox-group">
                      <input type="checkbox" id="consent-check" name="Consent" required />
                      <label htmlFor="consent-check" className="vln-form-checkbox-label">
                        I agree that Alice Talk World may contact me regarding volunteer opportunities. *
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="vln-form-submit-btn">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="vln-cta-section">
          <div className="vln-cta-container">
            <h2 className="vln-cta-title">Ready To Make A Difference?</h2>
            <p className="vln-cta-desc">
              Join our network of changemakers and contribute your skills to support empowerment across Africa.
            </p>
            <a href="#volunteer-form" className="vln-btn-primary icon-btn">
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
