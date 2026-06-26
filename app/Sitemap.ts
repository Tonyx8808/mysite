import type { MetadataRoute } from 'next'

const SITE_URL = 'https://arussodev.it' // ← stesso valore di layout.tsx

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}