import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    if (cookieStore.get('admin_token')?.value !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure dir exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Clean file name
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
    const filename = `${timestamp}-${safeName}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, buffer)

    // Public URL
    const publicUrl = `/uploads/${filename}`

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
