import React, { useState } from "react";
import FlashMessage from "../constants/FlashMessage";
import { useNavigate } from "react-router-dom";

const Login = ({ login, user }) => {
    const { isLoggedIn, setIsLoggedIn } = login;
    const { setCurrentUser } = user;
    const [flash, setFlash] = useState({ message: '', type: '' });
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const onFieldChange = (target, value) =>
        setFormData({ ...formData, [target.name]: value })

    const handleLogin = async (e) => {
        e.preventDefault();

        if (Object.values(formData).includes('')) {
            setFlash({ message: 'Fields cannot be empty', type: 'error' });
            return;
        }


        try {
            const response = await fetch(`http://localhost:5000/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setFlash({ message: result['message'], type: 'error' });
                return;
            }

            await setIsLoggedIn(true);
            await setCurrentUser(result['user'])
            setFlash({ message: 'Login successful!', type: 'success' });
            setTimeout(() => navigate('/'), 1200);
        } catch (error) {
            console.log(error);
            setFlash({ message: 'Something went wrong', type: 'error' });
        }
    };

    return (<>
        {flash.message && (<FlashMessage
            message={flash.message}
            type={flash.type}
            onClose={() => setFlash({ message: '', type: '' })}
        />)}
        <div className="min-h-screen flex items-center justify-center bg-indigo-200 py-10">
            <div className="bg-white p-12 rounded-lg shadow-2xl max-w-lg w-full border border-gray-300">
                <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                            onChange={(e) => onFieldChange(e.target, e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                            onChange={(e) => onFieldChange(e.target, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>

                        <a href="/" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-indigo-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    </>
    );
};

export default Login;
