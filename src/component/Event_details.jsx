// Event_details.jsx
import axios from "axios";
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Event_details = () => {
    const event = useLoaderData();
    const navigate = useNavigate();

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-medium">Event not found.</p>
            </div>
        );
    }

    const {
        _id,
        eventName,
        eventType,
        eventDate,
        eventTime,
        location,
        mapLink,
        creatorEmail,
        creatorName,
        maxParticipants,
        eventImageUrl,
        description,
        status,
        createdAt,
    } = event;

    // combine date + time when possible
    let formattedDateTime = "Date/time not provided";
    try {
        if (eventDate && eventTime) {
            const dt = new Date(`${eventDate}T${eventTime}`);
            formattedDateTime = isNaN(dt) ? `${eventDate} ${eventTime}` : dt.toLocaleString();
        } else if (eventDate) {
            formattedDateTime = new Date(eventDate).toLocaleDateString();
        }
    } catch (e) {
        formattedDateTime = `${eventDate || ""} ${eventTime || ""}`.trim();
    }

    const formattedCreatedAt = createdAt ? new Date(createdAt).toLocaleString() : "—";

    // simple badge color by status (Pending, Approved, Rejected)
    const statusBadge =
        status === "Approved"
            ? "bg-green-100 text-green-800"
            : status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800";

    return (
        <div className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-sm text-blue-600 hover:underline"
            >
                ← Back
            </button>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <img
                        src={eventImageUrl || "/placeholder-event.png"}
                        alt={eventName || "Event image"}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusBadge}`}>
                            {status || "Unknown Status"}
                        </span>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-2">{eventName || "Untitled Event"}</h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <strong>Type:</strong> {eventType || "—"}
                        </div>
                        <div>
                            <strong>Date & Time:</strong> {formattedDateTime}
                        </div>
                        <div>
                            <strong>Max Participants:</strong> {maxParticipants ?? "—"}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Location</h3>
                        <p className="text-gray-700">{location || "Location not provided"}</p>
                        {mapLink && (
                            <a
                                href={mapLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                            >
                                Open in Maps
                            </a>
                        )}
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">About</h3>
                        <p className="text-gray-700 whitespace-pre-line">{description || "No description"}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                        <div>
                            <strong>Organizer:</strong>
                            <div>{creatorName || "—"}</div>
                        </div>

                        <div>
                            <strong>Contact:</strong>
                            <div>
                                {creatorEmail ? (
                                    <a href={`mailto:${creatorEmail}`} className="text-blue-600 hover:underline">
                                        {creatorEmail}
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
                            Register
                        </button>

                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>

                                <h3 className="font-bold text-lg mb-4">Register</h3>

                                <form onSubmit={async (e) => {
                                    e.preventDefault();

                                    const form = e.target;
                                    const studentsdata = {
                                        name: form.name.value,
                                        email: form.email.value,
                                        teamMemberNumber: form.teamMemberNumber.value,
                                        contactMobile: form.contactMobile.value,
                                        eventiId :_id
                                    };

                                    try {
                                        const response = await axios.post('http://localhost:3000/books', studentsdata);
                                        console.log("Server Response:", response.data);
                                        alert("Registration successful!");
                                        document.getElementById('my_modal_3').close();
                                        form.reset(); // Optional: clear the form
                                    } catch (error) {
                                        console.error("Error posting data:", error);
                                        alert("Failed to register. Please try again.");
                                    }



                                    console.log("Submitted Data:", studentsdata);

                                    document.getElementById('my_modal_3').close();
                                }}>
                                    <div className="form-control mb-2">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control mb-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your email"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control mb-2">
                                        <label className="label">
                                            <span className="label-text">Team Member Number</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="teamMemberNumber"
                                            placeholder="Number of team members"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Contact Mobile Number</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactMobile"
                                            placeholder="Mobile number"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full">Register</button>
                                </form>


                            </div>
                        </dialog>

                        <a
                            href={`mailto:${creatorEmail || ""}`}
                            className="px-4 py-2 border rounded-lg text-gray-700 text-center"
                        >
                            Contact Organizer
                        </a>

                        <div className="ml-auto text-xs text-gray-500">
                            <div>Created at</div>
                            <div className="font-mono">{formattedCreatedAt}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event_details;
