import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: false,
        maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content for this post.'],
    },
    coverImage: {
        type: String,
        required: false,
    },
    coverImageAlt: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug.'],
        unique: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
