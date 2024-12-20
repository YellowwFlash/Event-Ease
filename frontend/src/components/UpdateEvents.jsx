import { CurrencyDollarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { CalendarIcon, LinkIcon, MapPinIcon, PencilIcon, TagIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashMessage from "../constants/FlashMessage";
import Footer from "./Footer";
import Navbar from "./Navbar";

const UpdateEvent = ({ login, user }) => {
    const loc = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = login;
    const { currentUser } = user;
    const [flash, setFlash] = useState({ message: '', type: '' });

    useEffect(() => {
        if (!isLoggedIn || !currentUser) {
            setFlash({ message: 'You must be logged in to update an event!', type: 'error' });
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        }
    }, [isLoggedIn, currentUser, navigate]);

    const details = loc.state || {};

    // Destructure with fallback
    const { title = '', type = '', description = '', image = '', location = '', startDate = '', endDate = '', price = 'Free', url = '' } = details;
    const initialData = { ...details };
    const [isFree, setIsFree] = useState(price === 'Free');
    const [formData, setFormData] = useState({ ...details });


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

    const handleFreeCheckbox = () => {
        setIsFree(!isFree);
        setFormData({ ...formData, price: isFree ? 'Paid' : 'Free' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (JSON.stringify(initialData) === JSON.stringify(formData)) {
            setFlash({ message: 'Nothing is updated as nothing is changed', type: 'success' })
            setTimeout(() => navigate('/'), 1200);
        } else {

            const hasEmptyValues = Object.entries(formData).some(
                ([key, value]) => {
                    key !== 'image' && (!value || value === "");
                }
            );

            if (hasEmptyValues) {
                setFlash({ message: 'Fields cannot be empty', type: 'error' });
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/events/update/${details._id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setFlash({ message: 'Event updation successful!', type: 'success' });
                setTimeout(() => navigate('/'), 1200);
            } catch (error) {
                console.error('Error:', error);
                setFlash({ message: 'Something went wrong', type: 'error' });
            }
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
                    <h2 className="text-3xl font-bold text-center mb-8">Update Event</h2>

                    <form className="max-w-5xl mx-auto" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <PencilIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={title}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <TagIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <select
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={type}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                >
                                    <option disabled hidden>
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
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-36"
                                    placeholder={description}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <PhotoIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="file"
                                    className="w-full h-36 pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Event Location or Online */}
                        <div className="relative mb-6">
                            <MapPinIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder={location}
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
                                    placeholder={new Date(startDate).toISOString().split('T')[0]}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <CalendarIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    name="endDate"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={new Date(endDate).toISOString().split('T')[0]}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Price and URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <CurrencyDollarIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type='text'
                                    name="price"
                                    placeholder={price}
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    disabled={isFree}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                                <label className="flex ml-2 items-center mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox text-purple-500"
                                        checked={isFree}
                                        onChange={(event) => handleFreeCheckbox(event.target.value)}
                                    />
                                    <span className="ml-2 text-gray-700">Free Ticket</span>
                                </label>
                            </div>

                            <div className="relative">
                                <LinkIcon className="w-6 h-6 absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="url"
                                    name="url"
                                    className="w-full pl-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={url}
                                    onChange={(e) => onFormChange(e.target, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Create Event Button */}
                        <button
                            type="submit"
                            className="w-full bg-purple-400 text-white border border-black py-3 px-6 rounded-lg hover:bg-purple-500"

                        >
                            Update Event
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default UpdateEvent;
