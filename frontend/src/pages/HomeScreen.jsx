import React from 'react'
import Product from '../components/Products.jsx'
// import products from "../../product.js"
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useGetProductsQuery } from '../slices/productSlice.js'

const HomeScreen = () => {


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get('http://localhost:5000/api/products');
  //     setProduct(data);
  //   }
  
  //   fetchProducts();
  // },[]);
 const { data:products, error, isLoading} = useGetProductsQuery();

 if(isLoading) return <p>Loading...</p>
if(error) return <p>{error.message}</p>
  return (
    <div>
         <h1 className='text-5xl my-10'>All Products</h1>

     <div className='w-full overflow-hidden rounded-xl bg-base-100 shadow'>
       <figure className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            products.map((product)=>(
              <Product key={product._id} product={product}/>
            ))}
       </figure>
     </div>
    </div>
  )
}

export default HomeScreen