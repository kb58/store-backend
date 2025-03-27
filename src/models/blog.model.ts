import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IBlog } from "../interfaces/blog.interface";

const BlogSchema: Schema = new Schema(
    {
      title: { type: String, required: true },
      image: { type: String, required: true },
      type: { type: String, required: true },
      description: { type: String, required: true },
      publishedDate: { type: Date, default: Date.now },
      blogInfo: {
        carouselImage: { type: [String], required: true },
        postBy: { type: String, required: true }, // Auto-filled from JWT
        desc: { type: String, required: true },
      },
    },
    { timestamps: true }
  );
  
  const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
  export default Blog;