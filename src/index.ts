import express from 'express';
import cors from 'cors';
import MenuRoute from './routes/menuRoutes';
import UserRoute from './routes/userRoutes';
import order from './routes/orderRoutes'
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = 4000;
const app = express();
app.use(cors());

app.use('/produk', MenuRoute);
app.use('/user', UserRoute);
app.use('/order', order)

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
