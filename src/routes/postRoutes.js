import express from 'express';
import {displayAllPosts, createNewPost, displayPostById, modifyPostById, deletePostById} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", displayAllPosts);
router.post("/", authMiddleware, createNewPost);
router.get("/:id", displayPostById);
router.patch("/:id", authMiddleware, modifyPostById);
router.delete("/:id", authMiddleware, deletePostById);

export default router;