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
        const form = e.target;
        const formData = new FormData(form);
        const { email, password } = Object.fromEntries(formData.entries());

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least 6 characters, including uppercase, lowercase, and a number.", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            });
            return;
        }

        signup(email, password)
            .then(() => {
                toast.success('Signed up successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    theme: "light",
                });
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message || "Signup failed");
            });
    };

    const handelgoogle = () => {
        google()
            .then((result) => {
                const user = result.user;
                console.log(user);

                toast.success('Sign in with Google successful!', {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'light',
                });

                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                toast.error("Google sign-in failed");
            });
    };

    return (
        <div className="w-full max-w-md p-8 mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-center text-blue-600">Sign Up</h1>

            <form className="space-y-5 mt-6" onSubmit={handleSignup}>
                <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>

                <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <p className="mx-4 text-sm text-gray-500">or sign up with</p>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handelgoogle}
                    className="flex items-center justify-center w-full py-3 space-x-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-gray-700">Continue with Google</span>
                </button>
            </div>

            <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link to='/login'>
                    <span className="font-semibold text-blue-600 hover:underline">
                        Log in
                    </span>
                </Link>
            </p>
        </div>
    );
};

export default Signup;
