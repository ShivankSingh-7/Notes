import React, { useState } from "react";
import { useNote } from "../../Context/NoteContext";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"


function SignUp({ setAuthType }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn, setUserName, userName, setUser } = useNote();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confPassword || !userName) {
      setError("All fields are required");
      return
    } else {
      if (password !== confPassword) {
        setError("password and confirm password should be same");
        return
      } else {
        try {
          const response = await axios.post("http://localhost:8000/api/v1/register",{
            fullName,
            userName,
            email,
            password,
            confPassword
          })
          console.log(response.data)
          setIsLoggedIn(true)
          setUser(response.data.data.userName)
          navigate("/home")
          setAuthType(true)
        } catch (error) {
          setError(error.response?.data?.message || "signup failed")
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-scaleIn">

        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 px-8 py-10 relative">
          <button
            onClick={() => setAuthType(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <FaTimes className="text-white text-sm" />
          </button>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-1">
              <span className="text-2xl">✦</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-cyan-100 text-sm">Fill in the details to get started</p>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span className="text-red-400">⚠</span>
            {error}
          </div>
        )}

        {/* Form */}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="px-8 py-6 space-y-4"
        >
          <div className="group">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Full Name"
            />
          </div>

          <div className="group">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Username"
            />
          </div>

          <div className="group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Email Address"
            />
          </div>

          <div className="group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Password"
            />
          </div>

          <div className="group">
            <input
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition-all duration-200"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-200 active:scale-95 tracking-wide text-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;