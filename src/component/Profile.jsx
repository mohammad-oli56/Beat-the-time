import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const { userprofile } = useContext(AuthContext);
  const allUsers = useLoaderData() || []; // MongoDB users
  console.log("All users:", allUsers);

  if (!userprofile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Find user in MongoDB that matches the logged-in user's email
  const mongoUser = allUsers.find((user) => user.email === userprofile.email);

  // Merge Firebase userprofile and MongoDB data
  const finalUser = {
    name: userprofile.displayName || mongoUser?.name || "Anonymous User",
    email: userprofile.email || mongoUser?.email || "No email provided",
    photo: userprofile.photoURL || mongoUser?.photo || "https://via.placeholder.com/150",
    role: mongoUser?.role || "student",
    bio: userprofile.bio || mongoUser?.bio || "No bio available. Add something about yourself!",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center mb-8">
        <img
          src={finalUser.photo}
          alt={finalUser.name}
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-md"
        />
        <h1 className="text-2xl font-bold mt-4">{finalUser.name}</h1>
        <p className="text-gray-500 mb-4">{finalUser.email}</p>
        <p className="text-sm font-medium text-blue-600 mb-4">{finalUser.role}</p>

        <div className="flex justify-around mt-6">
          <div>
            <p className="text-lg font-semibold text-blue-600">12</p>
            <p className="text-sm text-gray-500">Events Joined</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">3</p>
            <p className="text-sm text-gray-500">Events Created</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">5</p>
            <p className="text-sm text-gray-500">Badges Earned</p>
          </div>
        </div>

        <p className="mt-6 text-gray-700 text-sm">{finalUser.bio}</p>

        <div className="mt-6 flex gap-4 justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
