import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('Online Payment');
    const [showScanner, setShowScanner] = useState(false);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));

        if (paymentMethod === 'Online Payment') {
            setShowScanner(true);
        } else {
            navigate('/placeorder');
        }
    };

    const handleScanSimulation = () => {
        // Simulate user scanning and going to order page
        navigate('/placeorder');
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Back to Home
                </Link>
                <Link to="/shipping" className="btn btn-ghost btn-sm gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Shipping
                </Link>
            </div>

            <CheckoutSteps step1 step2 step3 />

            <div className="card bg-base-100 shadow-xl overflow-hidden">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Payment Method</h2>

                    {!showScanner ? (
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4 p-4 border rounded-xl hover:bg-base-200 transition-colors">
                                    <input
                                        type="radio"
                                        className="radio radio-primary"
                                        name="paymentMethod"
                                        value="Online Payment"
                                        checked={paymentMethod === 'Online Payment'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="label-text font-bold flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                                        Online Payment (QR Scanner)
                                    </span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-4 p-4 border rounded-xl hover:bg-base-200 transition-colors">
                                    <input
                                        type="radio"
                                        className="radio radio-primary"
                                        name="paymentMethod"
                                        value="Cash on Delivery"
                                        checked={paymentMethod === 'Cash on Delivery'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="label-text font-bold flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                        Cash on Delivery
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4">
                                Continue
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4 space-y-6">
                            <div className="bg-primary/5 p-6 rounded-2xl border-2 border-dashed border-primary/20">
                                <h3 className="text-lg font-bold mb-4">Scan QR Code to Pay</h3>
                                <div
                                    className="mx-auto w-48 h-48 bg-white p-2 rounded-lg shadow-inner cursor-pointer hover:scale-105 transition-transform"
                                    onClick={handleScanSimulation}
                                    title="Click to simulate scan"
                                >
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MAJESTY-ORDER-PAYMENT-SIMULATION"
                                        alt="Payment QR Code Scanner"
                                        className="w-full h-full opacity-80"
                                    />
                                </div>
                                <p className="mt-4 text-sm opacity-60 italic">Click the QR code to simulate a successful scan</p>
                            </div>

                            <button
                                className="btn btn-ghost btn-outline btn-sm"
                                onClick={() => setShowScanner(false)}
                            >
                                Change Payment Method
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;
