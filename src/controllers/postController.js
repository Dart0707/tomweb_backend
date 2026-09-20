import express from 'express';
import {authenticateApiKey} from '../middleware/authMiddleware.js';
import { createPost, getAllPosts, removePostById } from '../config/db.js';


//Display all posts including the comments within the post
const displayAllPosts = async (req, res) => {
  try {
    const formattedPosts = getAllPosts();

    return res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Create a post
const createNewPost = async (req, res) => {
  const apiToken = req.get('X-API-Token');
  if (!authenticateApiKey(apiToken)) {
    return res.status(401).json({ success: false });
  }

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

const displayPostById = async(req, res) => {
  const { id } = req.params;
  res.status(200).json({ post: `Post` });
};

const modifyPostById = async(req, res) => {
  const { id } = req.params;
  const {title, content, author_name} = req.body;
  res.status(200).json({ post: `Post` });
};

const deletePostById = async(req,res) => {
  const { id } = req.params;
    const status = removePostById(id);
    res.status(200).json({ success: `${status}` });
};

export { displayAllPosts, createNewPost, displayPostById, modifyPostById, deletePostById };