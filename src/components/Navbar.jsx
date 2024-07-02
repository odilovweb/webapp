import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaHouse,
  FaWallet,
  FaRocket,
  FaListCheck,
  FaGem,
} from "react-icons/fa6";
// import { id } from "../pages/Home";
function Navbar() {
  const { id } = useParams();
  return (
    <nav className="bg-cyan-500 rounded-xl py-2 px-4">
      <div className="flex container  items-center justify-between">
        <Link
          to={`/${id}`}
          className="text-3xl  flex flex-col text-white hover:text-red-600"
        >
          <FaGem className="mx-auto" />
          <span className="text-xl font-bold">Mining</span>
        </Link>
        <Link className="text-3xl  flex flex-col  text-white hover:text-red-600">
          <FaRocket className="mx-auto" />
          <span className="text-xl font-bold">Boost</span>
        </Link>
        <Link className="text-3xl  flex flex-col  text-white hover:text-red-600">
          <FaListCheck className="mx-auto" />
          <span className="text-xl font-bold">Tasks</span>
        </Link>
        <Link className="text-3xl  flex flex-col  text-white hover:text-red-600">
          <FaWallet className="mx-auto" />
          <span className="text-xl font-bold">Wallet</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
