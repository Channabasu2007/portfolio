import BlogForm from '@/components/Dashboard/BlogForm';
import { getPostData } from '@/lib/blog';

// In Next.js App Router, dynamic pages receive params as a prop.
// However, getting data for a client component (BlogForm) usually happens server-side here.
// But fs (lib/blog) works here!

export default async function EditBlogPage({ params }) {
    const { slug } = await params;
    // slug here is actually the ID or filename based on how we routed,
    // but in our API routes we used slug as ID. Let's see.
    // The route is /dashboard/edit/[slug]. 
    // In lib/blog.js -> getPostData(id) looks for {id}.json.

    const post = getPostData(slug);

    if (!post) {
        return <div>Post not found</div>;
    }

    return <BlogForm initialData={post} />;
}
