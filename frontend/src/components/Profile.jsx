import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import CoolAvatar from '../../src/assets/img/cool-avatar.jpg';
import HandsomeAvatar from '../../src/assets/img/handsome-avatar.jpg';
import SmilingAvatar from '../../src/assets/img/smiling-avatar.jpg';
import SpecsAvatar from '../../src/assets/img/smiling-avatar-specs.jpg';
import FemaleAvatar from '../../src/assets/img/smiling-avatar-female.jpg';
import { useNavigate } from 'react-router-dom';
import FlashMessage from '../constants/FlashMessage';

const Profile = ({ login, user }) => {
  const avatars = [CoolAvatar, HandsomeAvatar, SmilingAvatar, SpecsAvatar, FemaleAvatar];
  const [flash, setFlash] = useState({ message: '', type: '' });
  const [randomAvatar, setRandomAvatar] = useState(avatars[0]);
  const navigate = useNavigate();

  const { isLoggedIn } = login;
  const { currentUser } = user;

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      navigate('/login');
    }
  }, [isLoggedIn, currentUser, navigate]);

  useEffect(() => {
    const num = Math.floor(Math.random() * avatars.length);
    setRandomAvatar(avatars[num]);
  }, []);

  const handleClick = (event) => {
    navigate(`/events/${event._id}`, { state: event });
  }

  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar login={login} user={user} />
        {flash.message && (
          <FlashMessage
            message={flash.message}
            type={flash.type}
            onClose={() => setFlash({ message: '', type: '' })}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-48"></div>
            <div className="relative -mt-24 sm:-mt-32 px-6 pb-8">
              <img
                src={randomAvatar}
                alt="Profile"
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-xl mx-auto"
              />
              <h2 className="text-3xl font-bold text-center mt-4">
                {currentUser?.username || 'Username'}
              </h2>
              <p className="text-gray-600 text-center">
                {currentUser?.email || 'Email'}
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <a href='/createEvent'><button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Create event
                </button></a>
                <a href='/categories'><button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Categories
                </button></a>
              </div>
            </div>
          </div>

          {/* Events Sections */}
          {['Registered Events', 'Created Events'].map((sectionTitle, index) => {
            const eventsArray = index === 0 ? currentUser?.eventsRegistered : currentUser?.eventsOrganised;

            return (
              <div key={sectionTitle} className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">{sectionTitle}</h3>
                {eventsArray && eventsArray.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsArray.map((event) => (
                      <button onClick={() => handleClick(event)}>
                        <div
                          key={event._id}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-6">
                            <h4 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h4>
                            <div className="flex items-center text-gray-600 mb-2">
                              <CalendarIcon className="h-5 w-5 mr-2" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPinIcon className="h-5 w-5 mr-2" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <UserGroupIcon className="h-5 w-5 mr-2" />
                              <span>{event.attendees || 0} attendees</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">No {sectionTitle.toLowerCase()} available.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
