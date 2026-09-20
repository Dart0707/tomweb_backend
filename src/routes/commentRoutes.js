import express from 'express';
import { createComments, modifyCommentById, deleteCommentById} from '../controllers/commentController.js';
const router = express.Router();

router.post("/", createComments);
router.patch("/:id", modifyCommentById);
router.delete("/:id", deleteCommentById);

export default router;