import React, { useState } from 'react'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
function Layout() {
  const [authType , setAuthType] = useState(null)
  return (
    <div>
      <Header setAuthType={setAuthType}/>
      {authType === "LogIn" && <Login setAuthType={setAuthType}/>}
      {authType === "SignUp" && <SignUp />}
      <Outlet />
    </div>
  )
}

export default Layout
