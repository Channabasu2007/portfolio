const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Define Post Schema (Simplified for migration)
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    coverImage: String,
    coverImageAlt: String,
    tags: [String],
    slug: { type: String, unique: true },
    featured: Boolean,
    date: Date,
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function migrate() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        const postsDir = path.join(process.cwd(), 'data', 'posts');
        if (!fs.existsSync(postsDir)) {
            console.log('📂 No data/posts directory found. Skipping migration.');
            process.exit(0);
        }

        const files = fs.readdirSync(postsDir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        console.log(`📦 Found ${jsonFiles.length} JSON posts to migrate.`);

        for (const file of jsonFiles) {
            const filePath = path.join(postsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const postData = JSON.parse(fileContent);

            // Ensure slug exists
            if (!postData.slug) {
                postData.slug = postData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)+/g, '');
            }

            // Upsert: Update if slug exists, Insert if not
            await Post.findOneAndUpdate(
                { slug: postData.slug },
                postData,
                { upsert: true, new: true }
            );
            console.log(`↦ Migrated: ${postData.title} (${postData.slug})`);
        }

        console.log('✨ Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrate();
