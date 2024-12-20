import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { TonConnectButton } from "@tonconnect/ui-react";

import solana from ".././assets/onedrop.png";
import onedrop from ".././assets/onedrop.png";
import { db } from "../api/firebase-config";
import Loading from "./Loading";
import { telegram } from "../App";
import { FaTicket } from "react-icons/fa6";

function Home(props) {
  const [userData, setUserData] = useState(null);
  const [tgId, setTGId] = useState(null);
  const [tgName, setTgName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserData = async (userIds) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", `${userIds}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("Eror");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    telegram.ready();
    if (telegram.initDataUnsafe) {
      getUserData(telegram.initDataUnsafe.user.id);
    }
  }, []);
  console.log(userData);
  const [isActive, setActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  return (
    <div className="">
      {isLoading && <Loading />}
      <div className="">
        {isActive && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>Coming Soon</span>
            </div>
          </div>
        )}

        {isSending && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>sending was successful</span>
            </div>
          </div>
        )}

        <div className="navbar  bg-gray-600 text-cyan-500 font-medium px-5 rounded-xl mb-5 flex flex-col justify-center">
          <div className="flex justify-around ">
            {" "}
            <div className="flex-none">
              <button className="btn btn-square btn-ghost">
                <img className="rounded-full" src={onedrop} alt="Onedrop" />
              </button>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="font-bold text-lg">
                {userData && userData.balance} ONDP
              </p>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="font-bold text-lg">
                {userData && userData.tonBalance} TON
              </p>
            </div>
          </div>
          <div className="flex-none">
            <TonConnectButton />
          </div>
        </div>
      </div>
      <div className="my-6 flex justify-center gap-7 ">
        <Link
          to={`/`}
          className="btn btn-xs bg-slate-600 text-white sm:btn-sm md:btn-md lg:btn-lg active:bg-cyan-500"
        >
          ONDP Mining
        </Link>
        <button
          className="btn btn-xs bg-slate-600 text-white sm:btn-sm md:btn-md lg:btn-lg active:bg-cyan-500"
          onClick={() => {
            setActive(true);
            setTimeout(() => {
              setActive(false);
            }, 2000);
          }}
        >
          Ton Mining
        </button>
      </div>
      <div className="flex flex-col justify-between content-between ">
        <div className="w-full my-4">
          <img
            src={solana}
            alt="Image"
            className="w-56 h-56 mx-auto rounded-full"
          />
        </div>
        <nav className="bg-slate-600 rounded-xl px-4 py-5 mt-14 ">
          <div className="flex container  items-center justify-between mb-3">
            {userData && userData.tickets > 0 ? (
              <Link
                onClick={() => {}}
                to="/mining"
                className="btn btn-sm  btn-success bg-green-700"
              >
                Play for 1 Ticket
              </Link>
            ) : (
              <Link
                to="/friends"
                className="btn btn-sm  btn-success bg-green-700"
              >
                Play for 1 Ticket
              </Link>
            )}
            <h3 className="">
              Your Tickets: {userData && userData.tickets} <FaTicket />
            </h3>
          </div>
          <Link to="/friends" className="btn btn-sm btn-info">
            Get More Tickets
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Home;
