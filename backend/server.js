import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import addToCart from './routes/atcRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookiParser from 'cookie-parser'
import cors from 'cors'
import path from 'path';

process.on("uncaughtException", () => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down due to Uncaught exception.");
    process.exit(1);
});
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cookiParser())
app.use(express.json())
app.use(cors())
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', addToCart)
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
app.use(notFound);
app.use(errorHandler);
const server = app.listen(port, () => console.log(`Server started on port ${port}`))
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection.");
    server.close(() => {
        process.exit(1);
    });
});