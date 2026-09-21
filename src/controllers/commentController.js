import { addCommentToPost, updateCommentById, deleteCommentUsingId} from '../config/db.js';

const isValidCommentId = (value) => typeof value === 'string' && /^[a-f0-9]{32}$/i.test(value);

//Create comment to a post
const createComments = async(req, res) => {
  const { post_id, commenter_name, comment_body } = req.body;
  const comment = await addCommentToPost(post_id, { commenter_name, comment_body });
  if (!comment) {
    return res.status(404).json({ comment: null });
  }
  res.status(201).json(comment);
}

// Update comment by ID
const modifyCommentById = async(req, res) => {

  const { id } = req.params;
  const { commenter_name, comment_body } = req.body;
  if (!commenter_name || !comment_body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedComment = updateCommentById(id, { commenter_name, comment_body });
  if (!updatedComment) {
    return res.status(404).json({ comment: null });
  }

  return res.status(200).json({ comment: updatedComment });
}
// Delete comment by ID
const deleteCommentById = async(req, res) => {
  const { id } = req.params;
  const result = await deleteCommentUsingId(id);
  if (!result.success) {
    return res.status(404).json({ success: false });
  }
  res.status(200).json(result);
}

export { createComments, modifyCommentById, deleteCommentById };
