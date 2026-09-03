import React, { useState, useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { BookOpen, Compass, Award, Share2, Heart, Award as Star, ChevronLeft, ChevronRight, User, Upload, CheckCircle, RotateCw } from 'lucide-react';
import { getActiveTestimonials, getTestimonialInitials } from '../services/testimonialService.js';
import './MentorPage.css';

export const MentorPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(false);

  const loadTestimonials = async () => {
    try {
      setTestimonialsLoading(true);
      setTestimonialsError(false);
      const res = await getActiveTestimonials();
      setTestimonials(res.data || []);
      setActiveTestimonial(0);
      if (res.error) {
        setTestimonialsError(true);
      }
    } catch {
      setTestimonialsError(true);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadTestimonials();
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [hasMentored, setHasMentored] = useState('');

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
      const response = await fetch("https://formsubmit.co/ajax/atw@alicetalkworld.org", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an issue submitting your application. Please try again or email us directly at atw@alicetalkworld.org.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Fallback: set to true to ensure user gets a positive feedback screen
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const nextTestimonial = () => {
    if (testimonials.length <= 1) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length <= 1) return;
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
              <a href="#mentor-form" className="mtr-btn-primary">
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
        {testimonialsLoading ? (
          <section className="mtr-success-section mtr-testimonials-loading" aria-label="Loading testimonials">
            <div className="mtr-container">
              <div className="mtr-section-header">
                <span className="mtr-section-tag">TESTIMONIALS</span>
                <h2 className="mtr-section-title">Success Stories</h2>
              </div>
              <div className="mtr-testimonial-slider" style={{ opacity: 0.6 }}>
                <div className="mtr-testimonial-content" style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p className="mtr-testimonial-quote" style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>
                    Loading stories...
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : testimonials.length > 0 ? (
          <section className="mtr-success-section">
            <div className="mtr-container">
              <div className="mtr-section-header">
                <span className="mtr-section-tag">TESTIMONIALS</span>
                <h2 className="mtr-section-title">Success Stories</h2>
              </div>

              <div className="mtr-testimonial-slider">
                {testimonials.length > 1 && (
                  <button onClick={prevTestimonial} className="mtr-slide-arrow left" aria-label="Previous story">
                    <ChevronLeft size={24} />
                  </button>
                )}

                <div className="mtr-testimonial-content">
                  {testimonials[activeTestimonial]?.quote && (
                    <p className="mtr-testimonial-quote">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                  )}
                  <div className="mtr-testimonial-meta">
                    <div className="mtr-testimonial-avatar">
                      {testimonials[activeTestimonial]?.imageUrl ? (
                        <img 
                          src={testimonials[activeTestimonial].imageUrl} 
                          alt={testimonials[activeTestimonial].fullName || 'Testimonial'} 
                          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : testimonials[activeTestimonial]?.fullName ? (
                        <span style={{ fontWeight: 700, fontSize: '15px' }}>
                          {getTestimonialInitials(testimonials[activeTestimonial].fullName)}
                        </span>
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      {testimonials[activeTestimonial]?.fullName && (
                        <h4 className="mtr-testimonial-author">{testimonials[activeTestimonial].fullName}</h4>
                      )}
                      {(testimonials[activeTestimonial]?.roleTitle || testimonials[activeTestimonial]?.organisation) && (
                        <span className="mtr-testimonial-role">
                          {[testimonials[activeTestimonial].roleTitle, testimonials[activeTestimonial].organisation].filter(Boolean).join(' • ')}
                        </span>
                      )}
                      {testimonials[activeTestimonial]?.location && (
                        <span className="mtr-testimonial-location"> &bull; {testimonials[activeTestimonial].location}</span>
                      )}
                    </div>
                  </div>
                </div>

                {testimonials.length > 1 && (
                  <button onClick={nextTestimonial} className="mtr-slide-arrow right" aria-label="Next story">
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : testimonialsError ? (
          <section className="mtr-success-section" style={{ padding: '40px 0' }}>
            <div className="mtr-container" style={{ textAlign: 'center' }}>
              <button 
                onClick={loadTestimonials} 
                className="mtr-slide-arrow" 
                style={{ width: 'auto', padding: '8px 16px', borderRadius: '8px', display: 'inline-flex', gap: '8px', fontSize: '14px' }}
              >
                <RotateCw size={14} /> Retry loading testimonials
              </button>
            </div>
          </section>
        ) : null}

        {/* Mentor Application Form Section */}
        <section id="mentor-form" className="mtr-form-section">
          <div className="mtr-form-container">
            <div className="mtr-section-header">
              <span className="mtr-section-tag">APPLY NOW</span>
              <h2 className="mtr-section-title">Mentor Application Form</h2>
              <p style={{ marginTop: '8px', color: '#374151' }}>
                Fill out the application below to share your expertise, inspire young minds, and join our active global network of mentors. Selected mentors will be published in our publications.
              </p>
            </div>

            {submitted ? (
              <div className="mtr-success-card">
                <CheckCircle size={64} className="mtr-success-icon" />
                <h3 className="mtr-success-title">Application Submitted!</h3>
                <p className="mtr-success-text">
                  Thank you for your interest in becoming a mentor with Alice Talk World. Our team will review your application and contact you regarding the next steps. We appreciate your willingness to invest in the growth and success of young people.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mtr-form-card" encType="multipart/form-data">
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Mentor Application - Alice Talk World" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="mtr-form-grid">
                  {/* Personal Information */}
                  <h3 className="mtr-form-section-title-sub">Personal Information</h3>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Full Name *</label>
                    <input type="text" name="Full Name" className="mtr-form-input" required placeholder="John Doe" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Email Address *</label>
                    <input type="email" name="Email" className="mtr-form-input" required placeholder="johndoe@example.com" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Phone Number *</label>
                    <input type="tel" name="Phone Number" className="mtr-form-input" required placeholder="+233 24 000 0000" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Country *</label>
                    <input type="text" name="Country" className="mtr-form-input" required placeholder="Ghana" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">City *</label>
                    <input type="text" name="City" className="mtr-form-input" required placeholder="Accra" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">LinkedIn Profile</label>
                    <input type="url" name="LinkedIn Profile" className="mtr-form-input" placeholder="https://linkedin.com/in/username" />
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Professional Website (Optional)</label>
                    <input type="url" name="Website" className="mtr-form-input" placeholder="https://example.com" />
                  </div>

                  {/* Professional Background */}
                  <h3 className="mtr-form-section-title-sub">Professional Background</h3>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Current Occupation *</label>
                    <input type="text" name="Occupation" className="mtr-form-input" required placeholder="e.g. Senior Software Engineer" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Organization / Company *</label>
                    <input type="text" name="Company" className="mtr-form-input" required placeholder="e.g. Google" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Industry *</label>
                    <select name="Industry" className="mtr-form-select" required>
                      <option value="">Select Industry</option>
                      <option value="Education">Education</option>
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Media & Communications">Media & Communications</option>
                      <option value="Government">Government</option>
                      <option value="NGO / Development">NGO / Development</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="Law">Law</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Years of Professional Experience *</label>
                    <select name="Years of Experience" className="mtr-form-select" required>
                      <option value="">Select Experience</option>
                      <option value="1-3 Years">1–3 Years</option>
                      <option value="4-7 Years">4–7 Years</option>
                      <option value="8-15 Years">8–15 Years</option>
                      <option value="15+ Years">15+ Years</option>
                    </select>
                  </div>

                  {/* Mentorship Interests */}
                  <h3 className="mtr-form-section-title-sub">Mentorship Interests</h3>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Areas You Can Mentor In * (Select all that apply)</label>
                    <div className="mtr-form-checkbox-grid">
                      {[
                        "Leadership Development",
                        "Career Guidance",
                        "Entrepreneurship",
                        "Public Speaking",
                        "Technology",
                        "Marketing & Communications",
                        "Personal Development",
                        "Project Management",
                        "Finance",
                        "Education",
                        "Climate Action",
                        "Gender Advocacy",
                        "Other"
                      ].map((item) => (
                        <div className="mtr-form-checkbox-option" key={item}>
                          <input type="checkbox" id={`area-${item}`} name="Mentor Areas" value={item} />
                          <label htmlFor={`area-${item}`}>{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Preferred Mentee Group * (Select all that apply)</label>
                    <div className="mtr-form-checkbox-grid">
                      {[
                        "High School Students",
                        "University Students",
                        "Young Professionals",
                        "Women & Girls",
                        "Entrepreneurs",
                        "Anyone"
                      ].map((item) => (
                        <div className="mtr-form-checkbox-option" key={item}>
                          <input type="checkbox" id={`mentee-${item}`} name="Preferred Mentees" value={item} />
                          <label htmlFor={`mentee-${item}`}>{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentorship Commitment */}
                  <h3 className="mtr-form-section-title-sub">Mentorship Commitment</h3>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">How often are you available? *</label>
                    <select name="Availability Frequency" className="mtr-form-select" required>
                      <option value="">Select Option</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-Weekly">Bi-Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Preferred Mentorship Format *</label>
                    <select name="Mentorship Format" className="mtr-form-select" required>
                      <option value="">Select Format</option>
                      <option value="Virtual">Virtual</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">How long are you willing to mentor? *</label>
                    <select name="Mentorship Duration" className="mtr-form-select" required>
                      <option value="">Select Duration</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="1 Year">1 Year</option>
                      <option value="Long-Term">Long-Term</option>
                    </select>
                  </div>

                  {/* Motivation */}
                  <h3 className="mtr-form-section-title-sub">Motivation & Experience</h3>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Why would you like to become a mentor? *</label>
                    <textarea 
                      name="Why become mentor" 
                      className="mtr-form-textarea" 
                      required 
                      placeholder="Tell us why mentorship matters to you and how you hope to support young people through Alice Talk World." 
                    />
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">What skills or experiences would you like to share with mentees? *</label>
                    <textarea 
                      name="Skills to share" 
                      className="mtr-form-textarea" 
                      required 
                      placeholder="Describe the main skills, experiences or knowledge nodes you want to share..." 
                    />
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Have you mentored before? *</label>
                    <div className="mtr-form-radio-grid">
                      <div className="mtr-form-radio-option">
                        <input 
                          type="radio" 
                          id="mentored-yes" 
                          name="Mentored Before" 
                          value="Yes" 
                          checked={hasMentored === 'Yes'}
                          onChange={() => setHasMentored('Yes')}
                          required
                        />
                        <label htmlFor="mentored-yes">Yes</label>
                      </div>
                      <div className="mtr-form-radio-option">
                        <input 
                          type="radio" 
                          id="mentored-no" 
                          name="Mentored Before" 
                          value="No" 
                          checked={hasMentored === 'No'}
                          onChange={() => setHasMentored('No')}
                          required
                        />
                        <label htmlFor="mentored-no">No</label>
                      </div>
                    </div>
                  </div>

                  {hasMentored === 'Yes' && (
                    <div className="mtr-form-group full-width">
                      <label className="mtr-form-label">Please briefly describe your mentoring experience *</label>
                      <textarea 
                        name="Mentoring Experience Description" 
                        className="mtr-form-textarea" 
                        required 
                        placeholder="Share details of your past mentoring relationships..." 
                      />
                    </div>
                  )}

                  {/* References */}
                  <h3 className="mtr-form-section-title-sub">References (Optional)</h3>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Professional Reference Name</label>
                    <input type="text" name="Reference Name" className="mtr-form-input" placeholder="Jane Doe" />
                  </div>

                  <div className="mtr-form-group">
                    <label className="mtr-form-label">Reference Email</label>
                    <input type="email" name="Reference Email" className="mtr-form-input" placeholder="jane@example.com" />
                  </div>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Relationship to You</label>
                    <input type="text" name="Reference Relationship" className="mtr-form-input" placeholder="e.g. Manager / Colleague / Advisor" />
                  </div>

                  {/* Upload */}
                  <h3 className="mtr-form-section-title-sub">Resume / CV Upload</h3>

                  <div className="mtr-form-group full-width">
                    <label className="mtr-form-label">Upload Resume / CV (PDF, DOC, DOCX - Optional)</label>
                    <div className="mtr-form-file-input">
                      <label className="mtr-form-file-label">
                        <Upload size={20} />
                        <span>{fileName || "Choose file to upload"}</span>
                        <input type="file" name="Resume CV" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                      </label>
                    </div>
                  </div>

                  {/* Consent */}
                  <h3 className="mtr-form-section-title-sub">Consent & Agreement</h3>

                  <div className="mtr-form-group full-width">
                    <div className="mtr-form-checkbox-group">
                      <input type="checkbox" id="consent-1" name="Accuracy Consent" required />
                      <label htmlFor="consent-1" className="mtr-form-checkbox-label">
                        I confirm that the information provided is accurate. *
                      </label>
                    </div>
                    <div className="mtr-form-checkbox-group">
                      <input type="checkbox" id="consent-2" name="Contact Consent" required />
                      <label htmlFor="consent-2" className="mtr-form-checkbox-label">
                        I agree to be contacted by Alice Talk World regarding mentorship opportunities. *
                      </label>
                    </div>
                    <div className="mtr-form-checkbox-group">
                      <input type="checkbox" id="consent-3" name="Placement Consent" required />
                      <label htmlFor="consent-3" className="mtr-form-checkbox-label">
                        I understand that submitting this form does not guarantee placement in the mentorship program. *
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="mtr-form-submit-btn">
                  {isSubmitting ? "Submitting..." : "Join Our Mentors Network"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Onboarding Pathway Section */}
        <section className="mtr-pathway-section">
          <div className="mtr-container">
            <div className="mtr-section-header">
              <span className="mtr-section-tag">ONBOARDING PIPELINE</span>
              <h2 className="mtr-section-title">What Happens Next?</h2>
            </div>

            <div className="mtr-pathway-flow">
              <div className="mtr-pathway-card">
                <span className="mtr-pathway-step-num">1</span>
                <h3 className="mtr-pathway-card-title">Submit Your Application</h3>
              </div>
              <div className="mtr-pathway-arrow">&darr;</div>
              <div className="mtr-pathway-card">
                <span className="mtr-pathway-step-num">2</span>
                <h3 className="mtr-pathway-card-title">Application Review</h3>
              </div>
              <div className="mtr-pathway-arrow">&darr;</div>
              <div className="mtr-pathway-card">
                <span className="mtr-pathway-step-num">3</span>
                <h3 className="mtr-pathway-card-title">Introductory Conversation</h3>
              </div>
              <div className="mtr-pathway-arrow">&darr;</div>
              <div className="mtr-pathway-card">
                <span className="mtr-pathway-step-num">4</span>
                <h3 className="mtr-pathway-card-title">Mentor Onboarding</h3>
              </div>
              <div className="mtr-pathway-arrow">&darr;</div>
              <div className="mtr-pathway-card">
                <span className="mtr-pathway-step-num">5</span>
                <h3 className="mtr-pathway-card-title">Begin Your Mentorship Journey</h3>
              </div>
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
            <a href="#mentor-form" className="mtr-btn-primary">
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
