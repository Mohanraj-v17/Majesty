import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart,removeFromCart } from '../slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";




const CartScreen = () => {


   const dispatch = useDispatch();
  const {cartItem} = useSelector((state) => state.cart)
  const navigate = useNavigate();
 

  const addToCartHandler = (item, qty) => {
   dispatch( addToCart({...item, qty}))
  }

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }

 

  return (
    <div className='container mx-auto px-4 mt-4'>
      <h1 className='text-4xl font-bold text-center mb-10'>My Cart</h1>

    {cartItem?.length === 0 ? (
      <div className='alert alert-warning shadow-lg'>
        <div>
          <span className='text-lg'>
            There is no items in cart
          </span>
        </div>
      </div>
    ): (
      <div className='grid md:grid-cols-2 gap-10 mt-10'>
        <div className='md:col-span-1 space-y-5'>
        {cartItem.map((item) => (
          <div className='grid grid-cols-3 gap-5 items-center' key={item._id}>
            <div className='col-span-1'>
              <Link>
              <img className='w-full h-[200px] object-cover rounded-md shadow-md'  src={item.image} alt="" />
              </Link>
            </div>
            <div className='col-span-2'>
              <div className='card bg-base-200 shadow-md'>
                <div className='card-body'>
                  <h2 className='card-title text-lg font-bold text-primary mb-2'>{item.name}</h2>
                  <p>Price: ${item.price}</p>

                  {item.countInStock > 0 && (
                    <div className='flex gap-2 items-center'>
                      <label htmlFor="Quantity">
                        Qty:
                      </label>
                      <select value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      className='select select-primary  max-w-xs mt-1 rounded-full'>
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )}

                  <button className='btn btn-error ml-auto btn-circle'><MdDelete color='white' size="20px" onClick={() => removeCartHandler(item._id)}/></button>
                </div>
                  
              </div>
            </div>
          </div>
          
        ))}
      </div>

        <div className='md:col-span-1'>
              <div className='card bg-base-200 shadow-md'>
                <div className='card-body'>
                  <h2 className='card-title text-2xl font-bold text-secondary mb-3'>
                     Subtotal :
                      {
                        cartItem.reduce((acc, item) => acc + item.qty,0)
                      }
                     
                  </h2>
                  <h2 className='card-title font-semibold text-xl mb-3'>
                    Total price:$
                    {cartItem.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </h2>
                  <button className='btn btn-success btn-block rounded-full' onClick={checkoutHandler}>Proceed to checkout</button>
                  </div>
                  </div>
                  </div>
      </div>

    
    )  
  
      
}
  </div>
)
}

export default CartScreen