import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
  if (isProtectedRoute(context.request)) {
    auth().protect();
  }
});
