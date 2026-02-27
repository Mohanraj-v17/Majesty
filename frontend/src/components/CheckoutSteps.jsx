import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center items-center gap-4 mb-8 text-sm font-bold uppercase tracking-widest">
            <div>
                {step1 ? (
                    <Link to='/login' className="text-primary border-b-2 border-primary pb-1">Sign In</Link>
                ) : (
                    <span className="opacity-30">Sign In</span>
                )}
            </div>

            <div className="h-px w-8 bg-base-content/10"></div>

            <div>
                {step2 ? (
                    <Link to='/shipping' className="text-primary border-b-2 border-primary pb-1">Shipping</Link>
                ) : (
                    <span className="opacity-30">Shipping</span>
                )}
            </div>

            <div className="h-px w-8 bg-base-content/10"></div>

            <div>
                {step3 ? (
                    <Link to='/payment' className="text-primary border-b-2 border-primary pb-1">Payment</Link>
                ) : (
                    <span className="opacity-30">Payment</span>
                )}
            </div>

            <div className="h-px w-8 bg-base-content/10"></div>

            <div>
                {step4 ? (
                    <Link to='/placeorder' className="text-primary border-b-2 border-primary pb-1">Place Order</Link>
                ) : (
                    <span className="opacity-30">Place Order</span>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;
