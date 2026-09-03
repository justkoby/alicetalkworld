import React, { useState, useEffect, useCallback } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Mail, X, ArrowRight, Phone } from 'lucide-react';
import { getTeamMembers } from '../services/teamService';
import { fallbackExecutives, fallbackAdvisors } from '../data/fallbackTeamData';
import './OurTeamPage.css';

// Custom LinkedIn icon since it is not exported by this version of lucide-react
const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom WhatsApp icon
const WhatsappIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Initials generator for avatar placeholder
const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'ATW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Phone sanitizer for WhatsApp links
const getWhatsAppUrl = (phone) => {
  if (!phone || typeof phone !== 'string') return null;
  const digits = phone.trim().replace(/\D/g, '');
  if (!digits) return null;
  const intlNumber = digits.startsWith('0') ? '233' + digits.slice(1) : digits;
  return `https://wa.me/${intlNumber}`;
};

// Skeleton components matching card layouts
const MemberCardSkeleton = () => (
  <div className="atw-member-card atw-skeleton-card" aria-hidden="true">
    <div className="atw-member-img-wrapper atw-skeleton-shimmer" />
    <div className="atw-member-info">
      <div className="atw-skeleton-line atw-skeleton-name" />
      <div className="atw-skeleton-line atw-skeleton-role" />
      <div className="atw-skeleton-line atw-skeleton-desc" />
      <div className="atw-skeleton-line atw-skeleton-desc-short" />
    </div>
  </div>
);

const FeaturedLeaderSkeleton = () => (
  <div className="atw-featured-leader-card atw-skeleton-card" aria-hidden="true">
    <div className="atw-featured-img-wrapper atw-skeleton-shimmer" />
    <div className="atw-featured-content">
      <div className="atw-skeleton-line atw-skeleton-tag" />
      <div className="atw-skeleton-line atw-skeleton-title" />
      <div className="atw-skeleton-line atw-skeleton-role" />
      <div className="atw-skeleton-line atw-skeleton-desc" />
      <div className="atw-skeleton-line atw-skeleton-desc-short" />
    </div>
  </div>
);

export const OurTeamPage = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [members, setMembers] = useState([]);
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (id) => {
    setFailedImages((prev) => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });
  };

  const loadTeamData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getTeamMembers();
    if (result.isFallback) {
      setIsFallback(true);
      setMembers([]);
    } else if (result.error) {
      setError(result.error);
      setIsFallback(false);
      setMembers([]);
    } else {
      setIsFallback(false);
      setMembers(result.data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTeamData();
  }, [loadTeamData]);

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  // Group active members based on whether Supabase data is loaded or fallback is active
  let featuredLeader = null;
  let executiveLeadership = [];
  let departmentLeads = [];
  let operationsSupport = [];
  let advisors = [];

  if (isFallback) {
    featuredLeader = fallbackExecutives.featured;
    executiveLeadership = fallbackExecutives.executiveLeadership;
    departmentLeads = fallbackExecutives.departmentLeads;
    operationsSupport = fallbackExecutives.operationsSupport;
    advisors = fallbackAdvisors;
  } else {
    featuredLeader = members.find((m) => m.team_group === 'featured' || m.is_featured) || null;
    executiveLeadership = members
      .filter((m) => m.team_group === 'executive_leadership' && (!featuredLeader || m.id !== featuredLeader.id))
      .sort((a, b) => a.display_order - b.display_order);
    departmentLeads = members
      .filter((m) => m.team_group === 'department_leads')
      .sort((a, b) => a.display_order - b.display_order);
    operationsSupport = members
      .filter((m) => m.team_group === 'operations_support')
      .sort((a, b) => a.display_order - b.display_order);
    advisors = members
      .filter((m) => m.team_group === 'advisors')
      .sort((a, b) => a.display_order - b.display_order);
  }

  // Helper to render image or initials avatar
  const renderCardImage = (member) => {
    const hasValidImage = member.image && member.image !== 'placeholder' && !failedImages.has(member.id);
    if (hasValidImage) {
      return (
        <img
          src={member.image}
          alt={member.name}
          className="atw-member-img"
          onError={() => handleImageError(member.id)}
        />
      );
    }
    return (
      <div className="atw-avatar-placeholder">
        {getInitials(member.name)}
      </div>
    );
  };

  const hasExecutiveContent = Boolean(
    featuredLeader ||
    executiveLeadership.length > 0 ||
    departmentLeads.length > 0 ||
    operationsSupport.length > 0
  );

  return (
    <div className="atw-team-root atw-root">
      {/* Navigation */}
      <AtwNavbar />

      {/* Page Hero */}
      <section className="atw-team-hero" style={{ backgroundImage: "url('/images/atw/team-bg.jpg')" }}>
        <div className="atw-team-hero-overlay" />
        <div className="atw-team-hero-content">
          <div className="atw-team-breadcrumbs">
            Home <span>/</span> About Us <span>/</span> Leadership
          </div>
          <h1 className="atw-team-hero-title">OUR STEWARDSHIP</h1>
          <p className="atw-team-hero-subtitle">Leadership & Governance</p>
          <p className="atw-team-hero-desc">
            Guided by Vision. Driven by Impact. Meet the dedicated leaders, advisors, and professionals
            working to create opportunities for young people and advance Alice Talk World's mission across communities.
          </p>
        </div>
      </section>

      {/* Leadership Introduction */}
      <section className="atw-team-intro-section">
        <div className="atw-team-intro-container">
          <span className="atw-team-intro-tag">Leadership Introduction</span>
          <h2 className="atw-team-intro-heading">Empowering the Next Generation Through Strong Leadership</h2>
          <p className="atw-team-intro-text">
            Behind every program, partnership, mentorship initiative, and success story is a team committed to creating
            opportunities for young people to learn, lead, and thrive.
          </p>
          <p className="atw-team-intro-supporting">
            Our leadership combines experience, innovation, community engagement, and a shared commitment
            to sustainable impact.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="atw-team-tabs-container">
        <ul className="atw-team-tabs">
          <li>
            <button
              className={`atw-team-tab-btn ${activeTab === 'executive' ? 'active' : ''}`}
              onClick={() => setActiveTab('executive')}
            >
              Executive Team
            </button>
          </li>
          <li>
            <button
              className={`atw-team-tab-btn ${activeTab === 'advisors' ? 'active' : ''}`}
              onClick={() => setActiveTab('advisors')}
            >
              Advisors & Mentors
            </button>
          </li>
        </ul>
      </div>

      {/* Active Tab Content Section */}
      <section className="atw-team-content-section">
        <div className="atw-team-section-container">
          {error && (
            <div className="atw-team-notice-box atw-team-notice-error">
              <p>Unable to load team members right now.</p>
              <button onClick={loadTeamData} className="atw-team-retry-btn">
                Retry
              </button>
            </div>
          )}

          {activeTab === 'executive' && (
            <div>
              <div className="atw-team-section-header">
                <h3 className="atw-team-section-title">Leadership & Governance</h3>
                <p className="atw-team-section-desc">
                  Meet the steering committee, department leads, and operations specialists guiding Alice Talk World.
                </p>
              </div>

              {loading ? (
                <div>
                  <div className="atw-team-subsection-divider">
                    <h4 className="atw-team-subsection-title">Executive Leadership</h4>
                  </div>
                  <FeaturedLeaderSkeleton />
                  <div className="atw-team-grid" style={{ marginTop: '30px' }}>
                    <MemberCardSkeleton />
                    <MemberCardSkeleton />
                    <MemberCardSkeleton />
                  </div>
                  <div className="atw-team-subsection-divider">
                    <h4 className="atw-team-subsection-title">Department Leads</h4>
                  </div>
                  <div className="atw-team-grid">
                    <MemberCardSkeleton />
                    <MemberCardSkeleton />
                    <MemberCardSkeleton />
                  </div>
                </div>
              ) : !hasExecutiveContent && !error ? (
                <div className="atw-team-notice-box atw-team-empty-state">
                  <p>No executive team members are currently active.</p>
                </div>
              ) : (
                <div>
                  {/* Subsection: Executive Leadership */}
                  <div className="atw-team-subsection-divider">
                    <h4 className="atw-team-subsection-title">Executive Leadership</h4>
                  </div>

                  {/* Featured Leader Card - Alice Yakubu */}
                  {featuredLeader && (
                    <div className="atw-featured-leader-card">
                      <div className="atw-featured-img-wrapper">
                        {renderCardImage(featuredLeader)}
                      </div>
                      <div className="atw-featured-content">
                        <span className="atw-featured-tag">Featured Leader</span>
                        <h4 className="atw-featured-name">{featuredLeader.name}</h4>
                        <p className="atw-featured-role">{featuredLeader.role}</p>
                        <p className="atw-featured-bio">{featuredLeader.shortDesc}</p>
                        
                        {featuredLeader.focusAreas && featuredLeader.focusAreas.length > 0 && (
                          <div className="atw-featured-skills">
                            {featuredLeader.focusAreas.map((skill, i) => (
                              <span key={i} className="atw-featured-skill-tag">{skill}</span>
                            ))}
                          </div>
                        )}

                        <button
                          className="atw-featured-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={() => setSelectedMember(featuredLeader)}
                        >
                          View Profile <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Grid for other Executive Leaders */}
                  {executiveLeadership.length > 0 && (
                    <div className="atw-team-grid">
                      {executiveLeadership.map((director) => (
                        <div key={director.id} className="atw-member-card">
                          <div className="atw-member-img-wrapper">
                            {renderCardImage(director)}
                          </div>
                          <div className="atw-member-info">
                            <h4 className="atw-member-name">{director.name}</h4>
                            <p className="atw-member-role">{director.role}</p>
                            <p className="atw-member-desc">{director.shortDesc}</p>
                            <button
                              className="atw-member-link"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                              onClick={() => setSelectedMember(director)}
                            >
                              View Profile <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subsection: Department Leads */}
                  {departmentLeads.length > 0 && (
                    <>
                      <div className="atw-team-subsection-divider">
                        <h4 className="atw-team-subsection-title">Department Leads</h4>
                      </div>

                      <div className="atw-team-grid">
                        {departmentLeads.map((member) => (
                          <div key={member.id} className="atw-member-card">
                            <div className="atw-member-img-wrapper">
                              {renderCardImage(member)}
                            </div>
                            <div className="atw-member-info">
                              <h4 className="atw-member-name">{member.name}</h4>
                              <p className="atw-member-role">{member.role}</p>
                              <p className="atw-member-desc">{member.shortDesc}</p>
                              <button
                                className="atw-member-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                onClick={() => setSelectedMember(member)}
                              >
                                View Profile <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Subsection: Operations & Support */}
                  {operationsSupport.length > 0 && (
                    <>
                      <div className="atw-team-subsection-divider">
                        <h4 className="atw-team-subsection-title">Operations & Support</h4>
                      </div>

                      <div className="atw-team-grid">
                        {operationsSupport.map((member) => (
                          <div key={member.id} className="atw-member-card">
                            <div className="atw-member-img-wrapper">
                              {renderCardImage(member)}
                            </div>
                            <div className="atw-member-info">
                              <h4 className="atw-member-name">{member.name}</h4>
                              <p className="atw-member-role">{member.role}</p>
                              <p className="atw-member-desc">{member.shortDesc}</p>
                              <button
                                className="atw-member-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                onClick={() => setSelectedMember(member)}
                              >
                                View Profile <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'advisors' && (
            <div>
              <div className="atw-team-section-header">
                <h3 className="atw-team-section-title">Our Advisory Network</h3>
                <p className="atw-team-section-desc">
                  A growing community of professionals, educators, entrepreneurs, and changemakers supporting our mission.
                </p>
              </div>

              {loading ? (
                <div className="atw-team-grid">
                  <MemberCardSkeleton />
                  <MemberCardSkeleton />
                  <MemberCardSkeleton />
                  <MemberCardSkeleton />
                  <MemberCardSkeleton />
                  <MemberCardSkeleton />
                </div>
              ) : advisors.length === 0 && !error ? (
                <div className="atw-team-notice-box atw-team-empty-state">
                  <p>No advisory network members are currently active.</p>
                </div>
              ) : (
                <div className="atw-team-grid">
                  {advisors.map((advisor) => (
                    <div key={advisor.id} className="atw-member-card">
                      <div className="atw-member-img-wrapper">
                        {renderCardImage(advisor)}
                      </div>
                      <div className="atw-member-info">
                        <h4 className="atw-member-name">{advisor.name}</h4>
                        <p className="atw-member-role">{advisor.role}</p>
                        <p className="atw-member-desc">{advisor.shortDesc}</p>
                        <button
                          className="atw-member-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={() => setSelectedMember(advisor)}
                        >
                          View Profile <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Join the Mission CTA Section */}
      <section className="atw-join-cta-section">
        <div className="atw-join-cta-container">
          <h3 className="atw-join-cta-title">Interested in Supporting Our Work?</h3>
          <p className="atw-join-cta-desc">
            Whether as a mentor, volunteer, partner, or supporter, there are many ways to help create opportunities for young people.
          </p>
          <div className="atw-join-cta-actions">
            <a href="contact.html" className="atw-btn-partner atw-btn-gold">
              Become a Partner
            </a>
            <a href="get-involved.html" className="atw-btn-partner atw-btn-outline-white">
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AtwFooter />

      {/* Individual Profile Modal */}
      {selectedMember && (
        <div className="atw-modal-overlay" onClick={handleCloseModal}>
          <div className="atw-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="atw-modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="atw-modal-img-wrapper">
              {selectedMember.image && selectedMember.image !== 'placeholder' && !failedImages.has(selectedMember.id) ? (
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="atw-modal-img"
                  onError={() => handleImageError(selectedMember.id)}
                />
              ) : (
                <div className="atw-avatar-placeholder" style={{ fontSize: '64px' }}>
                  {getInitials(selectedMember.name)}
                </div>
              )}
            </div>
            <div className="atw-modal-content">
              <h3 className="atw-modal-name">{selectedMember.name}</h3>
              <p className="atw-modal-role">{selectedMember.role}</p>
              
              <h5 className="atw-modal-section-title">Biography</h5>
              <p className="atw-modal-bio">{selectedMember.bio}</p>

              {selectedMember.focusAreas && selectedMember.focusAreas.length > 0 && (
                <>
                  <h5 className="atw-modal-section-title">Areas of Expertise</h5>
                  <div className="atw-modal-skills-list">
                    {selectedMember.focusAreas.map((skill, index) => (
                      <span key={index} className="atw-featured-skill-tag">{skill}</span>
                    ))}
                  </div>
                </>
              )}

              {selectedMember.socials && selectedMember.socials.trim() !== '' && (
                <div style={{ marginBottom: '20px' }}>
                  <h5 className="atw-modal-section-title">Active Social Media</h5>
                  <p className="atw-modal-bio" style={{ marginBottom: 0, fontWeight: 500 }}>
                    {selectedMember.socials.trim()}
                  </p>
                </div>
              )}

              <div className="atw-modal-contact-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
                {selectedMember.linkedin && selectedMember.linkedin !== '#' && selectedMember.linkedin.trim() !== '' && (
                  <a
                    href={selectedMember.linkedin.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atw-modal-contact-link"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>
                )}
                {selectedMember.email && selectedMember.email.trim() !== '' && (
                  <a href={`mailto:${selectedMember.email.trim()}`} className="atw-modal-contact-link">
                    <Mail size={18} /> Email
                  </a>
                )}
                {selectedMember.phone && selectedMember.phone.trim() !== '' && (
                  <a href={`tel:${selectedMember.phone.trim()}`} className="atw-modal-contact-link">
                    <Phone size={18} /> Call {selectedMember.phone.trim()}
                  </a>
                )}
                {(() => {
                  const waUrl = getWhatsAppUrl(selectedMember.whatsapp || selectedMember.phone);
                  if (!waUrl) return null;
                  return (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="atw-modal-contact-link"
                    >
                      <WhatsappIcon size={18} /> WhatsApp
                    </a>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTeamPage;
