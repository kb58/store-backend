import { Request, Response } from "express";
import Order from "../models/order.model";
import { IOrder } from "../interfaces/order.interface";
import mongoose from "mongoose";

// 🟢 Create Order
export interface AuthenticatedRequest extends Request {
    userId?:mongoose.Types.ObjectId ;
    role?: string;
}
export const createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId; // Extract user ID from request (ensure auth middleware sets req.user)
        if (!userId) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }

        const orderData = {
            userId,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            status: req.body.status || "active",
            createdAt: req.body.createdAt,
        };

        const order = new Order(orderData);
        await order.save();

        res.status(201).json({ success: true, data: order });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔵 Get All Orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().populate("userId items.productId");

        res.status(200).json({ success: true, data: orders });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔍 Get Order By ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id).populate("userId items.productId");
        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        res.status(200).json({ success: true, data: order });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✏️ Update Order
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() }, // Auto-update updatedAt
            { new: true }
        );

        if (!updatedOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ❌ Delete Order
export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
