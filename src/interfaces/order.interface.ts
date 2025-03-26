import { Document } from "mongoose";
import mongoose from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}