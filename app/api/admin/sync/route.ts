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

    const { type, data } = await request.json()
    // type must be 'products', 'categories', or 'content'

    if (!['products', 'categories', 'content'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'data', `${type}.json`)
    
    // Write data to json
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save error', error)
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type || !['products', 'categories', 'content'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'data', `${type}.json`)
    
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8')
      return NextResponse.json({ success: true, data: JSON.parse(fileData) })
    }
    
    return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read' }, { status: 500 })
  }
}
