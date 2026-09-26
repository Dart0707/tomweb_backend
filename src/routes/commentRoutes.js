import express from 'express';
import { createComments, modifyCommentById, deleteCommentById} from '../controllers/commentController.js';
import { authMiddlewareUsingAPIToken, authMiddlewareUsingSession } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/", authMiddlewareUsingAPIToken, createComments);
router.patch("/:id", authMiddlewareUsingAPIToken, modifyCommentById);
router.delete("/:id", authMiddlewareUsingAPIToken, deleteCommentById);

export default router;