import React from "react";
import {
  FaUser,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaLock,
  FaTimes,
} from "react-icons/fa";

function Login({setAuthType}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-cyan-700 h-1/2">
      <div className="text-right p-2 ">
        <button 
        onClick={()=>(setAuthType(false))}
        className="border-2 rounded-full p-1 cursor-pointer hover:scale-110 hover:text-gray-400 duration-200">
          <FaTimes />
        </button>
      </div>
        <div className="flex justify-center items-center ">
          <form className="px-5 py-10" action="submit">
            <div className="grid gap-5">
              <div className="bg-white text-black flex justify-center items-center px-2 py-2 ">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  className="outline-none"
                  type="text"
                  placeholder="user name"
                />
              </div>
              <div className="bg-white text-black flex justify-center items-center px-2 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  className="outline-none"
                  type="password"
                  placeholder="password"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="px-10 py-1 font-bold bg-cyan-600 shadow-md hover:scale-110 duration-200 cursor-pointer text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  Login
                </button>
              </div>
              <div className="flex gap-5 justify-center text-2xl">
                <FaFacebookF />
                <FaGoogle />
                <FaTwitter />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
