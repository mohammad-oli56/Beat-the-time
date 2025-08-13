import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Mybookings = () => {
    const { userprofile } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getbooking');
                // Filter bookings for logged-in user
                const myBookings = response.data.filter(b => b.email === userprofile?.email);
                setBookings(myBookings);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userprofile?.email]);

    if (loading) {
        return <p className="text-center mt-12">Loading your bookings...</p>;
    }

    if (bookings.length === 0) {
        return <p className="text-center mt-12">You have no bookings yet.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto my-12">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <ul className="space-y-4">
                {bookings.map((booking) => (
                    <li key={booking._id} className="p-4 border rounded-md shadow-sm">
                        <p><strong>Event Name:</strong> {booking.eventDetails?.eventName || 'Unknown Event'}</p>
                        <p><strong>Event Type:</strong> {booking.eventDetails?.eventType || '—'}</p>
                        <p><strong>Event Date & Time:</strong> {booking.eventDetails?.eventDate} {booking.eventDetails?.eventTime}</p>
                        <p><strong>Booking Email:</strong> {booking.email}</p>
                        <p><strong>Team Members:</strong> {booking.teamMemberNumber}</p>
                        <p><strong>Contact Mobile:</strong> {booking.contactMobile}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Mybookings;
