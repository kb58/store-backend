
import { Request, Response } from 'express';
import Stock from '../models/stock.model'

export const getInventorySummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalStock = await Stock.countDocuments();
        const lowStock = await Stock.countDocuments({ quantity: { $lt: 10 } });
        const outOfStock = await Stock.countDocuments({ quantity: 0 });
        const highDemandOrders = await Stock.countDocuments({ quantity: { $gt: 100 } });

        res.status(200).json({ totalStock, lowStock, outOfStock, highDemandOrders });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving inventory summary', error });
    }
};
