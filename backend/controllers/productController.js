import Product from "../model/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";




export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


export const getProductById =  asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
 if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

