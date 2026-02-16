import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link, NavLink } from "react-router-dom";
import { useNote } from "../../Context/NoteContext";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiLogOut, FiHome, FiInfo } from "react-icons/fi";

function Header({ setAuthType }) {
  const { isLoggedIn, setIsLoggedIn, setInNote } = useNote();
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // Add scroll listener for header effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleCreate = () => {
    setInNote(true);
    navigate("/note/new");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <ul className="flex justify-between items-center">
          {/* Logo */}
          <li className="flex-shrink-0">
            <NavLink
              to="/"
              className="group flex items-center gap-2 text-2xl font-bold transition-all duration-300"
            >
              <div className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                  Skies
                </span>
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </div>
              {/* Optional logo icon */}
              <svg
                className="w-6 h-6 text-cyan-600 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </NavLink>
          </li>

          {/* Navigation Links */}
          <div className="flex gap-6 items-center">
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to="home"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-50 text-cyan-600 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                      }`
                    }
                  >
                    <FiHome className="w-4 h-4" />
                    <span>Home</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="about"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-50 text-cyan-600 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-cyan-600"
                      }`
                    }
                  >
                    <FiInfo className="w-4 h-4" />
                    <span>About</span>
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={handleCreate}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create</span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg border border-red-200 hover:border-red-300 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <FiLogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li>
                  <button
                    onClick={() => setAuthType("LogIn")}
                    className="px-6 py-2.5 text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Log In
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setAuthType("SignUp")}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>

      {/* Decorative bottom border */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
    </header>
  );
}

export default Header;