import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export async function createToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET))

  return token
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload as { userId: string }
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  cookies().set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function removeAuthCookie(): Promise<void> {
  cookies().delete("auth_token")
}

export async function getAuthUser(request?: NextRequest): Promise<{ id: string; name: string; email: string } | null> {
  const token = request ? request.cookies.get("auth_token")?.value : cookies().get("auth_token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true, turma: true, curso: true, semestre: true, turno: true, unidade: true },
  })

  return user
}

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const user = await getAuthUser(request)

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return null
}

export async function getCurrentUser(): Promise<{ id: string; name: string; email: string } | null> {
  const token = cookies().get("auth_token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true },
  })

  return user
}

export function generateToken(userId: string): string {
  return createToken(userId)
}
