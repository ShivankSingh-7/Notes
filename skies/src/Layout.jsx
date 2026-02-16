import React, { useState } from "react";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

function Layout() {
  const [authType, setAuthType] = useState(null);
  return (
    <div className="h-screen flex flex-col">
      <Header setAuthType={setAuthType} />

      {authType === "LogIn" && <Login setAuthType={setAuthType} />}
      {authType === "SignUp" && <SignUp />}

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;