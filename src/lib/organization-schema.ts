import { APOLO } from '@/config/apolo'

/**
 * Organization JSON-LD emitted in the (frontend) root layout so every page
 * exposes it to crawlers. VN-only site → uses VN brand block + apolo.com.vn.
 *
 * Issue 13 (Mr Hien): VN content must link only to apolo.com.vn, never
 * apololawyers.com. Helper enforces this by reading from APOLO.vn.
 */
export function organizationJsonLd(siteUrl: string) {
  const vn = APOLO.vn
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: vn.shortName,
    legalName: vn.legalName,
    url: siteUrl,
    sameAs: [vn.parentBrandUrl, 'https://zalo.me/apololawyers'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '108 Trần Đình Xu',
      addressLocality: 'Phường Cầu Ông Lãnh',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    email: vn.email,
    telephone: vn.callCenter,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: vn.callCenter,
        email: vn.email,
        areaServed: 'VN',
        availableLanguage: ['Vietnamese'],
      },
    ],
    areaServed: { '@type': 'Country', name: 'Vietnam' },
  }
}

export function websiteJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Luật Sư Trực Tuyến',
    alternateName: 'luatsutructuyen.net',
    url: siteUrl,
    inLanguage: 'vi-VN',
    publisher: { '@type': 'Organization', name: APOLO.vn.shortName, url: APOLO.vn.parentBrandUrl },
  }
}
