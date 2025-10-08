import { SignJWT, jwtVerify } from 'jose';

// define payload structure
export interface JwtPayload {
  username: string;
  [key: string]: string | number | boolean | null | undefined;
}

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// function to sign JWT
export async function signToken(payload: JwtPayload, expiresInSeconds?: number): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresInSeconds ? `${expiresInSeconds}s` : '1h')
    .sign(SECRET_KEY);

  return token;
}

// function to verify JWT
export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as JwtPayload;
  } catch {
    throw new Error('Invalid or expired token');
  }
}
