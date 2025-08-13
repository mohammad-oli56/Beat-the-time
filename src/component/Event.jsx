import React from 'react';
import { Link } from 'react-router';

const Event = ({ dat }) => {
    const {
        eventName,
        _id,
        eventImageUrl,

    } = dat;



    return (
        <div className="card bg-white shadow-md rounded-lg p-4 mb-6">
            <img
                src={eventImageUrl || "/placeholder-event.png"}
                alt={eventName}
                className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">Event Name :  {eventName}</h2>

            <Link to={`/details/${_id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                    View Details
                </button>
            </Link>



        </div>
    );
};

export default Event;