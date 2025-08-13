import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { userprofile, handelLogout } = useContext(AuthContext);

  // const handleLogout = () => {
  //   logOut().catch(console.error);
  // };

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
      {/* <li>
        <NavLink to="/post-event" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
          Post Event
        </NavLink>
      </li> */}
      <li>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>
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
          <img className='w-12 rounded-full' src="https://static.vecteezy.com/system/resources/previews/023/335/565/non_2x/sports-event-concept-with-silhouette-athletics-running-cross-ribbon-on-white-background-vector.jpg" alt="" />
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
     <div className="navbar-end  ">
                    {!userprofile?.email ? (
                        <>
                            <Link to="/login" className="btn">Login</Link>
                            <Link to="/signup" className="btn">Sign-up</Link>
                        </>
                    ) : (
                        <>
                            {/* Profile Avatar with Hover Dropdown */}
                            <div className="relative group pr-3">
                                <div className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={userprofile?.photoURL || 'https://via.placeholder.com/40'}
                                            alt="user"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <ul className="menu menu-sm absolute right-0 bg-base-100 text-green-700 rounded-box z-10 mt-3 w-72 p-2 shadow opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
                                    <li><span><strong>Email:  </strong> {userprofile?.email}</span></li>
                                    <li><span><strong>Name:</strong> {userprofile?.displayName || 'No Name'}</span></li>
                                    {/* <li><span><strong>Bookings:  </strong> {books}</span></li>
                                    <li><span><strong>My-events:  </strong> {myevents}</span></li> */}
                                </ul>
                            </div>

                            <button
                                onClick={handelLogout}
                                className="btn btn-warning"
                            >
                                Sign-out
                            </button>
                        </>
                    )}

                </div>
    </div>
  );
};

export default Navbar;