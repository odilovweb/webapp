import React, { useEffect, useState } from "react";
import solana from ".././assets/solana.svg";
import { Link } from "react-router-dom";

function TapMine() {
  const [point, setPoint] = useState(0);
  const [active, isActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      isActive(false);
    }, 20000);
  }, []);
  return (
    <div className="h-screen py-6 flex flex-col gap-72">
      <div>
        <h1 className="font-bold text-5xl text-cyan-600">
          Your Point: {point}{" "}
        </h1>
      </div>
      {active ? (
        <div className="h-44 max-w-full">
          <img
            className="w-72 animate-spin mx-auto active:w-60 transition-all active:transition-all"
            src={solana}
            onClick={() => {
              setPoint((prev) => prev + 1);
            }}
          />
        </div>
      ) : (
        <nav className="bg-slate-600 rounded-xl px-4 py-5 ">
          <div className="flex container  items-center justify-between mb-3">
            <Link to="mining" className="btn btn-sm  btn-warning">
              Play for 1 Ticket
            </Link>
            <h3 className="btn btn-sm btn-warning">Your Tickets: 2</h3>
          </div>
          <h2 className="btn btn-sm btn-info">Get More Tickets</h2>
        </nav>
      )}
    </div>
  );
}

export default TapMine;
