import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RooterLayout() {
  return (
    <div className="flex flex-col h-screen ">
      <main className="align-element flex-grow">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default RooterLayout;
