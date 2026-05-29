import React, { useState } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Mail, X, ArrowRight, Award, Target, HelpCircle } from 'lucide-react';
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

// Initials generator for avatar placeholder
const getInitials = (name) => {
  if (!name) return 'ATW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const OurTeamPage = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedMember, setSelectedMember] = useState(null);

  // Executive Team data (including Directors and Core Leadership)
  const executives = {
    featured: {
      name: 'Alice Yakubu',
      role: 'Founder & Executive Director',
      image: '/images/atw/alice.jpeg',
      shortDesc: 'Leading youth empowerment, leadership development, and community impact initiatives.',
      bio: 'Alice Yakubu is the Founder and Executive Director of Alice Talk World. She provides strategic leadership for the organization, driving initiatives focused on youth empowerment, leadership development, mentorship, and community impact across Africa.',
      focusAreas: ['Organizational Leadership', 'Youth Development', 'Strategic Partnerships', 'Women\'s Empowerment'],
      linkedin: 'https://linkedin.com/in/alicetalkworld-gh-24b513243/',
      email: 'alice@alicetalkworld.org'
    },
    executiveLeadership: [
      {
        name: 'David Baah Tonkouru',
        role: 'Chief Operating Officer (COO)',
        image: '/images/atw/Baah Tonkouru David.jpg',
        shortDesc: 'Translating vision into measurable impact through operations and programs.',
        bio: 'David oversees the day-to-day operations of Alice Talk World, ensuring the successful execution of programs, partnerships, and organizational initiatives. He plays a key role in translating vision into measurable impact.',
        focusAreas: ['Operations Management', 'Program Implementation', 'Team Coordination', 'Organizational Growth'],
        linkedin: 'https://linkedin.com/in/david-baah-tonkouru',
        email: 'david@alicetalkworld.org'
      },
      {
        name: 'Elizabeth Otu',
        role: 'General Secretary',
        image: '/images/atw/Gifty Adobeah.jpg',
        shortDesc: 'Supporting the governance, administration, and internal coordination of the organization.',
        bio: 'Elizabeth supports the governance and administration of the organization, ensuring effective coordination, documentation, and communication across departments and leadership structures.',
        focusAreas: ['Administration', 'Governance', 'Documentation', 'Internal Coordination'],
        linkedin: 'https://linkedin.com/in/elizabeth-otu',
        email: 'elizabeth@alicetalkworld.org'
      }
    ],
    departmentLeads: [
      {
        name: 'KSM',
        role: 'Special Projects Lead',
        image: 'placeholder',
        shortDesc: 'Leading the planning and execution of strategic projects and special initiatives.',
        bio: 'KSM leads the planning and execution of strategic projects and special initiatives that advance Alice Talk World\'s mission and long-term goals.',
        focusAreas: ['Strategic Projects', 'Program Innovation', 'Stakeholder Engagement'],
        linkedin: '#',
        email: 'ksm@alicetalkworld.org'
      },
      {
        name: 'Vincent',
        role: 'Head of Media',
        image: 'placeholder',
        shortDesc: 'Overseeing media strategy, digital communications, and impact storytelling.',
        bio: 'Vincent oversees the organization\'s media strategy, ensuring that Alice Talk World\'s stories, programs, and impact are effectively communicated across digital and traditional platforms.',
        focusAreas: ['Media Relations', 'Storytelling', 'Digital Communications'],
        linkedin: '#',
        email: 'vincent@alicetalkworld.org'
      },
      {
        name: 'Johnson',
        role: 'Content Lead',
        image: 'placeholder',
        shortDesc: 'Developing compelling copywriting and content strategies to engage the community.',
        bio: 'Johnson develops compelling content that informs, inspires, and engages the Alice Talk World community while amplifying the organization\'s mission and achievements.',
        focusAreas: ['Content Strategy', 'Copywriting', 'Campaign Messaging'],
        linkedin: '#',
        email: 'johnson@alicetalkworld.org'
      },
      {
        name: 'Henry',
        role: 'Creative Lead',
        image: 'placeholder',
        shortDesc: 'Leading the visual identity and brand creative direction across all platforms.',
        bio: 'Henry leads the visual identity and creative direction of Alice Talk World, ensuring consistent and impactful brand communication across all platforms.',
        focusAreas: ['Branding', 'Graphic Design', 'Creative Direction'],
        linkedin: '#',
        email: 'henry@alicetalkworld.org'
      },
      {
        name: 'Jude',
        role: 'Public Relations Lead',
        image: 'placeholder',
        shortDesc: 'Managing public relations, media visibility, and stakeholder relationships.',
        bio: 'Jude manages public relations efforts, strengthening the organization\'s visibility and fostering meaningful relationships with stakeholders and the wider public.',
        focusAreas: ['Public Relations', 'Communications', 'Stakeholder Engagement'],
        linkedin: '#',
        email: 'jude@alicetalkworld.org'
      },
      {
        name: 'Ghabby',
        role: 'Partnerships Lead',
        image: 'placeholder',
        shortDesc: 'Cultivating strategic partnerships and external relations with organizations.',
        bio: 'Ghabby leads partnership development efforts, cultivating relationships with organizations, institutions, and stakeholders that help expand the reach and impact of Alice Talk World.',
        focusAreas: ['Strategic Partnerships', 'Business Development', 'Stakeholder Relations'],
        linkedin: '#',
        email: 'ghabby@alicetalkworld.org'
      }
    ],
    thematicLeads: [
      {
        name: 'Adwoa',
        role: 'Gender Lead',
        image: 'placeholder',
        shortDesc: 'Promoting gender equity, inclusion, and advocacy for women and girls.',
        bio: 'Adwoa leads initiatives that promote gender equity, inclusion, and opportunities for women and girls through advocacy, mentorship, and leadership development programs.',
        focusAreas: ['Gender Equity', 'Women\'s Leadership', 'Advocacy'],
        linkedin: '#',
        email: 'adwoa@alicetalkworld.org'
      },
      {
        name: 'Lawrencia',
        role: 'Co-Lead, Gender Department',
        image: 'placeholder',
        shortDesc: 'Supporting implementation of gender-focused programs and outreach.',
        bio: 'Lawrencia supports the implementation of gender-focused initiatives and programs aimed at empowering women and fostering inclusive participation across communities.',
        focusAreas: ['Program Coordination', 'Gender Inclusion', 'Community Engagement'],
        linkedin: '#',
        email: 'lawrencia@alicetalkworld.org'
      },
      {
        name: 'Richard',
        role: 'Climate Lead',
        image: 'placeholder',
        shortDesc: 'Spearheading climate action, sustainability, and youth environmental advocacy.',
        bio: 'Richard spearheads Alice Talk World\'s climate action initiatives, promoting environmental awareness, sustainability, and youth-led solutions to climate challenges.',
        focusAreas: ['Climate Action', 'Sustainability', 'Environmental Advocacy'],
        linkedin: '#',
        email: 'richard@alicetalkworld.org'
      },
      {
        name: 'Chris',
        role: 'Climate Co-Lead',
        image: 'placeholder',
        shortDesc: 'Mobilizing youth for climate and environmental sustainability programs.',
        bio: 'Chris works alongside the Climate Lead to support environmental programs and mobilize young people to participate in climate and sustainability initiatives.',
        focusAreas: ['Climate Education', 'Youth Engagement', 'Sustainability Programs'],
        linkedin: '#',
        email: 'chris@alicetalkworld.org'
      }
    ],
    operationsSupport: [
      {
        name: 'Comfort Obeng',
        role: 'Chief Financial Officer',
        image: '/images/atw/Comfort Obeng.jpg',
        shortDesc: 'Managing organization budgets, financial planning, and stewardship.',
        bio: 'Comfort manages the financial planning and stewardship of the organization, ensuring transparency, accountability, and sustainable resource management.',
        focusAreas: ['Financial Management', 'Budgeting', 'Compliance'],
        linkedin: '#',
        email: 'comfort@alicetalkworld.org'
      },
      {
        name: 'Joseph Agbozo',
        role: 'Head of Publicity',
        image: '/images/atw/Joseph Agbozo.jpg',
        shortDesc: 'Leading publicity campaigns and promoting events to raise brand awareness.',
        bio: 'Joseph leads publicity campaigns that increase awareness of Alice Talk World\'s programs, events, and impact across diverse audiences.',
        focusAreas: ['Publicity', 'Campaign Promotion', 'Brand Awareness'],
        linkedin: '#',
        email: 'joseph@alicetalkworld.org'
      },
      {
        name: 'Lenz Addict',
        role: 'Head of Technology',
        image: '/images/atw/Lenz Addict.jpg',
        shortDesc: 'Overseeing technology platforms, digital innovation, and systems.',
        bio: 'Lenz oversees technology initiatives and digital platforms that support the organization\'s operations, communications, and engagement efforts.',
        focusAreas: ['Technology', 'Digital Innovation', 'Systems Development'],
        linkedin: '#',
        email: 'lenz@alicetalkworld.org'
      }
    ]
  };

  // Advisors and Mentors data
  const advisors = [
    {
      name: 'Dr. Khadija Owusu',
      role: 'Medical Advisor & Youth Mentor',
      image: 'placeholder',
      shortDesc: 'Advising on youth health awareness campaigns and mental health mentorship.',
      bio: 'Dr. Khadija Owusu is a passionate medical professional and global health advocate who advises Alice Talk World on health-related outreach, medical campaigns, and youth mentorship initiatives.',
      focusAreas: ['Youth Health Outreach', 'Medical Advocacy', 'Youth Mentorship'],
      linkedin: 'https://linkedin.com',
      email: 'khadija@alicetalkworld.org'
    },
    {
      name: 'Alfred Eli Dei',
      role: 'Entrepreneurship Consultant',
      image: 'placeholder',
      shortDesc: 'Guiding entrepreneurship training and leadership development programs.',
      bio: 'Alfred Eli Dei is an experienced entrepreneur and startup builder who guides our youth entrepreneurship cohorts, providing strategic direction on business modeling and innovation.',
      focusAreas: ['Entrepreneurship', 'Business Strategy', 'Innovation'],
      linkedin: 'https://linkedin.com',
      email: 'alfred@alicetalkworld.org'
    },
    {
      name: 'Dr. Ekua Amoako',
      role: 'Leadership Educator',
      image: 'placeholder',
      shortDesc: 'Academic and leadership consultant helping model youth development curriculums.',
      bio: 'Dr. Ekua Amoako is a dedicated educator and leadership consultant who helps curate Alice Talk World\'s leadership and career guidance curriculums.',
      focusAreas: ['Leadership Education', 'Curriculum Development', 'Career Mentorship'],
      linkedin: 'https://linkedin.com',
      email: 'ekua@alicetalkworld.org'
    },
    {
      name: 'Paa Kwesi Foison',
      role: 'Technology Advisor',
      image: 'placeholder',
      shortDesc: 'Steering digital literacy, tech education, and tech workspace projects.',
      bio: 'Paa Kwesi Foison is a technology leader who advises Alice Talk World on digital skills training, coding bootcamps, and expanding opportunities in the tech sector for young graduates.',
      focusAreas: ['Technology Education', 'Digital Skills', 'Workspace Strategy'],
      linkedin: 'https://linkedin.com',
      email: 'paakwesi@alicetalkworld.org'
    }
  ];

  // Volunteers data
  const volunteers = [
    {
      name: 'Mariam Majeed',
      role: 'Project Coordinator',
      image: 'placeholder',
      shortDesc: 'Coordinating school outreaches and material distribution in Tamale.',
      bio: 'Mariam plays a key role in coordinating logistical operations, community outreaches, and educational campaigns for our regional initiatives.',
      focusAreas: ['Project Logistics', 'School Outreach', 'Community Relations'],
      linkedin: 'https://linkedin.com',
      email: 'mariam@alicetalkworld.org'
    },
    {
      name: 'Joseph Agbozo',
      role: 'Media Assistant',
      image: 'placeholder',
      shortDesc: 'Supporting digital communication, media campaigns, and photography.',
      bio: 'Joseph works with our media team to document programs, edit video content, and manage visual archives for campaigns.',
      focusAreas: ['Photography', 'Content Creation', 'Social Media Support'],
      linkedin: 'https://linkedin.com',
      email: 'joseph@alicetalkworld.org'
    },
    {
      name: 'Abena Esaaba Kwofie',
      role: 'Administrative Support',
      image: 'placeholder',
      shortDesc: 'Assisting with records, correspondence, and event coordination.',
      bio: 'Abena supports the administrative office in documentation, correspondence, and managing communications with our volunteer base.',
      focusAreas: ['Documentation', 'Event Administration', 'Correspondence'],
      linkedin: 'https://linkedin.com',
      email: 'abena@alicetalkworld.org'
    },
    {
      name: 'Godfred Tabury',
      role: 'Creative Contributor',
      image: 'placeholder',
      shortDesc: 'Designing campaign flyers, web graphics, and branding assets.',
      bio: 'Godfred contributes his design skills to craft stunning visual campaigns, social media assets, and event booklets for our annual conferences.',
      focusAreas: ['Graphic Design', 'Brand Materials', 'Creative Support'],
      linkedin: 'https://linkedin.com',
      email: 'godfred@alicetalkworld.org'
    }
  ];

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  // Helper to render image or initials avatar
  const renderCardImage = (member) => {
    if (member.image && member.image !== 'placeholder') {
      return <img src={member.image} alt={member.name} className="atw-member-img" />;
    }
    return (
      <div className="atw-avatar-placeholder">
        {getInitials(member.name)}
      </div>
    );
  };

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
          <li>
            <button
              className={`atw-team-tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
              onClick={() => setActiveTab('volunteers')}
            >
              Volunteers
            </button>
          </li>
        </ul>
      </div>

      {/* Active Tab Content Section */}
      <section className="atw-team-content-section">
        <div className="atw-team-section-container">
          {activeTab === 'executive' && (
            <div>
              <div className="atw-team-section-header">
                <h3 className="atw-team-section-title">Leadership & Governance</h3>
                <p className="atw-team-section-desc">
                  Meet the steering committee, department leads, and operations specialists guiding Alice Talk World.
                </p>
              </div>

              {/* Subsection: Executive Leadership */}
              <div className="atw-team-subsection-divider">
                <h4 className="atw-team-subsection-title">Executive Leadership</h4>
              </div>

              {/* Featured Leader Card - Alice Yakubu */}
              <div className="atw-featured-leader-card">
                <div className="atw-featured-img-wrapper">
                  <img
                    src={executives.featured.image}
                    alt={executives.featured.name}
                    className="atw-featured-img"
                  />
                </div>
                <div className="atw-featured-content">
                  <span className="atw-featured-tag">Featured Leader</span>
                  <h4 className="atw-featured-name">{executives.featured.name}</h4>
                  <p className="atw-featured-role">{executives.featured.role}</p>
                  <p className="atw-featured-bio">{executives.featured.shortDesc}</p>
                  
                  <div className="atw-featured-skills">
                    {executives.featured.focusAreas.map((skill, i) => (
                      <span key={i} className="atw-featured-skill-tag">{skill}</span>
                    ))}
                  </div>

                  <button
                    className="atw-featured-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => setSelectedMember(executives.featured)}
                  >
                    View Profile <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Grid for other Executive Leaders */}
              <div className="atw-team-grid">
                {executives.executiveLeadership.map((director, index) => (
                  <div key={index} className="atw-member-card">
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

              {/* Subsection: Department Leads */}
              <div className="atw-team-subsection-divider">
                <h4 className="atw-team-subsection-title">Department Leads</h4>
              </div>

              <div className="atw-team-grid">
                {executives.departmentLeads.map((member, index) => (
                  <div key={index} className="atw-member-card">
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

              {/* Subsection: Thematic Leads */}
              <div className="atw-team-subsection-divider">
                <h4 className="atw-team-subsection-title">Thematic Leads</h4>
              </div>

              <div className="atw-team-grid">
                {executives.thematicLeads.map((member, index) => (
                  <div key={index} className="atw-member-card">
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

              {/* Subsection: Operations & Support */}
              <div className="atw-team-subsection-divider">
                <h4 className="atw-team-subsection-title">Operations & Support</h4>
              </div>

              <div className="atw-team-grid">
                {executives.operationsSupport.map((member, index) => (
                  <div key={index} className="atw-member-card">
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

              <div className="atw-team-grid">
                {advisors.map((advisor, index) => (
                  <div key={index} className="atw-member-card">
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
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div>
              <div className="atw-team-section-header">
                <h3 className="atw-team-section-title">Our Volunteers</h3>
                <p className="atw-team-section-desc">
                  The active coordinate and campaign leads making local development outreach happen.
                </p>
              </div>

              <div className="atw-team-grid">
                {volunteers.map((volunteer, index) => (
                  <div key={index} className="atw-member-card">
                    <div className="atw-member-img-wrapper">
                      {renderCardImage(volunteer)}
                    </div>
                    <div className="atw-member-info">
                      <h4 className="atw-member-name">{volunteer.name}</h4>
                      <p className="atw-member-role">{volunteer.role}</p>
                      <p className="atw-member-desc">{volunteer.shortDesc}</p>
                      <button
                        className="atw-member-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={() => setSelectedMember(volunteer)}
                      >
                        View Profile <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
              {selectedMember.image && selectedMember.image !== 'placeholder' ? (
                <img src={selectedMember.image} alt={selectedMember.name} className="atw-modal-img" />
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

              <h5 className="atw-modal-section-title">Areas of Expertise</h5>
              <div className="atw-modal-skills-list">
                {selectedMember.focusAreas.map((skill, index) => (
                  <span key={index} className="atw-featured-skill-tag">{skill}</span>
                ))}
              </div>

              <div className="atw-modal-contact-row">
                {selectedMember.linkedin && selectedMember.linkedin !== '#' && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atw-modal-contact-link"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>
                )}
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`} className="atw-modal-contact-link">
                    <Mail size={18} /> Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTeamPage;
