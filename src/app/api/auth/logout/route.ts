import { delay } from '@/lib/helpers'
import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

export async function POST() {
  // Mock 500ms delay
  await delay(500)
  // Reset Credentials
  const serialized = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  })

  return NextResponse.json(
    { message: 'Success' },
    {
      status: 200,
      headers: {
        'Set-Cookie': serialized,
      },
    },
  )
}
