import { COOKIE_MAX_AGE } from '@/lib/constants'
import { delay } from '@/lib/helpers'
import { signToken } from '@/lib/jwt'
import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body
  console.log('Login attempt for user:', body); 

  // Mock 500ms delay
  await delay(500)

  // Fail if credentials are invalid
  if (username?.trim() !== 'admin@example.com' || password !== 'Password1!') {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    )
  }

  // Valid credentials
  const token = await signToken({ username })

  const serialized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  // Build the full response data
  const responseData = {
    data: {
      accessToken: token,
      tokenType: 'bearer',
      user: {
        firstName: 'Daniel',
        lastName: 'Joseph',
        email: 'daniel.joseph@accessbankplc.com',
        dateCreated: new Date().toISOString(), // today's date in ISO format
      },
    },
    status: 'success',
  }

  // Return JSON with cookie header
  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Set-Cookie': serialized,
    },
  })
}
