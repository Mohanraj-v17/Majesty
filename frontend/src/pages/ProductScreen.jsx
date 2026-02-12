import React from 'react'

import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import {useState } from 'react'

import { useGetProductsDetailsQuery } from '../slices/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../slices/cartSlice'





const ProductDetails = () => {

  const {id : productId} = useParams();
  const [qty, setQty] = useState(1);

 const dispatch = useDispatch();

 const { data:product, error, isLoading} = useGetProductsDetailsQuery(productId);
 
 const addToCartHandler = () =>{
     dispatch(addToCart({...product,qty}))
 }

  if(isLoading) return <p>Loading...</p>
 if(error) return <p>{error.message}</p>

  return (
   <div className="px-4 md:px-10">
  <Link to="/">
    <button className="btn btn-neutral mb-6">Go back</button>
  </Link>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
    
  
    <div className="w-full flex justify-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg object-contain"
      />
    </div>


    <div className="card bg-base-100 shadow-md">
      <div className="card-body space-y-3">

        
        <h2 className="card-title text-xl sm:text-2xl lg:text-3xl">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm sm:text-base">
          {product.description}
        </p>

        <p className="text-lg font-semibold">
          $ {product.price}
        </p>

        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />

        <p
          className={
            product.countInStock > 0
              ? "text-success font-medium"
              : "text-error font-medium"
          }
        >
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>


        {product.countInStock > 0 && (
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quantity</h3>
            <select className="select select-primary w-full max-w-xs mt-1 rounded-full" onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(product.countInStock).keys()].map((item) => (
                <option key={item + 1}>{item + 1}</option>
              ))}
            </select>
          </div>
        )}

        <div className="card-actions mt-4">
          <button
          onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="btn btn-primary w-full max-w-xs rounded-full"
          >
            Add to cart
          </button>
        </div>

      </div>
    </div>

  </div>
</div>

  )
}

export default ProductDetails