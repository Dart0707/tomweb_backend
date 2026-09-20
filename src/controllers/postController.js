import express from 'express';
import { createPost, getAllPosts, removePostById, updatePostById, displayPostUsingId } from '../config/db.js';


//Display all posts including the comments within the post
const displayAllPosts = async (req, res) => {
  try {
    const formattedPosts = getAllPosts();

    return res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Display specific post by ID including the comments within the post
const displayPostById = async(req, res) => {
  const { id } = req.params;
  const post = displayPostUsingId(id);
  res.status(200).json({ post });
}

//Create a post
const createNewPost = async (req, res) => {

  const { title, content, author_name } = req.body;
  if (!title || !content || !author_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newPost = createPost({
    title,
    content,
    author_name
  });

  return res.status(201).json({ post: newPost });
};

//Modify post by ID
const modifyPostById = async(req, res) => {
  const { id } = req.params;

  const { title, content, author_name } = req.body;
  if (!title || !content || !author_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const updatedPost = updatePostById(id, {
    title,
    content,
    author_name
  });
  if (updatedPost) {
    return res.status(200).json({ post: updatedPost });
  } else {
    return res.status(404).json({ error: updatedPost });
  }
};

//Delete post by ID
const deletePostById = async(req,res) => {
  const { id } = req.params;
    const status = removePostById(id);
    res.status(200).json({ success: `${status}` });
};

export { displayAllPosts, createNewPost, displayPostById, modifyPostById, deletePostById };