import React, { useState } from 'react'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { Link, NavLink } from 'react-router-dom';

function Header({setAuthType}) {
    const [isLoggedIn, setIsLoggedIn] = useState()
  return (
    <div>
      <div className='shadow-md bg-white'>
        <ul className='flex justify-between p-3 m-2'>
            <div>
                <li className='text-2xl font-bold '>
                    <NavLink
                    to="/"
                    >
                        Skies
                    </NavLink>
                </li>
            </div>
            <div className=' flex gap-5 justify-center items-center'>
                <li className="font-bold cursor-pointer">
                    <NavLink
                    to="home"
                    >
                        Home
                    </NavLink>
                </li>
                <li className='font-bold cursor-pointer'>
                    <NavLink
                    to="about"
                    >
                        About
                    </NavLink>
                </li>
                <li className='font-bold cursor-pointer'>Create</li>
                <li className=''>
                    {/* PrimaryButton */}
                    <PrimaryButton 
                    onClick={()=>(setAuthType("LogIn"))}
                    text={"LogIn"}/>
                </li>
                <li className=''>
                    {/* PrimaryButton */}
                    <PrimaryButton 
                    onClick={()=>(setAuthType("SignUp"))}
                    text={"SignUp"}/>
                </li>
            </div>
            
        </ul>
      </div>
    </div>
  )
}

export default Header
