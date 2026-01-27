import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        // Secure credentials (in a real app, use .env, but user asked for simplicity/hardcoded if needed)
        // We will stick to the previous default: admin / admin123
        // But we should try to read from env first.

        const validUsername = process.env.ADMIN_USERNAME ;
        const validPassword = process.env.ADMIN_PASSWORD ;

        if (username === validUsername && password === validPassword) {
            // Create a response
            const response = NextResponse.json({ success: true });

            // Set a cookie
            response.cookies.set('auth_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('auth_token');
    return response;
}
