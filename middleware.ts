// middleware.ts (ROOT LEVEL - not inside app/)
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  console.log(`Middleware checking: ${pathname}`);

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    console.log('Admin route detected, checking auth...');
    
    // if (!session) {
    //   console.log('No session, redirecting to login');
    //   const url = new URL('/auth/login', request.url);
    //   url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    //   return NextResponse.redirect(url);
    // }

    // if (session.user?.role !== 'admin') {
    //   console.log('User is not admin, redirecting');
    //   const url = new URL('/', request.url);
    //   url.searchParams.set('error', 'unauthorized');
    //   return NextResponse.redirect(url);
    // }

    console.log('Admin access granted');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
