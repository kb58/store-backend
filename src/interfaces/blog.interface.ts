import { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    image: string;
    type: string;
    description: string;
    publishedDate: Date;
    blogInfo: {
      carouselImage: [String];
      postBy: string;  
      desc: string;
    };
  }