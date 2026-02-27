import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Middleware imports
import { notFound, errorHandler } from './middleware/ErrorMiddleware.js';

console.log('Loading Majesty Backend...');


const app = express()



connectDB();
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: true,
  credentials: true
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


if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export default app;