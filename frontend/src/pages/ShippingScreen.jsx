import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Back to Home
                </Link>
                <Link to="/cart" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Cart
                </Link>
            </div>

            <CheckoutSteps step1 step2 />

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Shipping Info</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Address</span></label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                className="input input-bordered"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">City</span></label>
                            <input
                                type="text"
                                placeholder="Enter city"
                                className="input input-bordered"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Postal Code</span></label>
                            <input
                                type="text"
                                placeholder="Enter postal code"
                                className="input input-bordered"
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Country</span></label>
                            <input
                                type="text"
                                placeholder="Enter country"
                                className="input input-bordered"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-4">
                            Continue to Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingScreen;
