import React, { useState } from 'react';

import { Outlet } from 'react-router';
import { TiThMenu } from 'react-icons/ti';
import SideNav from '../Pages/SideNav';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility on mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-start p-4 text-2xl bg-gray-100 text-gray-700"
                onClick={toggleSidebar}
            >
                <TiThMenu />
            </button>

            {/* Sidebar */}
            <div
                className={`w-3/12 bg-gray-200 p-4 transition-all duration-300 ease-in-out transform md:relative lg:w-3/12 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}
            >
                <SideNav />
            </div>

            {/* Main Content - 9/12 width (75%) */}
            <div className="w-full bg-gray-100 md:w-9/12 lg:w-9/12 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
