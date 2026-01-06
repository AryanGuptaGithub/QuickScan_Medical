// middleware.ts (ROOT)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if (pathname.startsWith('/admin')) {
  //   const sessionToken =
  //     request.cookies.get('next-auth.session-token') ||
  //     request.cookies.get('__Secure-next-auth.session-token');

  //   // No session → redirect to login
  //   if (!sessionToken) {
  //     const url = new URL('/auth/login', request.url);
  //     url.searchParams.set('callbackUrl', pathname);
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
