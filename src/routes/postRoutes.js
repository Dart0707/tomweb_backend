import express from 'express';
import {displayAllPosts, createNewPost, displayPostById, modifyPostById, deletePostById} from '../controllers/postController.js';

const router = express.Router();

router.get("/", displayAllPosts);
router.post("/", createNewPost);
router.get("/:id", displayPostById);
router.patch("/:id", modifyPostById);
router.delete("/:id", deletePostById);

export default router;