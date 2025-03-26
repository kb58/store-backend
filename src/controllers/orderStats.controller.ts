import { Request, Response } from "express";
import Order from "../models/order.model";
import mongoose from "mongoose";

const getOrdersByTimeRange = async (req: Request, res: Response, timeRange: string) => {
    try {
        const { startDate, endDate } = getDateRange(timeRange);

        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    activeOrders: {
                        $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
                    },
                    inactiveOrders: {
                        $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.status(200).json({ data: orders });
    } catch (error) {
        console.error(`Error fetching ${timeRange} orders:`, error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 📌 Helper function to get start and end dates
const getDateRange = (timeRange: string) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    if (timeRange === "lastWeek") {
        startDate.setDate(today.getDate() - 7);
    } else if (timeRange === "lastMonth") {
        startDate.setMonth(today.getMonth() - 1);
    } else if (timeRange === "lastYear") {
        startDate.setFullYear(today.getFullYear() - 1);
    }

    return { startDate, endDate };
};

// API Handlers
export const getLastWeekOrders = (req: Request, res: Response) =>
    getOrdersByTimeRange(req, res, "lastWeek");

export const getLastMonthOrders = (req: Request, res: Response) =>
    getOrdersByTimeRange(req, res, "lastMonth");

export const getLastYearOrders = (req: Request, res: Response) =>
    getOrdersByTimeRange(req, res, "lastYear");
