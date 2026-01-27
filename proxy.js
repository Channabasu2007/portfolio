import { NextResponse } from 'next/server';

export function proxy(request) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtected = path.startsWith('/dashboard');

    if (isProtected) {
        // Check for auth_token cookie
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
