/**
 * Reusable SEO Metadata & Structured Data Utility for Alice Talk World.
 * Updates document head tags dynamically without external dependencies.
 */

const DEFAULT_TITLE = 'Alice Talk World | Inspiring Leaders, Igniting Change';
const DEFAULT_DESC =
  'Alice Talk World is dedicated to empowering the next generation of leaders through mentorship, skills development, and community impact campaigns.';

function getOrigin() {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return 'https://alicetalkworld.org';
}

/**
 * Ensures or updates a <meta> tag by attribute selector.
 */
function setMetaTag(attribute, value, content) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Removes a <meta> tag by attribute selector if present.
 */
function removeMetaTag(attribute, value) {
  if (typeof document === 'undefined') return;
  const element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (element) {
    element.remove();
  }
}

/**
 * Sets or updates canonical link element.
 */
function setCanonicalUrl(url) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

/**
 * Sets or replaces Schema.org JSON-LD script.
 */
function setJsonLd(data) {
  if (typeof document === 'undefined') return;
  const id = 'atw-structured-data';
  let element = document.getElementById(id);
  if (!data) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

/**
 * Format Title with fallback order:
 * 1. seo_title
 * 2. title
 * 3. Alice Talk World
 */
export function formatSeoTitle(title, seoTitle) {
  const raw = (seoTitle || title || '').trim();
  if (!raw) return 'Alice Talk World';
  if (raw.toLowerCase().includes('alice talk world')) {
    return raw;
  }
  return `${raw} | Alice Talk World`;
}

/**
 * Format Description with fallback order:
 * 1. seo_description
 * 2. summary or excerpt
 * 3. Short plain-text portion of content
 * 4. Site default description
 */
export function formatSeoDescription(seoDesc, excerpt, content, fallbackDesc = DEFAULT_DESC) {
  let text = (seoDesc || excerpt || '').trim();
  if (!text && content) {
    if (typeof content === 'string') {
      text = content.replace(/<[^>]*>?/gm, '').replace(/[#*_`]/g, '').trim();
    } else if (typeof content === 'object' && content !== null && content.text) {
      text = content.text.replace(/<[^>]*>?/gm, '').replace(/[#*_`]/g, '').trim();
    }
  }
  if (!text) {
    text = fallbackDesc;
  }
  // Trim to readable limit (~160 chars)
  if (text.length > 165) {
    return text.slice(0, 160).trim() + '...';
  }
  return text;
}

/**
 * Format Image with fallback to default social brand image.
 */
export function formatSeoImage(coverImage, origin = getOrigin()) {
  const defaultImage = `${origin}/images/atw/logo.png`;
  if (!coverImage || typeof coverImage !== 'string') return defaultImage;
  const trimmed = coverImage.trim();
  if (!trimmed) return defaultImage;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `${origin}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

/**
 * Clean canonical URL excluding tracking query parameters and URL fragments.
 */
export function buildCleanCanonicalUrl(pathname, queryParamKey, queryParamValue) {
  const origin = getOrigin();
  const cleanPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  if (queryParamKey && queryParamValue) {
    return `${origin}${cleanPath}?${encodeURIComponent(queryParamKey)}=${encodeURIComponent(queryParamValue)}`;
  }
  return `${origin}${cleanPath}`;
}

/**
 * Updates all head metadata and JSON-LD for an active detail page.
 */
export function applyDetailSeoMetadata({
  title,
  seoTitle,
  excerpt,
  seoDescription,
  content,
  coverImage,
  slug,
  publishedAt,
  authorName,
  pathname = '/news.html',
  queryParamKey = 'story',
  type = 'article',
  isNotFound = false,
  customJsonLd = null,
  defaultPageTitle = 'News & Insights | Alice Talk World',
  defaultPageDesc = 'Explore stories of impact, leadership journeys, community events, and partnerships from Alice Talk World.',
}) {
  if (typeof document === 'undefined') return;

  const origin = getOrigin();

  // 1. Not Found State
  if (isNotFound) {
    document.title = 'Content Not Found | Alice Talk World';
    setMetaTag('name', 'description', 'The requested content could not be found.');
    setMetaTag('name', 'robots', 'noindex, nofollow');
    setCanonicalUrl(buildCleanCanonicalUrl(pathname));
    removeMetaTag('property', 'og:title');
    removeMetaTag('property', 'og:description');
    removeMetaTag('property', 'og:image');
    removeMetaTag('property', 'og:url');
    removeMetaTag('property', 'og:type');
    removeMetaTag('name', 'twitter:card');
    removeMetaTag('name', 'twitter:title');
    removeMetaTag('name', 'twitter:description');
    removeMetaTag('name', 'twitter:image');
    setJsonLd(null);
    return;
  }

  // Remove any leftover noindex robots tag
  removeMetaTag('name', 'robots');

  // 2. Active Record Metadata
  const resolvedTitle = formatSeoTitle(title, seoTitle);
  const resolvedDesc = formatSeoDescription(seoDescription, excerpt, content, defaultPageDesc);
  const resolvedImage = formatSeoImage(coverImage, origin);
  const canonicalUrl = buildCleanCanonicalUrl(pathname, queryParamKey, slug);

  // Document Title & Description
  document.title = resolvedTitle;
  setMetaTag('name', 'description', resolvedDesc);
  setCanonicalUrl(canonicalUrl);

  // Open Graph
  setMetaTag('property', 'og:site_name', 'Alice Talk World');
  setMetaTag('property', 'og:title', resolvedTitle);
  setMetaTag('property', 'og:description', resolvedDesc);
  setMetaTag('property', 'og:image', resolvedImage);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', type);

  // Twitter
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', resolvedTitle);
  setMetaTag('name', 'twitter:description', resolvedDesc);
  setMetaTag('name', 'twitter:image', resolvedImage);

  // 3. Structured Data (JSON-LD)
  if (customJsonLd) {
    setJsonLd(customJsonLd);
  } else if (type === 'article' || type === 'news') {
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: (title || resolvedTitle).slice(0, 110),
      description: resolvedDesc,
      image: [resolvedImage],
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Alice Talk World',
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/images/atw/logo.png`,
        },
      },
    };

    if (publishedAt) {
      articleJsonLd.datePublished = new Date(publishedAt).toISOString();
    }

    if (authorName && typeof authorName === 'string') {
      const isOrg =
        authorName.toLowerCase().includes('editorial') ||
        authorName.toLowerCase().includes('board') ||
        authorName.toLowerCase().includes('alice talk world');
      articleJsonLd.author = {
        '@type': isOrg ? 'Organization' : 'Person',
        name: authorName.trim(),
      };
    } else {
      articleJsonLd.author = {
        '@type': 'Organization',
        name: 'Alice Talk World Editorial',
      };
    }

    setJsonLd(articleJsonLd);
  } else {
    setJsonLd(null);
  }
}

/**
 * Restores default page metadata when navigating back to list views or leaving detail page.
 */
export function restoreDefaultPageMetadata({
  title = 'News & Insights | Alice Talk World',
  description = 'Explore stories of impact, leadership journeys, community events, and partnerships from Alice Talk World.',
  pathname = '/news.html',
} = {}) {
  if (typeof document === 'undefined') return;

  const origin = getOrigin();
  document.title = title;
  setMetaTag('name', 'description', description);
  removeMetaTag('name', 'robots');
  setCanonicalUrl(`${origin}${pathname}`);

  // Clean detail-specific tags
  removeMetaTag('property', 'og:title');
  removeMetaTag('property', 'og:description');
  removeMetaTag('property', 'og:image');
  removeMetaTag('property', 'og:url');
  removeMetaTag('property', 'og:type');
  removeMetaTag('name', 'twitter:card');
  removeMetaTag('name', 'twitter:title');
  removeMetaTag('name', 'twitter:description');
  removeMetaTag('name', 'twitter:image');
  setJsonLd(null);
}
