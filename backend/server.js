import express from 'express'
import products from './data/products.js'
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './model/productModel.js';
import User from './model/userModel.js';
import mongoose from 'mongoose';
import productRoutes from "./routes/productRoutes.js"
import { notFound } from "./middleware/ErrorMiddleware.js"
import { errorHandler } from "./middleware/ErrorMiddleware.js"
import userRoute from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cookieParser from "cookie-parser"


const app = express()



connectDB();
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  console.log("Home")
  res.send('Home Page')
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})