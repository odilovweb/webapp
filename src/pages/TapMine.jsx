import React, { useEffect, useState } from "react";
import solana from "../assets/onedrop.png";
import { Link } from "react-router-dom";
import musictap from "../../public/tapsound.mp3";
import { useDispatch, useSelector } from "react-redux";
import { ticketMinus, plusBalance } from "../redux/store";
function TapMine() {
  const [point, setPoint] = useState(0);
  const [active, isActive] = useState(false);
  const [time, setTime] = useState(20);
  // const tickets = useSelector((state) => state.tickets);
  // const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();
  const { tickets, balance } = useSelector((state) => state.counter);
  const addBalance = () => {
    dispatch(plusBalance(point));
  };

  useEffect(() => {
    if (tickets > 0) {
      isActive(true);
      dispatch(ticketMinus());
      setTimeout(() => {
        isActive(false);
      }, 20000);
    }
  }, []);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setTime((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      addBalance();
    }
  }, [active]);

  const tapSoundFunc = () => {
    const tapSound = new Audio(musictap);
    tapSound.play();
  };

  return (
    <div className="h-screen py-6 flex flex-col gap-48">
      <div>
        <h1 className="font-bold text-5xl text-cyan-600 flex flex-col">
          <span>Your Points: {point} </span>
          {active && (
            <span className="btn btn-outline btn-warning">
              {`00 : ${time}`}
            </span>
          )}
        </h1>
      </div>
      {active ? (
        <div className="h-44 max-w-full">
          <img
            className="w-72 animate-spin mx-auto active:w-60 transition-all active:transition-all rounded-full"
            src={solana && solana}
            onClick={() => {
              tapSoundFunc();
              setPoint((prev) => prev + 1);
            }}
          />
        </div>
      ) : (
        <nav className="bg-slate-600 rounded-xl px-4 py-5 ">
          <button className="btn btn-info max-w-full mx-auto">
            Your Tickets {tickets}
          </button>
          <div className="flex container  items-center justify-between mb-3">
            {tickets && tickets > 0 ? (
              <button
                className="btn btn-sm  btn-warning"
                onClick={() => {
                  dispatch(ticketMinus());
                  isActive(true);
                  setTime(20);
                  setPoint(0);
                  setTimeout(() => {
                    isActive(false);
                  }, 20000);
                }}
              >
                Play more for 1 Ticket
              </button>
            ) : (
              <Link className="btn btn-sm btn-info" to="/friends">
                You don't have any tickets
              </Link>
            )}
            <Link to="/" className="btn btn-sm btn-warning">
              Back Home
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

export default TapMine;
