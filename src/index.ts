import express, { Request, Response } from 'express';
import userRouter from "./routes/user.routes"
import taskRouter from "./routes/task.routes"
import inventoryRoutes from "./routes/inventory.routes"
import stockRoutes from "./routes/stock.routes"
import dashboardRoutes from "./routes/dashboard.routes"
import orderStatsRoutes from "./routes/orderStats.routes"
import orderRoutes from "./routes/order.routes"
import connectDB from "./lib/connectDB"

const app = express();
const port = 8080;


app.use(express.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.use('/api/v1/stocks', stockRoutes);
app.use('/api/v1', inventoryRoutes);
app.use("/api/v1/orders", orderStatsRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);


connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
