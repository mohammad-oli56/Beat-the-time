import React, { useState, useContext } from "react";

import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
// import { AuthContext } from "../context/AuthContext";

const ContactSupport = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/contact-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent! Check your email for confirmation.");
        setFormData({
          name: user?.displayName || "",
          email: user?.email || "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ Something went wrong. Try again.");
      }
    } catch (error) {
      setStatus("❌ Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left: Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact & Support</h2>
          <p className="text-gray-500 mb-6">
            Have any questions or need help? Fill out the form and we’ll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border rounded-lg px-4 py-2"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {status && <p className="mt-4 text-sm text-center">{status}</p>}

          {/* Social Media Links */}
          <div className="mt-8 flex gap-4 justify-center text-2xl text-blue-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: FAQ Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">FAQ & Help</h2>
          <div className="space-y-4">
            <details className="border p-3 rounded-lg">
              <summary className="cursor-pointer font-semibold">
                How can I join the club?
              </summary>
              <p className="mt-2 text-gray-600">
                You can join by filling out our membership form and paying the annual fee.
              </p>
            </details>

            <details className="border p-3 rounded-lg">
              <summary className="cursor-pointer font-semibold">
                Where can I see upcoming events?
              </summary>
              <p className="mt-2 text-gray-600">
                All upcoming events are listed in the "Events" section of our website.
              </p>
            </details>

            <details className="border p-3 rounded-lg">
              <summary className="cursor-pointer font-semibold">
                How can I volunteer?
              </summary>
              <p className="mt-2 text-gray-600">
                Contact us via this form with your interest and availability.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;