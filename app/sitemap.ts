import { MetadataRoute } from 'next'
import { toolPath, tools } from './tools'
import { siteUrl } from './site'
import { birthYears } from './pages/age-calculator/birthYear'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${toolPath(tool.slug)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...birthYears().map((year) => ({
      url: `${baseUrl}${toolPath('age-calculator')}/${year}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...['/about', '/privacy'].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
