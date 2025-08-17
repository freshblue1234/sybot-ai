import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(process.cwd(), 'public/uploads', file.name)

  // Make sure the uploads folder exists
  fs.mkdirSync(path.join(process.cwd(), 'public/uploads'), { recursive: true })

  // Save the file
  fs.writeFileSync(filePath, buffer)

  const fileUrl = `/uploads/${file.name}`
  return NextResponse.json({ fileUrl })
}
