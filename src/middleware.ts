import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || 'direct'
  const timestamp = new Date().toISOString()

  // Only log page visits, not assets
  if (!request.nextUrl.pathname.startsWith('/_next') &&
      !request.nextUrl.pathname.startsWith('/api') &&
      !request.nextUrl.pathname.includes('.')) {

    console.log(`🔍 [${timestamp}] ${request.method} ${request.nextUrl.pathname}`)
    console.log(`   IP: ${ip}`)
    console.log(`   User-Agent: ${userAgent}`)
    console.log(`   Referer: ${referer}`)
    console.log(`   ---`)
  }

  return NextResponse.next()
}

// Optionally specify which paths to run middleware on
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}