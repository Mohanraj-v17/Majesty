import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import { notFound, errorHandler } from './middleware/ErrorMiddleware.js';

console.log('Majesty Backend: Initializing...');


const app = express()



connectDB();
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://majesty-beta.vercel.app",
    "https://majesty-rose.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

app.get('/', (req, res) => {
  console.log("Home")
  res.send('Home Page')
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;