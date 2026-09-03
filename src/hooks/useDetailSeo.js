import { useEffect } from 'react';
import { applyDetailSeoMetadata, restoreDefaultPageMetadata } from '../utils/seo.js';

/**
 * Reusable React Hook to synchronize document head tags, canonical URL,
 * OpenGraph, Twitter, and Schema.org JSON-LD with detail content state.
 */
export function useDetailSeo(options) {
  useEffect(() => {
    if (!options) return;

    if (options.isDetail) {
      applyDetailSeoMetadata(options);
    } else {
      restoreDefaultPageMetadata(options.defaultMetadata);
    }

    return () => {
      if (options.isDetail) {
        restoreDefaultPageMetadata(options.defaultMetadata);
      }
    };
  }, [
    options?.isDetail,
    options?.slug,
    options?.title,
    options?.seoTitle,
    options?.seoDescription,
    options?.excerpt,
    options?.coverImage,
    options?.isNotFound,
    options?.publishedAt,
    options?.authorName,
  ]);
}
