import React, { useState } from "react";
import FlashMessage from "../constants/FlashMessage";
import { useNavigate } from "react-router-dom";

const SignupUser = ({ login, user }) => {
    const { isLoggedIn, setIsLoggedIn } = login;
    const { currentUser, setCurrentUser } = user;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        eventsOrganised: [],
        eventsRegistered: []
    });
    const [flash, setFlash] = useState({ message: '', type: '' });

    const onFieldChange = (target, value) =>
        setFormData({ ...formData, [target.name]: value })


    const handleSignup = async (e) => {
        e.preventDefault();

        if (Object.values(formData).includes('')) {
            setFlash({ message: 'Fields cannot be empty', type: 'error' });
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setFlash({ message: 'Passwords do not match', type: 'error' });
            return;
        }

        const { confirm_password, ...finalData } = formData;

        try {
            const response = await fetch(`http://localhost:5000/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });
            const result = await response.json();

            if (!response.ok) {
                setFlash({ message: result['message'], type: 'error' });
                return;
            }
        

            await setIsLoggedIn(true);
            await setCurrentUser(result['user'])
            setFlash({ message: 'User signed up successfully!!', type: 'success' });
            setTimeout(() => navigate('/'), 1200);
        } catch (error) {
            console.error('Error:', error);
            setFlash({ message: 'Something went wrong', type: 'error' });
        }

    };

    return (
        <>
            {flash.message && (<FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash({ message: '', type: '' })}
            />)}

            < div className="min-h-screen flex items-center justify-center bg-indigo-200 py-10" >
                <div className="bg-white p-14 rounded-lg shadow-2xl max-w-xl w-full border border-gray-300">
                    <h2 className="text-3xl font-bold text-center mb-8">Create magic with every <span className="text-indigo-800">MOMENT✨</span></h2>

                    <form onSubmit={handleSignup}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                                Name
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your name"
                                onChange={(e) => onFieldChange(e.target, e.target.value)}
                                required
                            />
                        </div>

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
                                name="password"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                                onChange={(e) => onFieldChange(e.target, e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm_password">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                                onChange={(e) => onFieldChange(e.target, e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-8">
                        Already have an account?{" "}
                        <a href="/login" className="text-indigo-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div >
        </>
    );
};

export default SignupUser;
