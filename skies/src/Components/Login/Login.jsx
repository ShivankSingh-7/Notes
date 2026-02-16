import React, { useState } from "react";
import {
  FaUser,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import { useNote } from "../../Context/NoteContext";
import { useNavigate } from "react-router-dom";

function Login({ setAuthType }) {
  const { userName, setUserName, isLoggedIn, setIsLoggedIn, setUser } =
    useNote();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!password.trim() || !userName.trim()) {
      setError("Please enter valid credentials");
      return;
    }

    setError("");
    setIsLoggedIn(true);
    setAuthType(null);
    setUser(userName);
    setUserName("");
    setPassword("");
    navigate("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-8 rounded-t-2xl relative">
          <button
            onClick={() => setAuthType(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <FaTimes className="text-white" />
          </button>
          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back
          </h2>
          <p className="text-cyan-100 text-center text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handlesubmit} className="px-8 py-6 space-y-4">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-cyan-500 transition-colors">
              <FaUser className="text-gray-400 mr-3" />
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Username"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-cyan-500 transition-colors">
              <FaLock className="text-gray-400 mr-3" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaFacebookF className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="text-gray-600" />
            </button>
            <button
              type="button"
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaTwitter className="text-gray-600" />
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 pt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setAuthType("SignUp")}
              className="text-cyan-600 font-semibold hover:text-cyan-700"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;