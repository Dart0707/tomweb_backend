import Database from 'better-sqlite3';
const db = new Database('blog.sqlite');

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    comment_id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
    post_id INTEGER NOT NULL,
    commenter_name TEXT NOT NULL,
    comment_body TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
  );
`);


//Create Post function
function createPost({ title, content, author_name }) {
  const info = db.prepare(`
    INSERT INTO posts (title, content, author_name)
    VALUES (?, ?, ?)
  `).run(title, content, author_name);

  const post_id = Number(info.lastInsertRowid);


  console.log(`Post created with ID: ${post_id}`);

  return {
    post_id,
    title,
    content,
    author_name
  };
}

//Get all posts function
function getAllPosts() {
  const posts = db.prepare(`
      SELECT post_id, title, content, author_name 
      FROM posts 
      ORDER BY post_id DESC
    `).all();

    const commentsStmt = db.prepare(`
      SELECT comment_id, commenter_name, comment_body 
      FROM comments 
      WHERE post_id = ?
    `);


    const formattedPosts = posts.map(post => ({
      ...post,
      comments: commentsStmt.all(post.post_id)
    }));

    return formattedPosts;
}

//Delete post by ID function
function removePostById(post_id) {
const info = db.prepare(`
    DELETE FROM posts WHERE post_id = ?
  `).run(post_id);

  return info.changes > 0;
}

export { createPost, getAllPosts, removePostById };