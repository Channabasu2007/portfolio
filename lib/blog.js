import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';

const postsDirectory = path.join(process.cwd(), 'data/posts');

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".json" from file name to get id
    const id = fileName.replace(/\.json$/, '');

    // Read file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse JSON
    const postData = JSON.parse(fileContents);

    return {
      id,
      ...postData,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.json`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const postData = JSON.parse(fileContents);

  return {
    id,
    ...postData,
  };
}

export function savePost(data) {
    const id = data.id || uuidv4();
    const date = data.date || new Date().toISOString();
    
    // Create a slug from title if not provided
    let slug = data.slug;
    if (!slug && data.title) {
        slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    // If slug is still empty or duplicate handling is needed (not implemented for simplicity), use id
    if (!slug) slug = id;


    const postData = {
        ...data,
        id,
        date,
        slug
    };

    // Use slug as filename for cleaner URLs if preferred, but ID is safer for uniqueness. 
    // Let's use ID for filename, but expose slug in data.
    const fullPath = path.join(postsDirectory, `${id}.json`);
    
    fs.writeFileSync(fullPath, JSON.stringify(postData, null, 2));
    
    return postData;
}

export function deletePost(id) {
    const fullPath = path.join(postsDirectory, `${id}.json`);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        return true;
    }
    return false;
}
