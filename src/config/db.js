import Database from 'better-sqlite3';
const db = new Database('tomweb.sqlite');

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
function getAllPosts(take, page, search) {
  const offset = (page - 1) * take;

  const posts = db.prepare(`
      SELECT post_id, title, content, author_name 
      FROM posts 
      WHERE title LIKE ? OR content LIKE ?
      ORDER BY post_id DESC
      LIMIT ? OFFSET ?
    `).all(search, search, take, offset);

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

//Display post using an ID function
function displayPostUsingId(post_id) {
  const post = db.prepare(`
    SELECT post_id, title, content, author_name 
    FROM posts 
    WHERE post_id = ?
  `).get(post_id);

  const commentsStmt = db.prepare(`
      SELECT comment_id, commenter_name, comment_body 
      FROM comments 
      WHERE post_id = ?
    `);
  const comments = commentsStmt.all(post_id);
  if (!post) {
    return null;
  }
  return { ...post, comments };
}

//Delete post by ID function
function removePostById(post_id) {
const info = db.prepare(`
    DELETE FROM posts WHERE post_id = ?
  `).run(post_id);

  return info.changes > 0;
}

//Modify post by ID function
function updatePostById(post_id, { title, content, author_name }) {
  const info = db.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, author_name = ? 
    WHERE post_id = ?
  `).run(title, content, author_name, post_id);
  if (info.changes > 0) {
    return {
    post_id,
    title,
    content,
    author_name
    };
  }
  return null;
}

//Add comment to a post function
function addCommentToPost(post_id, { commenter_name, comment_body }) {

  try {
    const info = db.prepare(`
      INSERT INTO comments (post_id, commenter_name, comment_body)
      VALUES (?, ?, ?)
    `).run(post_id, commenter_name, comment_body);

    return {post_id,
      comment: {
      comment_id: db.prepare('SELECT comment_id FROM comments WHERE rowid = ?').get(info.lastInsertRowid).comment_id,
      commenter_name,
      comment_body
        }
      };
  } catch (error) {
    return {post_id:null,
            comment: null
    };
  }
}

//Update comment by ID function
function updateCommentById(comment_id, { commenter_name, comment_body }) {
  const info = db.prepare(`
    UPDATE comments
    SET commenter_name = ?, comment_body = ?
    WHERE comment_id = ?
  `).run(commenter_name, comment_body, comment_id);

  return info.changes > 0
    ? { comment_id, commenter_name, comment_body }
    : null;
}

//Delete comment by ID function
function deleteCommentUsingId(comment_id) {
  const info = db.prepare(`
    DELETE FROM comments WHERE comment_id = ?
  `).run(comment_id);

  return info.changes > 0 ? { success: true } : { success: false };
}

export { createPost, getAllPosts, removePostById, updatePostById, addCommentToPost, updateCommentById, deleteCommentUsingId, displayPostUsingId };

export function disconnectDB() {
  db.close();
}