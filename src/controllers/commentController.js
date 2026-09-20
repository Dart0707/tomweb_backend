import express from 'express';

const createComments = async(req, res) => {
  const { post_id, commenter_name, comment_body } = req.body;
  res.status(201).json({ post_id: `${post_id}`, 
    comment: `${comment_body}` });
}

const modifyCommentById = async(req, res) => {
  const { id } = req.params;
  const { commenter_name, comment_body } = req.body;
  res.status(200).json({ comment: `${comment_body}` });
}

const deleteCommentById = async(req, res) => {
  const { id } = req.params;
  res.status(200).json({ success: true });
}

export { createComments, modifyCommentById, deleteCommentById };
