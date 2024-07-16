import React, { useEffect, useState } from "react";
import solana from ".././assets/solana.svg";
import { Link } from "react-router-dom";

function TapMine() {
  const [point, setPoint] = useState(0);
  const [active, isActive] = useState(true);
  const [time, setTime] = useState(20);
  useEffect(() => {
    setTimeout(() => {
      isActive(false);
    }, 20000);
  }, []);
  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTime((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className="h-screen py-6 flex flex-col gap-72">
      <div>
        <h1 className="font-bold text-5xl text-cyan-600 flex flex-col">
          <span>Your Points: {point} </span>
          <span>{active && `00 : ${time}`}</span>
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
            <btn
              className="btn btn-sm  btn-warning"
              onClick={() => {
                isActive(true);
                setTime(20);
                setPoint(0);
                setTimeout(() => {
                  isActive(false);
                }, 20000);
              }}
            >
              Play more for 1 Ticket
            </btn>
            <Link to="/" className="btn btn-sm btn-warning">
              Back Home
            </Link>
          </div>
          <h2 className="btn btn-sm btn-info">Get More Tickets</h2>
        </nav>
      )}
    </div>
  );
}

export default TapMine;
