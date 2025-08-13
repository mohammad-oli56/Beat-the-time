import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
    const { signup, google } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

   const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, photo } = Object.fromEntries(formData.entries());

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        toast.error("Password must contain at least 6 characters, including uppercase, lowercase, and a number.");
        return;
    }

    try {
        // Step 1: Sign up with Firebase/AuthContext
        await signup(email, password);

        // Step 2: Save to MongoDB
        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                email,
                photo,
            }),
        });

        toast.success("Signed up successfully");
        navigate("/");
    } catch (error) {
        toast.error(error.message || "Signup failed");
    }
};

    const handleGoogle = () => {
        google()
            .then(() => {
                toast.success("Sign in with Google successful!");
                navigate("/");
            })
            .catch(() => toast.error("Google sign-in failed"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-center text-blue-700">
                    Create Your Account
                </h1>
                <p className="text-center text-gray-500 mt-2 text-sm">
                    Join us and start your journey today 🚀
                </p>

                {/* Form */}
                <form className="space-y-5 mt-8" onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-xl text-gray-500"
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                    </div>

                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL (optional)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-4 text-sm text-gray-500">or</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogle}
                    className="flex items-center justify-center w-full py-3 space-x-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>

                {/* Footer */}
                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
