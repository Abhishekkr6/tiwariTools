import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    // Hardcoded password for local CMS
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
    
    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set('admin_token', 'authenticated', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
      
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 })
  }
}
