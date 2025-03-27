import express from 'express';
import { createBlog, getAllBlogs, getBlogById,getBlogsByYear } from '../controllers/blog.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, createBlog);
router.get('/',verifyToken, getAllBlogs);
router.get('/find', getBlogsByYear);
router.get('/:id',verifyToken, getBlogById);

export default router;
