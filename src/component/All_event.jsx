import React, { useEffect, useState } from "react";


const Event = () => {

    // const data = useLoaderData()
    // console.log(data)

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/alleven") // আপনার backend API URL
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading events...
      </div>
    );
  }

  return (
    
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Event Image */}
              <img
                src={event.eventImageUrl}
                alt={event.eventName}
                className="w-full h-48 object-cover"
              />

              {/* Event Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  Type: <span className="font-medium">{event.eventType}</span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  📅 {event.eventDate} | 🕒 {event.eventTime}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  📍{" "}
                  <a
                    href={event.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {event.location}
                  </a>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  👤 {event.creatorName} ({event.creatorEmail})
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Max Participants: {event.maxParticipants}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                    event.status === "Pending Approval"
                      ? "bg-yellow-100 text-yellow-700"
                      : event.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.status}
                </span>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Action Button */}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;