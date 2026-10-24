import { MetadataRoute } from 'next'

// app/pages 아래의 모든 도구 경로. 새 도구를 추가하면 여기에도 추가해야 합니다.
const toolSlugs = [
  // 계산기
  'age-calculator',
  'zodiac-calculator',
  'constellation-calculator',
  'lunar-calculator',
  'solar-calculator',
  'dday-calculator',
  'day-calculator',
  'anniversary-calculator',
  'work-period-calculator',
  'bmi-calculator',
  'interest-calculator',
  'loan-calculator',
  'unit-converter',
  'pyeong-calculator',
  'timer-stopwatch',
  // 개발자 도구
  'json-formatter',
  'base64-converter',
  'url-encoder',
  'regex-tester',
  'hash-generator',
  'qr-generator',
  // 텍스트 도구
  'char-counter',
  'case-converter',
  'text-diff',
  'text-sorter',
  'duplicate-remover',
  // 색상 도구
  'color-converter',
  'color-extractor',
  'color-palette',
  'gradient-generator',
  // 랜덤 생성기
  'lotto-generator',
  'random-number',
  'random-name',
  'random-string',
  'dice-coin',
]

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
    ...toolSlugs.map((slug) => ({
      url: `${baseUrl}/pages/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
