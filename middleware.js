import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import {NextResponse} from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res});

  const {data: {user}} = await supabase.auth.getUser();

  //logged in user gets redirected to the transactions page
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/transactions-list', req.url));
  }

  //no logged in user gets redirected to the login page
  if(!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/transactions-list']
}