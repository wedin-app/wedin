import {
    adminRoutes,
    apiAuthPrefix,
    authRoutes,
    onboardingRoute,
    protectedRoutes,
    publicRoutes,
  } from '@/lib/routes';
  import { auth } from './lib/auth';
  
  export default auth(req => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isOnboarded = isLoggedIn ? req.auth?.user.isOnboarded : false;
    const isAdmin = isLoggedIn ? req.auth?.user.role === 'ADMIN' : false;
    const isExistingUser = isLoggedIn ? req.auth?.user.isExistingUser : false;
  
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isOnboardingRoute = onboardingRoute.includes(nextUrl.pathname);
  
    if (isApiAuthRoute) {
      return;
    }
  
    if (!isAdmin && isAdminRoute) {
      console.log('redirecting to dashboard');
    }
  
    if (isLoggedIn && !isExistingUser) {
      return Response.redirect(new URL('/api/auth/signout', nextUrl));
    }
  
    if (isLoggedIn && !isOnboarded && !isOnboardingRoute) {
      return Response.redirect(new URL('/onboarding', nextUrl));
    }
  
    if (isLoggedIn && isOnboarded && (isAuthRoute || isOnboardingRoute)) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
  
    if (!isLoggedIn && (isProtectedRoute || isOnboardingRoute)) {
      return Response.redirect(new URL('/login', nextUrl));
    }
  });
  
  export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };