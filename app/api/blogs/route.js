import { NextResponse } from 'next/server';
import { getAllPosts, savePost } from '@/lib/blog';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(request) {
    try {
        const data = await request.json();
        const newPost = await savePost(data);
        revalidatePath('/');
        revalidatePath('/blog');
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
