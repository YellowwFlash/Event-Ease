import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import e1 from "../assets/img/e1.avif";
import e2 from "../assets/img/e2.avif";
import e3 from "../assets/img/e3.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const relatedEvents = [
  { id: 2, title: "Tech Innovators Conference 2024", image: e1, category: "Tech" },
  { id: 3, title: "Green Future Expo", image: e2, category: "Environment" },
  { id: 4, title: "AI Revolution 2024", image: e3, category: "AI" }
];

const EventDetail = ({ login, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state;
  const { currentUser } = user;

  const handleRegisterClick = (eventId) => {
    navigate(`/registerEvent/${eventId}`);
  };

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleUpdateClick = () => {
    navigate(`/updateEvent`, { state: event });
  };

  const handleDeleteClick = () => {
    console.log("Delete event:", event.id);
  };

  if (!event) {
    return <p className="text-center text-gray-500">Event not found</p>;
  }

  return (
    <>
      <Navbar login={login} user={user} />

      <div className="min-h-screen bg-white-100 p-8">
        <div className="max-w-7xl mx-auto mt-20 mb-8 flex flex-col md:flex-row justify-evenly">
          {/* Event Image */}
          <div className="flex-none w-full md:w-1/2 mb-6 md:mb-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-contain rounded-lg" />
          </div>

          {/* Event Information */}
          <div className="flex-1 md:pl-8 flex flex-col gap-6">
            <h2 className="text-4xl font-bold mb-4">{event.title}</h2>
            <p className="text-lg mb-2"><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><strong>Time:</strong> {new Date(event.startDate).toLocaleTimeString()}</p>
            <p className="text-lg mb-2"><strong>Category:</strong> {event.type}</p>
            <p className="text-lg mb-4"><strong>Price:</strong> {event.price}</p>
            <p className="text-lg font-medium mb-6">{event.description}</p>

            <div className="flex flex-col gap-4">
              {currentUser && event.organiser === currentUser._id ?
                (<div className="flex gap-4">
                  <button
                    onClick={handleUpdateClick}
                    className="flex-1 flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Update
                  </button>
                  {/* <button
                    onClick={handleDeleteClick}
                    className="flex-1 flex items-center justify-center bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    <TrashIcon className="h-5 w-5 mr-2" />
                    Delete
                  </button> */}
                </div>) : (
                  <button
                    onClick={() => handleRegisterClick(event._id)}
                    className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition duration-200"
                  >
                    Register for Event
                  </button>)
              }
            </div>
          </div>
        </div>
      </div>

      {/* Similar Related Events */}
      <div className="bg-white-100 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Similar Related Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedEvents.map((relatedEvent) => (
              <div
                key={relatedEvent.id}
                className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={relatedEvent.image}
                  alt={relatedEvent.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{relatedEvent.title}</h3>
                  <p className="text-sm text-gray-600">{relatedEvent.category}</p>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EventDetail;