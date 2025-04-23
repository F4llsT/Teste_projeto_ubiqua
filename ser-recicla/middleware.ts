import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuthUser } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/cadastro", "/sobre-reciclagem", "/api-docs"]

  const isPublicPath = publicPaths.some(
    (path) =>
      request.nextUrl.pathname === path ||
      request.nextUrl.pathname.startsWith("/api/") ||
      request.nextUrl.pathname.includes("."),
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const user = await getAuthUser(request)

  // If not authenticated, redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
