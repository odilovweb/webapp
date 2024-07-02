import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function RooterLayout() {
  return (
    <div className="">
      <main className="align-element ">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default RooterLayout;
