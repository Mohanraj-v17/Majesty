import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItem,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Back to Home
                </Link>
                <Link to="/payment" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Payment
                </Link>
            </div>

            <CheckoutSteps step1 step2 step3 step4 />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-2">Shipping Information</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-2">Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Order Items</h2>
                            {cart.cartItem.length === 0 ? (
                                <div className="alert alert-info">Your cart is empty</div>
                            ) : (
                                <div className="divide-y">
                                    {cart.cartItem.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 py-3">
                                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-base-200">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <Link to={`/product/${item._id}`} className="hover:link font-medium">
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="text-right font-bold">
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card bg-base-100 shadow-xl border-t-4 border-primary sticky top-4">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="opacity-60">Items</span>
                                    <span>${cart.itemPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">Shipping</span>
                                    <span>${cart.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">Tax</span>
                                    <span>${cart.taxPrice}</span>
                                </div>
                                <div className="divider my-1"></div>
                                <div className="flex justify-between text-xl font-black">
                                    <span>Total</span>
                                    <span className="text-primary">${cart.totalPrice}</span>
                                </div>
                            </div>

                            {error && <div className="alert alert-error mt-4 text-xs">{error?.data?.message || error.error}</div>}

                            <button
                                type="button"
                                className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                                disabled={cart.cartItem.length === 0}
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
