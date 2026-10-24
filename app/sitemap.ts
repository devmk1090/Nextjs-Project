import { MetadataRoute } from 'next'
import { toolPath, tools } from './tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://all-in-one-k-calculator.vercel.app').replace(/\/$/, '')
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
    ...['/about', '/privacy'].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
