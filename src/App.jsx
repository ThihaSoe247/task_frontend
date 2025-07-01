import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="p-5 bg-gray-400">
        <Outlet />
      </div>
    </>
  );
}

export default App;
