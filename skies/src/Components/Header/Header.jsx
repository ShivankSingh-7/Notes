import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Link, NavLink } from "react-router-dom";
import { useNote } from "../../Context/NoteContext";
import { useNavigate } from "react-router-dom";

function Header({ setAuthType }) {
  const { isLoggedIn, setIsLoggedIn,setInNote } = useNote();

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);

    navigate("/");
  };


  const handleCreate = () =>{
    setInNote(true);
    navigate("/note/new")
  }

  return (
    <div>
      <div className="shadow-md bg-white">
        <ul className="flex justify-between px-5 py-3 ">
          <div>
            <li className="text-2xl font-bold ">
              <NavLink to="/">Skies</NavLink>
            </li>
          </div>
          <div className=" flex gap-5 justify-center items-center">
            {isLoggedIn && (
              <li className="font-bold cursor-pointer">
                <NavLink to="home">Home</NavLink>
              </li>
            )}
            {isLoggedIn &&(
              <li className="font-bold cursor-pointer">
                <NavLink to="about">About</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li className="font-bold cursor-pointer" onClick={handleCreate}>Create</li>
            )}

            {isLoggedIn && (
              <li className="">
                {/* LogoOut Button */}
                <PrimaryButton onClick={() => handleLogOut()} text={"LogOut"} />
              </li>
            )}

            {!isLoggedIn && (
              <li className="">
                {/* PrimaryButton */}
                <PrimaryButton
                  onClick={() => setAuthType("LogIn")}
                  text={"LogIn"}
                />
              </li>
            )}
            {!isLoggedIn && (
              <li className="">
                {/* PrimaryButton */}
                <PrimaryButton
                  onClick={() => setAuthType("SignUp")}
                  text={"SignUp"}
                />
              </li>
            )}
            
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;
