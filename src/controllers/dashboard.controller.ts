import { Request, Response } from "express";
import Order from "../models/order.model";

export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    // 🟢 Count total orders
    const totalOrders = await Order.countDocuments();

    // 💰 Aggregate total sales from `totalAmount`
    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;

    // 👥 Count unique customers using `userId`
    const totalCustomers = await Order.distinct("userId");

    // 📊 Profit/Loss (Assuming totalSales represents revenue; can be adjusted)
    const totalProfitLoss = totalSales; // Modify if you have cost calculations

    res.status(200).json({
      totalOrders,
      totalSales,
      totalCustomers: totalCustomers.length,
      totalProfitLoss
    });
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
