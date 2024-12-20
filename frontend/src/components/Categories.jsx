import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";


const Card = ({ event }) => {
    const { _id, title, type, image, price, startDate } = event;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${_id}`, { state: event })

    }
    return (
        <div
            onClick={handleClick}
            className="cursor-pointer transform transition-transform hover:scale-105 duration-300 ease-in-out"
        >
            <div className="border rounded-lg overflow-hidden shadow-lg w-full h-80 md:h-96 max-w-xs md:max-w-sm">
                <div className="w-full h-1/2">
                    <img src={image} alt="Event" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 h-1/2 flex flex-col justify-between">
                    <div>
                        <div className="flex space-x-4 mb-4">
                            <span className="bg-green-100 text-green-500 py-1 px-3 rounded-full text-sm">{price}</span>
                            <span className="bg-gray-100 text-gray-500 py-1 px-3 rounded-full text-sm">{type}</span>
                        </div>
                        <div className="text-gray-600 mb-2">
                            <p><strong>Date:</strong> {new Date(startDate).toLocaleString()}</p>
                            <p><strong>Time:</strong> 10 AM</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                </div>
            </div>
        </div>
    );
};

const Categories = ({login, user}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/events');
                if (!response.ok) throw new Error('Network response was invalid')
                const data = await response.json();
                console.log(data.events);

                setEvents(data.events);
            } catch (error) {
                console.log('Error fetching meals : ', error);
            }
        };
        fetchEvents();
    }, []);


    const filteredEvents = events.filter((event) => {
        const matchesTitle = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "" || selectedCategory === "All" || event.category === selectedCategory;
        return matchesTitle && matchesCategory;
    });

    const eventsToDisplay = filteredEvents.length > 0 || searchQuery === "" ? filteredEvents : events;


    return (
        <>
            {/* Navbar Component */}
            <Navbar login={login} user={user}/>
            <div className="mt-20 px-6">
                {/* Page title */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
                    Explore{" "}
                    <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                        Events Categories.
                    </span>
                </h2>
                {/* Search and Filter Options */}
                <div className="flex flex-wrap justify-center mt-12">
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {/* Search by Event Title */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search by title..."
                                    className="border rounded-md p-2 pl-10 w-full h-12 focus:ring-2 focus:ring-purple-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" />
                            </div>

                            {/* Filter by Event Category */}
                            <select
                                className="border rounded-md p-2 w-full h-12 focus:ring-2 focus:ring-purple-400"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="" hidden>Filter by category</option>
                                <option value="All">All</option>
                                <option value="AI">AI</option>
                                <option value="Tech">Tech</option>
                                <option value="Environment">Environment</option>
                            </select>
                        </div>

                        {/* Grid of Events */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                            {eventsToDisplay.length > 0 ? (
                                eventsToDisplay.map((event, index) => (
                                    <Card
                                        key={index}
                                        event={event}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No events found</p>
                            )}
                        </div>
                        {/* Footer Component */}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;
