import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img className='w-12 rounded-full' src="https://static.vecteezy.com/system/resources/previews/023/335/565/non_2x/sports-event-concept-with-silhouette-athletics-running-cross-ribbon-on-white-background-vector.jpg" alt="" />

            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Event Explorer
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Discover and share amazing events around you.
            Your gateway to connect, learn, and experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><NavLink to="/" className="hover:text-blue-500">Home</NavLink></li>
            <li><NavLink to="/events" className="hover:text-blue-500">Events</NavLink></li>
            <li><NavLink to="/post-event" className="hover:text-blue-500">Post Event</NavLink></li>
            <li><NavLink to="/contact-us" className="hover:text-blue-500">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-gray-600 text-sm">📞 +880 1234 567890</p>
          <p className="text-gray-600 text-sm">✉ support@eventexplorer.com</p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4 text-gray-500">
            <a href="#" className="hover:text-blue-500"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Event Explorer. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;