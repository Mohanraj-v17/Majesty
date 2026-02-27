import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

    return isLoading ? (
        <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>
    ) : error ? (
        <div className="alert alert-error max-w-4xl mx-auto mt-8">{error?.data?.message || error.error}</div>
    ) : (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1-1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Back to Home
                </Link>
                <span className="badge badge-outline gap-2 py-3 px-4">
                    Order ID: <span className="font-mono text-primary">{order._id}</span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="card bg-base-100 shadow-xl overflow-hidden">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Shipping Details</h2>
                            <div className="space-y-2">
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="link link-primary">{order.user.email}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <div className="alert alert-success mt-4">Delivered on {order.deliveredAt}</div>
                                ) : (
                                    <div className="alert alert-warning mt-4 text-sm py-3 font-semibold">Not Delivered</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Payment Status</h2>
                            <p><strong>Method: </strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <div className="alert alert-success mt-4">Paid on {order.paidAt}</div>
                            ) : (
                                <div className="alert alert-warning mt-4 text-sm py-3 font-semibold">Payment Pending (COD or Verification Required)</div>
                            )}
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Order Items</h2>
                            <div className="divide-y">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4">
                                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-base-200">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <Link to={`/product/${item.product}`} className="hover:link font-semibold">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-right font-mono font-bold">
                                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card bg-base-100 shadow-xl border-t-4 border-success sticky top-4">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4 text-success">Bill Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="opacity-60">Items Total</span>
                                    <span>${order.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">Shipping Fee</span>
                                    <span>${order.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">Estimated Tax</span>
                                    <span>${order.taxPrice}</span>
                                </div>
                                <div className="divider my-1"></div>
                                <div className="flex justify-between text-2xl font-black">
                                    <span>Grand Total</span>
                                    <span className="text-success">${order.totalPrice}</span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-success/10 rounded-xl text-center border border-success/20">
                                <div className="text-success font-bold text-lg mb-1">Order Confirmed!</div>
                                <div className="text-xs opacity-70">Thank you for shopping with Majesty. Your order is being processed.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
