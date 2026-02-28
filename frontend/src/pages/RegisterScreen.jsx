import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.07-3.41M6.53 6.53A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.975 9.975 0 01-4.072 5.428M3 3l18 18" />
    </svg>
);

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const [register, { isLoading }] = useRegisterMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await register({
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("Account created successfully!");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <div className='flex justify-center items-center py-10'>
            <div className='card w-96 bg-base-100 shadow-xl p-8'>
                <h1 className='text-3xl font-bold mb-6 text-center'>REGISTER</h1>

                <form onSubmit={submitHandler}>
                    <div className="form-control mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-3 flex items-center text-base-content opacity-50 hover:opacity-100 transition-opacity"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>

                    <div className="form-control mb-6 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-3 flex items-center text-base-content opacity-50 hover:opacity-100 transition-opacity"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>

                    <button type='submit' className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className='mt-6 text-center flex items-center justify-center gap-2'>
                    <span>Already have an account?</span>
                    <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} className='btn btn-outline btn-secondary btn-sm'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;
