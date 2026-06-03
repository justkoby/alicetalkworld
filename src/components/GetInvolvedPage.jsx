import React, { useEffect } from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { Heart, Handshake, Users, Compass, ArrowRight } from 'lucide-react';
import './GetInvolvedPage.css';

export const GetInvolvedPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pathways = [
    {
      id: 'donate',
      number: '01',
      title: 'Donate',
      tagline: 'Support Our Programs Directly',
      desc: 'Your donation helps fund leadership programs, mentorship sessions, community outreach, and youth development initiatives.',
      link: 'donation.html',
      btnText: 'Make a Donation',
      icon: <Heart className="gi-card-icon text-donate" size={32} />,
      colorClass: 'gi-card-donate'
    },
    {
      id: 'partner',
      number: '02',
      title: 'Become a Partner',
      tagline: 'Co-create Opportunities With Us',
      desc: 'Partner with Alice Talk World to support conferences, training programs, campus engagements, research, and community impact initiatives.',
      link: 'partner.html',
      btnText: 'Become a Partner',
      icon: <Handshake className="gi-card-icon text-partner" size={32} />,
      colorClass: 'gi-card-partner'
    },
    {
      id: 'volunteer',
      number: '03',
      title: 'Volunteer',
      tagline: 'Give Your Time. Create Impact.',
      desc: 'Join our volunteer network and support events, campaigns, programs, and outreach activities that empower young people.',
      link: 'volunteer.html',
      btnText: 'Volunteer With Us',
      icon: <Users className="gi-card-icon text-volunteer" size={32} />,
      colorClass: 'gi-card-volunteer'
    },
    {
      id: 'mentor',
      number: '04',
      title: 'Mentor',
      tagline: 'Guide the Next Generation',
      desc: 'Share your experience, knowledge, and network with young people seeking guidance, confidence, and direction.',
      link: 'mentor.html',
      btnText: 'Become a Mentor',
      icon: <Compass className="gi-card-icon text-mentor" size={32} />,
      colorClass: 'gi-card-mentor'
    }
  ];

  return (
    <div className="atw-root gi-root">
      <AtwNavbar />

      <main className="gi-main">
        {/* Hero Section */}
        <section className="gi-hero">
          <div className="gi-hero-overlay" />
          <div className="gi-hero-container">
            <span className="gi-hero-eyebrow">JOIN THE MOVEMENT</span>
            <h1 className="gi-hero-title">Create Opportunities for Youth</h1>
            <p className="gi-hero-desc">
              Help us create opportunities for young people to learn, lead, and thrive. Choose the path that matches your vision for impact.
            </p>
          </div>
        </section>

        {/* Pathways Grid */}
        <section className="gi-pathways-section">
          <div className="gi-container">
            <div className="gi-grid">
              {pathways.map((path) => (
                <div key={path.id} className={`gi-card ${path.colorClass}`}>
                  <div className="gi-card-header">
                    <span className="gi-card-number">{path.number}</span>
                    {path.icon}
                  </div>
                  <div className="gi-card-body">
                    <h2 className="gi-card-title">{path.title}</h2>
                    <p className="gi-card-tagline">{path.tagline}</p>
                    <p className="gi-card-desc">{path.desc}</p>
                  </div>
                  <div className="gi-card-footer">
                    <a href={path.link} className="gi-card-btn">
                      <span>{path.btnText}</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AtwFooter />
    </div>
  );
};

export default GetInvolvedPage;
