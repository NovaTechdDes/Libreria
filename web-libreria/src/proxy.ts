import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './helper/middleware';

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/inventario', request.url));
  }

  return supabaseResponse;
}

export const config = {};
