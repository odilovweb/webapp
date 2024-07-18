import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaHouse,
  FaWallet,
  FaRocket,
  FaListCheck,
  FaGem,
  FaPerson,
  FaCoins,
  FaUser,
} from "react-icons/fa6";
// import { id } from "../pages/Home";
function Navbar() {
  return (
    <nav className="bg-cyan-500 rounded-xl py-2 px-4">
      <div className="flex container  items-center justify-between">
        <Link
          to={`/`}
          className="text-xl  flex flex-col text-white hover:text-red-600"
        >
          <FaGem className="mx-auto" />
          <span className="text-lg font-bold">Mining</span>
        </Link>
        <Link
          to="/friends"
          className="text-xl  flex flex-col  text-white hover:text-red-600"
        >
          <FaUser className="mx-auto" />
          <span className="text-lg font-bold">Friends</span>
        </Link>
        <Link
          to={"/tasks"}
          className="text-xl  flex flex-col  text-white hover:text-red-600"
        >
          <FaListCheck className="mx-auto" />
          <span className="text-lg font-bold">Tasks</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
