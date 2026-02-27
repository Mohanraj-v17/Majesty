import express from "express";
// import products from "../data/products.js";
import Product from "../model/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import  {getProduct, getProductById} from "../controllers/productController.js"

  

const routes = express.Router();

routes.route('/'). get(getProduct) 
routes.route('/:id', ). get(getProductById)


export default routes