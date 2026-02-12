import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/instellingen/', '/admin/'],
    },
    sitemap: 'https://www.geloofsgebonden.nl/sitemap.xml',
  }
}
