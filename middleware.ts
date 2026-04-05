import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we are visiting an admin route
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')
    
    if (token?.value !== 'authenticated') {
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
    }
  }
}

export const config = {
  matcher: '/admin/:path*',
}
