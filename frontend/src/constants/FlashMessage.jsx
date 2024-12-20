import React from 'react';

const FlashMessage = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-14 right-[37.75%] z-50 p-4 mb-4 text-sm rounded-lg transition-opacity duration-300 ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-sm font-semibold underline text-gray-600 hover:text-gray-800">Close</button>
            </div>
        </div>
    );
};

export default FlashMessage;