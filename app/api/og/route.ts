import { NextRequest, NextResponse } from 'next/server'

function extractOgTag(html: string, property: string): string {
  const metas = html.match(/<meta\s[^>]+>/gi) || []
  for (const meta of metas) {
    if (meta.toLowerCase().includes(`og:${property}`)) {
      const m = meta.match(/content=["']([^"']*)/i)
      if (m) return decodeEntities(m[1])
    }
  }
  return ''
}

function extractNameMeta(html: string, name: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'),
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m) return decodeEntities(m[1])
  }
  return ''
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

function resolveImageUrl(imageUrl: string, base: string): string {
  if (!imageUrl) return ''
  try {
    return new URL(imageUrl, base).href
  } catch {
    return imageUrl
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: '유효하지 않은 URL입니다' }, { status: 400 })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    clearTimeout(timeoutId)

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) {
      return NextResponse.json({ title: url, description: '', image: '', url })
    }

    // Read only up to the closing </head> tag (OG tags live in <head>)
    const reader = response.body?.getReader()
    let html = ''
    if (reader) {
      const decoder = new TextDecoder()
      while (html.length < 100_000) {
        const { done, value } = await reader.read()
        if (done) break
        html += decoder.decode(value, { stream: true })
        if (html.includes('</head>')) break
      }
      reader.cancel()
    }

    const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title =
      extractOgTag(html, 'title') ||
      (titleTag ? decodeEntities(titleTag[1].trim()) : '') ||
      url
    const description =
      extractOgTag(html, 'description') || extractNameMeta(html, 'description')
    const image = resolveImageUrl(extractOgTag(html, 'image'), url)

    return NextResponse.json({ title, description, image, url })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return NextResponse.json({ error: '요청 시간이 초과되었습니다' }, { status: 504 })
    }
    return NextResponse.json({ error: '링크 정보를 가져올 수 없습니다' }, { status: 500 })
  }
}
