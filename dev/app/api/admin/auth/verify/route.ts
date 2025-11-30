import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get(
    process.env.ADMIN_COOKIE_NAME || 'payload-token',
  )

  if (!authCookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true }, { status: 200 })
}
