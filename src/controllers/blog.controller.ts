import { Request, Response } from 'express';
import Blog from '../models/blog.model';
import { AuthenticatedRequest } from '../interfaces/authenticateRequest.interface';

export const createBlog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.userName) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { title, image, type, description, blogInfo } = req.body;

        if (!blogInfo.carouselImage || !Array.isArray(blogInfo.carouselImage)) {
            res.status(400).json({ message: 'carouselImage must be an array of images' });
            return;
        }

        const newBlog = new Blog({
            title,
            image,
            type,
            description,
            publishedDate: new Date(),
            blogInfo: {
                carouselImage: blogInfo.carouselImage, // Now an array of images
                postBy: req.userName, // Set from JWT token
                desc: blogInfo.desc,
            },
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs = await Blog.find().sort({ publishedDate: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getBlogsByYear = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year } = req.query; 

        if (!year || isNaN(Number(year))) {
            res.status(400).json({ message: "Invalid or missing year parameter" });
            return;
        }

        const blogs = await Blog.find({
            publishedDate: {
                $gte: new Date(`${year}-01-01T00:00:00Z`),
                $lt: new Date(`${Number(year) + 1}-01-01T00:00:00Z`),
            },
        }).sort({ publishedDate: -1 });

        res.status(200).json({ year, blogs });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
