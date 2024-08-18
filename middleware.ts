import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
]);

const isPublicRoute = createRouteMatcher([
    '/sign-up',
    '/sign-in',
    '/'
]);

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();

    if (userId && isPublicRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    };

    if (!userId && isProtectedRoute(req)) {
        return NextResponse.redirect(new URL('/', req.url));
    };

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};