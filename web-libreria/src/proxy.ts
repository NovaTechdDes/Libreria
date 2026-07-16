import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './helper/middleware';

export async function proxy(request: NextRequest) {
  const { ok } = await updateSession(request);
  

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute && !ok) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (ok && isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/inventario', request.url));
  }

  return NextResponse.next();
}

export const config = {};
