import { NextResponse } from 'next/server';
import { getPostData, savePost, deletePost } from '@/lib/blog';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    const { slug } = await params;
    // Note: in our file system implementation, we are using ID as filename but user might ask by slug.
    // For simplicity in this iteration, we will assume the API is called with ID for editing, 
    // BUT for public view we might need slug lookup.
    // Let's implement slug lookup in getAllPosts if needed, but for now let's assume 'slug' param here is actually 'id' for dashboard operations.
    // For public pages, we can filter getAllPosts() by slug.

    let post = await getPostData(slug); // Treat 'slug' param as ID for direct file access

    if (!post) {
        // If not found by ID, try to find by slug (for public API usage if we mix them)
        // This part is a fallback:
        const all = await getAllPosts(); // Import if needed, but for now let's stick to ID operations for dashboard
        const found = all.find(p => p.slug === slug);
        if (found) return NextResponse.json(found);

        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(request, { params }) {
    try {
        const { slug } = await params; // This is the ID
        const data = await request.json();

        // Ensure we are updating the correct file
        const updatedPost = await savePost({ ...data, id: slug });
        revalidatePath('/');
        revalidatePath('/blog');
        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { slug } = await params; // This is the ID
    const success = await deletePost(slug);

    if (success) {
        revalidatePath('/');
        revalidatePath('/blog');
        return NextResponse.json({ message: 'Post deleted' });
    } else {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
}
