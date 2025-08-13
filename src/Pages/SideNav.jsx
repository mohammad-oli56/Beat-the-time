import React from 'react';
import { NavLink } from 'react-router';
import { FaHome, FaPlus, FaCalendarAlt, FaTicketAlt, FaHeadset, FaUser } from 'react-icons/fa';

const SideNav = () => {
    return (
        <div className="space-y-1.5">
            {/* Home Link */}
            <NavLink
                to="/"
                className="flex items-center p-3 w-full text-left bg-white border-none text-black"
            >
                <FaHome className="mr-3 text-lg" />
                <span>Home</span>
            </NavLink>



            {/* Create Event Link */}
            <NavLink
                to="/dashboard/createven"
                className="flex items-center p-3 w-full text-left  bg-white border-none text-black"
            >
                <FaPlus className="mr-3 text-lg" />
                <span>Create Event</span>
            </NavLink>




            {/* My Events Link */}
            <NavLink
                to="/dashbord/myevent"
                className="flex items-center p-3 w-full text-left  bg-white border-none text-black"
            >
                <FaCalendarAlt className="mr-3 text-lg" />
                <span>My Event</span>
            </NavLink>

            {/* My Bookings Link */}
            <NavLink
                to="/dashbord/bookings"
                className="flex mb-10 items-center p-3 w-full text-left  bg-white border-none text-black"
            >
                <FaTicketAlt className="mr-3 text-lg" />
                <span>My Bookings</span>
            </NavLink>
            <hr className='border border-black border-dashed' />
            <div className='mt-10 space-y-1.5'>
                 <NavLink
                to="/dashboard"
                className="flex items-center p-3 w-full text-left bg-white border-none text-black"
            >
                <FaUser className="mr-3 text-lg" /> {/* Profile icon */}
                <span>Profile</span> {/* Profile text */}
            </NavLink>


                {/* Support Link */}
                <NavLink
                    to="/dashbord/uppor"
                    className="flex items-center p-3 w-full text-left  bg-white border-none text-black"
                >
                    <FaHeadset className="mr-3 text-lg" />
                    <span>Support</span>
                </NavLink>
            </div>
        </div>
    );
};

export default SideNav;
