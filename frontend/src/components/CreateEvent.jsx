import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, LinkIcon, PencilIcon, PhotoIcon, TagIcon } from "@heroicons/react/24/outline";
import FlashMessage from "../constants/FlashMessage";
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ login, user }) => {
    const [isFree, setIsFree] = useState(false);
    const [flash, setFlash] = useState({ message: '', type: '' })
    const navigate = useNavigate();
    const { isLoggedIn } = login;
    const { currentUser, setCurrentUser } = user;
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        description: "",
        image: "",
        location: "",
        startDate: "",
        endDate: "",
        price: "",
        url: ""
    });

    useEffect(() => {
        if (!isLoggedIn || !currentUser) {
            setFlash({ message: 'You must be logged in to create an event!', type: 'error' });
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        }
    }, [isLoggedIn, currentUser, navigate]);


    const handleFreeCheckbox = () => {
        setIsFree(!isFree);
    };

    // Handle input changes including file input
    const onFormChange = (target, value) => {
        if (target.type === "file") {
            const file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result });
                };
            }
        } else {
            setFormData({ ...formData, [target.name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            ...formData,
            price: isFree ? "Free" : formData.price,
            ['organiser']: currentUser._id
        };

        if (Object.values(finalData).includes('')) {
            setFlash({ message: 'Fields cannot be empty', type: 'error' });
            return;
        }

        console.log(finalData);

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData), // JSON encoded data
            });

            const result = await response.json();
            if (!response.ok) {
                setFlash({ message: 'Something went wrong', type: 'error' });
                return;
            }
            const event = result['event'][0];
            console.log(result);
            console.log(event);
            
            
            const userResponse = await fetch(`http://localhost:5000/user/organise/${event._id}/${currentUser._id}`)

            if (!userResponse.ok) {
                setFlash({ message: 'Something went wrong', type: 'error' });
                return;
            }

            const userResult = await userResponse.json();
            setCurrentUser(userResult['user'])
            setFlash({ message: 'Event creation successful!', type: 'success' });
            setTimeout(() => {
                navigate('/')
            }, 1200);
        } catch (error) {
            console.error('Error:', error);
            setFlash({ message: 'Something went wrong', type: 'error' });
        }
    };


    return (
        <>
            <Navbar login={login} user={user} />
            {flash.message && (<FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash({ message: '', type: '' })}
            />)}
            <div className="max-w-7xl mx-auto pt-3 px-6">
                <div className="min-h-screen bg-gray-100 p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Create Event</h2>

                    <form className="max-w-5xl mx-auto" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <PencilIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Event Name"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.title}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <TagIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <select
                                    name="type"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.type}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                >
                                    <option value="" disabled hidden>
                                        Category
                                    </option>
                                    <option value="Conference">Conference</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Webinar">Webinar</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <PencilIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-36"
                                    value={formData.description}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <PhotoIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="file"
                                    className="w-full h-36 pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onChange={(e) => onFormChange(e.target, e.target.files[0])}
                                />
                            </div>
                        </div>

                        {/* Event Location or Online */}
                        <div className="relative mb-6">
                            <MapPinIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                placeholder="Event Location or Online"
                                className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.location}
                                onChange={(e) => onFormChange(e.target, e.target.value)}
                            />
                        </div>

                        {/* Start Date and End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <CalendarIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    name="startDate"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.startDate}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <CalendarIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    name="endDate"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.endDate}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Price and URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <CurrencyDollarIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type={isFree ? "text" : "number"}
                                    name="price"
                                    placeholder={isFree ? "Free" : "Price"}
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.price}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                    disabled={isFree}
                                />
                                <label className="flex ml-2 items-center mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-purple-500"
                                        checked={isFree}
                                        onChange={handleFreeCheckbox}
                                    />
                                    <span className="ml-2 text-gray-700">Free Ticket</span>
                                </label>
                            </div>

                            <div className="relative">
                                <LinkIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="url"
                                    name="url"
                                    placeholder="Event URL"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={formData.url}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Create Event Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-400 text-white border border-black py-3 px-6 rounded-lg hover:bg-purple-500"
                        >
                            Create Event
                        </button>
                    </form>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default CreateEvent;
