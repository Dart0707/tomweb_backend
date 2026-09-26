import express from 'express';
import {displayAllPosts, createNewPost, displayPostById, modifyPostById, deletePostById} from '../controllers/postController.js';
import { authMiddlewareUsingAPIToken, authMiddlewareUsingSession } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", displayAllPosts);
router.post("/", authMiddlewareUsingAPIToken, createNewPost);
router.get("/:id", displayPostById);
router.patch("/:id", authMiddlewareUsingAPIToken, modifyPostById);
router.delete("/:id", authMiddlewareUsingAPIToken, deletePostById);

export default router;