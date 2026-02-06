import BlogForm from '@/components/Dashboard/BlogForm';
import { getPostData } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }) {
    const { slug } = await params;
    // We need to fetch the post data to populate the form
    const post = await getPostData(slug);

    // Transform post data to match BlogForm expectation if necessary
    // Assuming getPostData returns the document
    const initialData = post ? {
        ...post,
        id: post._id.toString(), // Ensure ID is string
        tags: post.tags || [],
    } : {};

    return <BlogForm initialData={initialData} />;
}
