import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'


const Products = ({product}) => {
  return (
   <Link to={`product/${product._id}`}>
    <div className="card bg-base-100 w-100 shadow-xl">
  <figure>
    <img
      src={product.image}
      alt={product.name}
      className='h-[500px] object-cover w-full' />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{product.name}</h2>
    <p className='line-clamp-2 my-3'>{product.description}</p>

    <div>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
    </div>

    <div className="card-actions badge badge-primary my-2">
        {product.price}
    </div>
  </div>
</div></Link>
  )
}

export default Products