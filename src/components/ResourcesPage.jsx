import React from 'react';
import AtwNavbar from './AtwNavbar';
import AtwFooter from './AtwFooter';
import { FileText, Download, ArrowRight, BookOpen, Calendar, ExternalLink } from 'lucide-react';
import './ResourcesPage.css';

const reportUrl = '/ATW%20REPORT.pdf';
const reportDownloadName = 'ATW_REPORT.pdf';

const resources = [
  {
    id: 1,
    type: 'report',
    title: 'ATW Annual Report',
    description:
      'A comprehensive overview of Alice Talk World\'s impact, programs, partnerships, and milestones over the past year.',
    date: '2026',
    fileUrl: reportUrl,
    downloadName: reportDownloadName,
    cover: '/images/atw/795A9243.jpg',
    featured: true,
  },
];

const ResourcesPage = () => {
  const featuredReport = resources.find((r) => r.featured);

  return (
    <div className="res-root">
      <AtwNavbar />

      {/* Hero Section */}
      <section className="res-hero">
        <div className="res-hero-bg" />
        <div className="res-hero-overlay" />
        <div className="res-hero-content">
          <span className="res-hero-eyebrow">Resources</span>
          <h1 className="res-hero-title">
            Reports & Publications
          </h1>
          <p className="res-hero-desc">
            Explore reports, concept notes, and publications that document our journey,
            impact, and vision for empowering young leaders across Africa.
          </p>
          <nav className="res-hero-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="resources.html">Resources</a>
          </nav>
        </div>
      </section>

      {/* Featured Report Section */}
      <section className="res-featured-section">
        <div className="res-section-inner">
          <div className="res-section-header">
            <span className="res-section-eyebrow">Featured Report</span>
            <h2 className="res-section-title">ATW Annual Report</h2>
            <p className="res-section-subtitle">
              Read or download our latest annual report to learn about the programs,
              partnerships, and people shaping our impact.
            </p>
          </div>

          {featuredReport && (
            <div className="res-report-card" id="report">
              <div className="res-report-preview">
                <div className="res-pdf-viewer-wrapper">
                  <object
                    data={featuredReport.fileUrl}
                    type="application/pdf"
                    className="res-pdf-object"
                    aria-label="ATW Annual Report PDF preview"
                  >
                    <div className="res-pdf-fallback">
                      <img
                        src={featuredReport.cover}
                        alt="ATW Annual Report cover"
                        className="res-pdf-fallback-img"
                      />
                      <div className="res-pdf-fallback-overlay">
                        <FileText size={48} />
                        <span>PDF preview not available in this browser</span>
                      </div>
                    </div>
                  </object>
                </div>
              </div>

              <div className="res-report-info">
                <div className="res-report-meta">
                  <span className="res-report-badge">
                    <BookOpen size={14} /> Annual Report
                  </span>
                  <span className="res-report-date">
                    <Calendar size={14} /> {featuredReport.date}
                  </span>
                </div>
                <h3 className="res-report-title">{featuredReport.title}</h3>
                <p className="res-report-desc">{featuredReport.description}</p>
                <div className="res-report-actions">
                  <a
                    href={featuredReport.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="res-btn-primary"
                  >
                    <ExternalLink size={16} /> View Report
                  </a>
                  <a
                    href={featuredReport.fileUrl}
                    download={featuredReport.downloadName}
                    className="res-btn-secondary"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="res-more-section">
        <div className="res-section-inner">
          <div className="res-section-header res-section-header--center">
            <span className="res-section-eyebrow">Coming Soon</span>
            <h2 className="res-section-title">More Resources</h2>
            <p className="res-section-subtitle">
              We are preparing additional training manuals, concept notes, and research
              publications. Check back soon or contact us to request specific materials.
            </p>
          </div>

          <div className="res-request-card">
            <div className="res-request-text">
              <h3>Need a specific resource?</h3>
              <p>
                Reach out to our team for training manuals, concept notes, partnership
                kits, or speaking materials.
              </p>
            </div>
            <a
              href="mailto:atw@alicetalkworld.org?subject=Resource%20Request%20-%20Alice%20Talk%20World"
              className="res-btn-primary"
            >
              Request Resources <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <AtwFooter />
    </div>
  );
};

export default ResourcesPage;
