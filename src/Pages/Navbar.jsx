import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allevent" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Events
        </NavLink>
      </li>
      <li>
        <NavLink to="/post-event" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Post Event
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gray-100 shadow-md px-4">
      {/* Left Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current text-blue-500">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <image href="/icon.png" x="6" y="6" width="12" height="12" />
          </svg>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Event Explorer
          </span>
        </NavLink>
      </div>

      {/* Center Menu: Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {navLinks}
        </ul>
      </div>

      {/* Right End: Profile or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar relative group">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kRrLqb/default-avatar.png"}
                  alt="user"
                />
              </div>
              {/* Hover name */}
              <div className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {user.displayName || "User"}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><span className="font-semibold">{user.displayName || "User"}</span></li>
              <li><button onClick={handleLogout} className="btn btn-sm btn-error text-white">Logout</button></li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-outline btn-sm">Login / Sign up</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;