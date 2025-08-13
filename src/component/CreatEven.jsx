import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CreateEvent = () => {
  const { userprofile } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const eventData = Object.fromEntries(formData.entries());

    // Overwrite creatorEmail with logged-in user email to avoid spoofing
    eventData.creatorEmail = userprofile?.email || eventData.creatorEmail;
    eventData.status = "Pending Approval";
    eventData.createdAt = new Date().toISOString();

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:3000/addeven", eventData);

      if (response.status === 201 && response.data.insertedId) {
        toast.success("Event created successfully and sent for approval!", {
          position: "top-right",
          autoClose: 4000,
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create event", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Create New Event
      </h2>

      <form onSubmit={handleEventSubmit} className="space-y-5 text-gray-800">
        {/* Event Name */}
        <div>
          <label className="block font-medium mb-1">Event Name</label>
          <input
            required
            type="text"
            name="eventName"
            className="w-full border rounded-md p-2"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block font-medium mb-1">Event Type</label>
          <select name="eventType" required className="w-full border rounded-md p-2">
            <option value="">-- Select Type --</option>
            <option value="Programming Contest">Programming Contest</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Event Date</label>
            <input required type="date" name="eventDate" className="w-full border rounded-md p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Event Time</label>
            <input required type="time" name="eventTime" className="w-full border rounded-md p-2" />
          </div>
        </div>

        {/* Location + Map Link */}
        <div>
          <label className="block font-medium mb-1">Event Location</label>
          <input
            required
            type="text"
            name="location"
            className="w-full border rounded-md p-2"
            placeholder="e.g., DIU Auditorium"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Google Map URL</label>
          <input
            type="url"
            name="mapLink"
            className="w-full border rounded-md p-2"
            placeholder="Paste Google Maps location link"
          />
        </div>

        {/* Organizer Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Creator Email</label>
            <input
              required
              type="email"
              name="creatorEmail"
              defaultValue={userprofile?.email}
              readOnly
              className="w-full border rounded-md p-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Creator Name</label>
            <input
              required
              type="text"
              name="creatorName"
              defaultValue={userprofile?.displayName}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>

        {/* Max Participants */}
        <div>
          <label className="block font-medium mb-1">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            className="w-full border rounded-md p-2"
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Event Image */}
        <div>
          <label className="block font-medium mb-1">Event Image URL</label>
          <input
            required
            type="url"
            name="eventImageUrl"
            className="w-full border rounded-md p-2"
            placeholder="Paste event image URL"
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="block font-medium mb-1">Event Description</label>
          <textarea
            required
            name="description"
            rows="4"
            className="w-full border rounded-md p-2"
            placeholder="Describe event, agenda, speakers..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
        >
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
