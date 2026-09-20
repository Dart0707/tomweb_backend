import express from 'express';
import { createComments, modifyCommentById, deleteCommentById} from '../controllers/commentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/", authMiddleware, createComments);
router.patch("/:id", authMiddleware, modifyCommentById);
router.delete("/:id", authMiddleware, deleteCommentById);

export default router;