import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function getAllPosts() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 }).lean();
    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      id: post._id.toString(), // Ensure 'id' exists for frontend usage
      date: post.date.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostData(slug) {
  try {
    await dbConnect();
    // Try finding by slug first
    let post = await Post.findOne({ slug }).lean();

    // If not found, try by ID (backward compatibility or direct ID usage)
    if (!post) {
      try {
        post = await Post.findById(slug).lean();
      } catch (e) {
        // Not a valid ObjectId, ignore
      }
    }

    if (!post) return null;

    return {
      ...post,
      _id: post._id.toString(),
      date: post.date.toISOString(),
      id: post.slug // Maintain 'id' field as slug for compatibility if needed
    };
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
}

export async function savePost(data) {
  try {
    await dbConnect();

    // Generate valid base slug
    let slug = data.slug;
    if (!slug && data.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    if (!slug) slug = new Date().getTime().toString();

    const postData = {
      ...data,
      slug
    };

    // Determine query
    // Determine query
    let query = {};
    // Check if data.id is a valid MongoDB ObjectId (24 hex characters)
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    if (data.id && isValidObjectId(data.id)) {
      query = { _id: data.id };
    } else {
      query = { slug: slug };
    }

    try {
      const post = await Post.findOneAndUpdate(
        query,
        postData,
        { new: true, upsert: true, runValidators: true }
      );
      return {
        ...post.toObject(),
        _id: post._id.toString()
      };
    } catch (saveError) {
      // Handle Duplicate Key Error (Code 11000)
      if (saveError.code === 11000) {
        // If slug collision, append timestamp to make it unique and retry
        postData.slug = `${slug}-${Date.now()}`;
        const post = await Post.create(postData); // fallback to create new if update failed on unique key? 
        // Actually, findOneAndUpdate with upsert=true trying to insert a distinct doc with same unique field?
        // Or update finding a doc but trying to set a slug that conflicts with *another* doc?

        // Simplest mitigation for user:
        return await savePost(postData);
      }
      throw saveError;
    }
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
}

export async function deletePost(slug) {
  try {
    await dbConnect();

    // Check if slug is actually an ID
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    if (isValidObjectId(slug)) {
      await Post.findByIdAndDelete(slug);
    } else {
      await Post.findOneAndDelete({ slug });
    }

    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}
