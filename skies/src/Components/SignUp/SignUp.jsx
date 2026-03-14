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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scaleIn">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-8 rounded-t-2xl relative">
          {/* button to cacel */}
          <button
            onClick={() => setAuthType(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <FaTimes className="text-white" />
          </button>

          {/* form data */}
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">Create Account</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* form data fields*/}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="px-8 py-6 space-y-4"
        >
          <div className="">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-500 outline-none"
              placeholder="full name"
            />
          </div>

          <div className="">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-500 outline-none"
              placeholder="user name"
            />
          </div>

          <div className="">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-500 outline-none"
              placeholder="email"
            />
          </div>

          <div className="">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-500 outline-none"
              placeholder="password"
            />
          </div>

          <div className="">
            <input
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="bg-gray-500 outline-none"
              placeholder="confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
