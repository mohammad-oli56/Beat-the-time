import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const { uselogin, google, handelForgetpass } = useContext(AuthContext);
    const [emailInput, setEmailInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/';

    // ✅ Google Login
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

                navigate(from);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Google sign-in failed.');
            });
    };

    // ✅ Email/Password Login
    const handellogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;



        // console.log(email,password)

        uselogin(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                toast.success('LogIn successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'colored',
                });

                navigate(from);
            })
            .catch((error) => {
                console.log(error.code, error.message);

                if (error.code === 'auth/wrong-password') {
                    toast.error('Wrong password. Please try again.', {
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'colored',
                    });
                } else if (error.code === 'auth/user-not-found') {
                    toast.error('User not found. Please sign up first.', {
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'colored',
                    });
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid email format.', {
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'colored',
                    });
                } else {
                    toast.error('Login failed. Check credentials.', {
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'colored',
                    });
                }
            });
    };

    // ✅ Forgot Password
    const handleForgotPassword = () => {
        if (!emailInput) {
            toast.error('Please enter your email first.', {
                position: 'top-right',
                autoClose: 4000,
                theme: 'colored',
            });
            return;
        }

        handelForgetpass(emailInput)
            .then(() => {
                toast.success('Password reset email sent!', {
                    position: 'top-right',
                    autoClose: 4000,
                    theme: 'colored',
                });
            })
            .catch((error) => {
                console.error("Reset error:", error);
                toast.error('Failed to send reset email.', {
                    position: 'top-right',
                    autoClose: 4000,
                    theme: 'colored',
                });
            });
    };

    return (
        <div className="w-full max-w-md p-8 mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-center text-blue-600">Log In</h1>

            <form onSubmit={handellogin} className="space-y-5 mt-6">
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
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
                    <div className="mt-1 text-right">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <p className="mx-4 text-sm text-gray-500">or log in with</p>
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
                Don't have an account?{" "}
                <Link to='/signup'>
                    <span className="font-semibold text-blue-600 hover:underline">
                        Sign up
                    </span>
                </Link>
            </p>
        </div>
    );
};

export default Login;
