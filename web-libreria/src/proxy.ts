import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './lib/server';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/inventario', request.url));
  }

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};
