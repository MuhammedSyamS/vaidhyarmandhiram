import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;
  
  const isKeystaticRoute = url.pathname.startsWith('/keystatic');
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isLoginRoute = url.pathname === '/admin/login';
  const isLogoutRoute = url.pathname === '/admin/logout';
  const isApiRoute = url.pathname.startsWith('/api/keystatic');

  // If user accesses /admin or /admin/ and is logged in, redirect them to /keystatic
  if ((url.pathname === '/admin' || url.pathname === '/admin/') && cookies.get('vaidhyar_admin_session')?.value === 'authenticated') {
    return redirect('/keystatic');
  }

  // Protect /keystatic and /admin routes from unauthenticated access
  if ((isKeystaticRoute || isAdminRoute) && !isApiRoute && !isLoginRoute && !isLogoutRoute) {
    const session = cookies.get('vaidhyar_admin_session')?.value;
    if (session !== 'authenticated') {
      return redirect('/admin/login');
    }
  }

  return next();
});
