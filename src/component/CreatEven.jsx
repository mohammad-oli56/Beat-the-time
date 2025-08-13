import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CreatEven = () => {
  const { userprofile } = useContext(AuthContext);

  const eventdatafrom = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const evendata = Object.fromEntries(formData.entries());

    // Make sure email is set from user profile (override if needed)
    evendata.email = userprofile?.email || evendata.email;

    axios
      .post("http://localhost:3000/addeven", evendata)
      .then(function (response) {
        console.log("Event added:", response.data.insertedId);
        if (response.data.insertedId) {
          toast.success("Add Event successful!", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
          });
          form.reset();
        }
      })
      .catch(function (error) {
        console.error("Error adding event:", error);
        toast.error("Failed to add event", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md border border-black">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        Create Event
      </h2>

      <form onSubmit={eventdatafrom} className="space-y-5 text-black">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Event Name
          </label>
          <input
            required
            type="text"
            name="eventName"
            className="w-full border border-black rounded-md p-2 placeholder-black text-black"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Event Type
          </label>
          <select
            name="eventType"
            required
            className="w-full border border-black rounded-md p-2 text-black"
          >
            <option value="">--Select Type--</option>
            <option value="Swimming">Swimming</option>
            <option value="Sprinting">Sprinting</option>
            <option value="Long Jump">Long Jump</option>
            <option value="High Jump">High Jump</option>
            <option value="Hurdle Race">Hurdle Race</option>
          </select>
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Event Date
          </label>
          <input
            required
            type="date"
            name="eventDate"
            className="w-full border border-black rounded-md p-2 text-black"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Location
          </label>
          <input
            required
            type="text"
            name="location"
            className="w-full border border-black rounded-md p-2 placeholder-black text-black"
            placeholder="Enter event Location"
          />
        </div>

        <div className="flex justify-between gap-1">
          {/* Creator Email */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-black">
              Creator Email
            </label>
            <input
              required
              type="email"
              name="creatorEmail"
              defaultValue={userprofile?.email}
              className="w-full border border-black rounded-md p-2 text-black placeholder-black"
              placeholder="Enter your email"
            />
          </div>

          {/* Creator Name */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-black">
              Creator Name
            </label>
            <input
              required
              type="text"
              name="creatorName"
              defaultValue={userprofile?.displayName}
              className="w-full border border-black rounded-md p-2 text-black placeholder-black"
              placeholder="Enter your name"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Event Image URL
          </label>
          <input
            required
            type="url"
            name="eventImageUrl"
            className="w-full border border-black rounded-md p-2 text-black placeholder-black"
            placeholder="Enter image URL"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-black">
            Description
          </label>
          <textarea
            required
            name="description"
            className="w-full border border-black rounded-md p-2 text-black placeholder-black"
            rows="4"
            placeholder="Enter event description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreatEven;
