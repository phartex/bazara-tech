import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const secret = new TextEncoder().encode(JWT_SECRET)

// Sign a token
export async function signToken(
  payload: { username: string },
  expiresIn: number,
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day') // 1 day
    .sign(secret)
}

// Verify a token
export async function verifyToken<T = any>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as T
  } catch (err) {
    console.error('JWT verification failed:', err)
    return null
  }
}
