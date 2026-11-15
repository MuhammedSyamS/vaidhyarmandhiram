import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;
  
  // Permanently redirect any legacy Keystatic route to /admin
  if (url.pathname.startsWith('/keystatic')) {
    return redirect('/admin', 301);
  }

  const isAdminRoute = url.pathname.startsWith('/admin');
  const isLoginRoute = url.pathname === '/admin/login';
  const isLogoutRoute = url.pathname === '/admin/logout';

  // Protect /admin routes from unauthenticated access
  if (isAdminRoute && !isLoginRoute && !isLogoutRoute) {
    const session = cookies.get('vaidhyar_admin_session')?.value;
    if (session !== 'authenticated') {
      return redirect('/admin/login');
    }
  }

  // If already logged in and visiting login page, send to /admin
  if (isLoginRoute && cookies.get('vaidhyar_admin_session')?.value === 'authenticated') {
    return redirect('/admin');
  }

  return next();
});
