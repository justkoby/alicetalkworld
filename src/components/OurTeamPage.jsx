import React, { useState } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Mail, X, ArrowRight, Award, Target, HelpCircle, Phone } from 'lucide-react';
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
      image: '/images/atw/Alice Yakubu.jpeg',
      shortDesc: 'Founder of Alice TalkWorld, a platform connecting young people with opportunities.',
      bio: 'Alice Yakubu is a Gender-Inclusive Youth Advocate and youth development leader dedicated to empowering young people and women through mentorship, leadership development, and innovation. She is the Founder of Alice TalkWorld, a platform that connects young people with opportunities for networking, entrepreneurship, and personal growth. Alice serves as a Member of the Gender Advocacy Working Group of the All-Africa Students Union, championing youth and gender inclusion initiatives across Africa. Passionate about leadership, women and girls\' empowerment, and community development, she works to equip the next generation with the skills and confidence to create meaningful impact.',
      focusAreas: ['Youth Development', 'Mentorship', 'Leadership Development', 'Women & Girls\' Empowerment', 'Community Development'],
      linkedin: 'https://www.linkedin.com/in/yakubu-alice?',
      email: 'yakubualice99@gmail.com',
      whatsapp: '0242010044',
      socials: 'All platforms'
    },
    executiveLeadership: [
      {
        name: 'David Tonkouru Baah',
        role: 'Co-Director',
        image: '/images/atw/David Baah.jpeg',
        shortDesc: 'IT Professional with a passion for technology, innovation, and digital solutions.',
        bio: 'David Tonkouru Baah is an IT Professional with a passion for technology, innovation, and digital solutions. He provides IT leadership and support to organizations and businesses, specializing in infrastructure management, systems support, networking, and digital transformation. He is committed to delivering reliable solutions that drive efficiency and growth.',
        focusAreas: ['IT Infrastructure & Systems', 'Network & Security', 'Technical Support & Troubleshooting', 'Digital Solutions'],
        linkedin: 'https://www.linkedin.com/in/david-tonkournu-baah-29228a1b3',
        email: 'baahdavid54@gmail.com',
        whatsapp: '0540718885'
      },
      {
        name: 'David Yeboah',
        role: 'Chief Operations Officer',
        image: '/images/atw/David Yeboah.jpeg',
        shortDesc: 'Project Manager, Operations Specialist, and strategic communications professional.',
        bio: 'David Yeboah is a Project Manager, Operations Specialist, cybersecurity researcher, and strategic communications professional committed to driving innovation and sustainable development. His work combines technology, research, operations and digital communications to create impactful solutions, with a strong interest in artificial intelligence, climate action, and community development.',
        focusAreas: ['Project & Operations Management', 'Cybersecurity & AI', 'Research & Policy Development', 'Digital Media Strategy', 'Climate Action & Sustainable Development', 'Political Strategist'],
        linkedin: 'https://www.linkedin.com/in/davidyeboahexsqua',
        whatsapp: '0550407543'
      },
      {
        name: 'Gifty Adobeah',
        role: 'Campus Coordinator Lead',
        image: '/images/atw/Gifty Adobeah.jpg',
        shortDesc: 'Leading campus coordination and student engagement across the organization.',
        bio: 'Gifty is the Campus Coordinator Lead at Alice TalkWorld. She leads campus-based coordination, student engagement, and outreach efforts. She supports the team in building strong campus relationships, organizing student-focused activities, and creating opportunities for young people to connect with the organization’s programs and impact.',
        focusAreas: ['Campus Coordination', 'Student Engagement', 'Community Outreach', 'Program Support'],
        linkedin: '#',
        email: 'gifty@alicetalkworld.org'
      }
    ],
    departmentLeads: [
      {
        name: 'Adwoa Amaniampong Brenyah',
        role: 'Gender Lead',
        image: '/images/atw/Adwoa Amaniampong Brenyah.jpg',
        shortDesc: 'Gender Team Lead promoting equality, youth empowerment, and inclusive leadership.',
        bio: 'Adwoa Amaniampong Brenyah is the Gender Team Lead at Alice Talk World. She leads initiatives that promote gender equality, youth empowerment, and inclusive leadership across Africa. Driven by purpose and service, she is committed to leading initiatives that inspire growth, strengthen communities, and create opportunities for young people to thrive.',
        focusAreas: ['Youth Empowerment', 'Strategic Communication', 'Leadership Development'],
        linkedin: 'https://www.linkedin.com/in/adwoa-amaniampong-brenyah-33910531',
        email: 'maameadwoab23@gmail.com',
        whatsapp: '0202215827'
      },
      {
        name: 'Lawrencia Owusu',
        role: 'Co-Gender Lead',
        image: 'placeholder',
        shortDesc: 'Helping drive the gender agenda, equity, and Women\'s Connect cohorts.',
        bio: 'Lawrencia Owusu is Co-Gender Lead at Alice Talk World, where she helps drive the organisation\'s gender agenda and ensures equity and inclusion run through its leadership and mentorship work. She currently co-champions the Women\'s Connect Cohort 2, a flagship initiative advancing women\'s voice, leadership, and opportunity across the communities.',
        focusAreas: ['Gender Equality and Social Inclusion (GESI)', 'Monitoring and Evaluation', 'Safeguarding'],
        linkedin: 'https://www.linkedin.com/in/lawrencia-owusu/',
        email: 'Lawrenciaowusu00@gmail.com',
        whatsapp: '0560097959'
      },
      {
        name: 'Jude Nartey Jr',
        role: 'Media & Communication Lead',
        image: '/images/atw/Jude Nartey Jnr.jpeg',
        shortDesc: 'Overseeing public image, storytelling, and communication strategies.',
        bio: 'Jude Nartey Jr serves as the Public Relations Officer of Alice Talk World (ATW). He oversees the organization\'s public image, communication strategies and stakeholder engagement through effective storytelling, media relations, and digital communication.',
        focusAreas: ['Communications', 'Media Relations', 'Brand Management', 'Content Creation & Storytelling', 'Social Media Management'],
        linkedin: 'https://www.linkedin.com/in/jude-k-nartey-jr-17619235a',
        email: 'judekofinarteyjunior@gmail.com',
        whatsapp: '0271040525'
      },
      {
        name: 'Kwadwo Arpong Manu',
        role: 'Inclusive and Special Initiative Lead',
        image: '/images/atw/Kwodwo Sarpong Manu.jpeg',
        shortDesc: 'Directing special initiatives and inclusive programs for impact.',
        bio: 'Kwadwo Arpong Manu directs inclusive and special initiative programs at Alice Talk World, ensuring that our projects cater to diverse needs and achieve strategic social outcomes.',
        focusAreas: ['Inclusive Initiatives', 'Project Execution', 'Strategic Partnerships'],
        linkedin: 'https://www.linkedin.com/in/kwadwo-s-manu-828716159?',
        email: 'kwadwomanu16@gmail.com',
        whatsapp: '0277803385'
      },
      {
        name: 'Chris Afari Addo',
        role: 'Lead, Climate Department',
        image: '/images/atw/Chris Addo.jpeg',
        shortDesc: 'Sustainability advocate reducing carbon footprint and waste.',
        bio: 'Chris Afari Addo is a sustainability advocate dedicated to helping the film industry, events, and organizations reduce their carbon footprint and minimize waste to combat global warming. His expertise includes data management, communication, report writing, sustainability memo design, and crew engagement. He has contributed to sustainable film productions and community development projects in Ghana, with a primary focus on building strong relationships with crews and promoting sustainability through education and awareness initiatives.',
        focusAreas: ['Sustainability Advocacy', 'Data Management', 'Crew Engagement', 'Report Writing'],
        email: 'chrisaddo13@gmail.com',
        whatsapp: '0240041515'
      },
      {
        name: 'Richard Yennuam Laarison',
        role: 'Co-Lead, Climate Department',
        image: '/images/atw/Richard Laarison.jpeg',
        shortDesc: 'Agribusiness Professional supporting climate and entrepreneurship.',
        bio: 'Richard Yennuam Laarison is an Agribusiness Professional and the Deputy Head of Department for Climate and Entrepreneurship at Alice Talkworld. He supports the initiation and implementation of climate and entrepreneurship related projects.',
        focusAreas: ['Agribusiness', 'Climate Projects', 'Entrepreneurship Support'],
        email: 'laarisonrichard2002@gmail.com',
        whatsapp: '0249745823'
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
      name: 'Benjamin Kusi',
      role: 'Advisory Board Chair',
      image: 'placeholder',
      shortDesc: 'Guiding the organization\'s advisory board and governance direction.',
      bio: 'Benjamin Kusi serves as the Advisory Board Chair for Alice Talk World, steering strategic governance and advisory board engagements.',
      focusAreas: ['Strategic Advisory', 'Board Chairmanship', 'Governance Support'],
      whatsapp: '0240398373'
    },
    {
      name: 'Mr. Xorlali Victor Deletsu',
      role: 'Consultant',
      image: 'placeholder',
      shortDesc: 'Advising on structures and organizational strategy consultations.',
      bio: 'Mr. Xorlali Victor Deletsu is an experienced development and business Consultant providing strategic support and operational guidance to Alice Talk World.',
      focusAreas: ['Consulting', 'Strategic Planning', 'Operational Support']
    },
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

              {selectedMember.socials && (
                <div style={{ marginBottom: '20px' }}>
                  <h5 className="atw-modal-section-title">Active Social Media</h5>
                  <p className="atw-modal-bio" style={{ marginBottom: 0, fontWeight: 500 }}>
                    {selectedMember.socials}
                  </p>
                </div>
              )}

              <div className="atw-modal-contact-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
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
                {selectedMember.phone && (
                  <a href={`tel:${selectedMember.phone}`} className="atw-modal-contact-link">
                    <Phone size={18} /> Call {selectedMember.phoneNote ? `(${selectedMember.phoneNote})` : selectedMember.phone}
                  </a>
                )}
                {selectedMember.whatsapp && (
                  <a
                    href={`https://wa.me/233${selectedMember.whatsapp.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atw-modal-contact-link"
                  >
                    <WhatsappIcon size={18} /> WhatsApp {selectedMember.whatsappNote ? `(${selectedMember.whatsappNote})` : selectedMember.whatsapp}
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
