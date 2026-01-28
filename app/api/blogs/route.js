import { NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/blog';

export async function GET() {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(request) {
    try {
        const data = await request.json();
        const newPost = await savePost(data);
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
