import React, { useEffect, useState } from "react";
import solanaLogo from "../../public/images/solana.svg";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import solana from ".././assets/solana.svg";
import { db } from "../api/firebase-config";

function Home(props) {
  console.log(props.id);
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState(null);
  const [tgId, setTGId] = useState(null);
  const [tgPhoto, setTgPhoto] = useState(null);
  const telegram = window.Telegram.WebApp;

  telegram.ready();

  const getUserData = async (userId) => {
    try {
      const docRef = doc(db, "users", `${userId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    if (telegram.initDataUnsafe) {
      const user = telegram.initDataUnsafe.user;
      getUserData(user.id);
      setTGId(user.id);
      setTgPhoto(user.photo_url);
    }

    console.log(userData);
  }, []);

  const { id } = useParams();

  const [isActive, setActive] = useState(false);
  const [isSending, setIsSending] = useState(false);
  return (
    <div className="">
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

        <div className="navbar  bg-gray-600 text-cyan-500 font-medium px-5 rounded-xl mb-5">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <img className="" src={tgPhoto} alt="Toncoin" />
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <p>ONDP Balance</p>
            <p className="font-bold text-lg">
              {userData && userData.balance} TON
            </p>
          </div>
          <div className="flex-1 flex flex-col">
            <p>{typeof tgId}</p>
            <p className="font-bold text-lg">
              {userData && userData.tonBalance} TON
            </p>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost bg-white hover:bg-cyan-500 hover:text-white">
              <btn
                className="font-bold"
                onClick={() => {
                  setActive(true);
                  setTimeout(() => {
                    setActive(false);
                  }, 2000);
                }}
              >
                Send
              </btn>
            </button>
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
          TonCoop Mining
        </button>
      </div>
      <div className="flex flex-col justify-between content-between gap-24">
        <div className="w-full my-4">
          <img src={solana} alt="Image" className="w-56 h-56 mx-auto" />
        </div>
        <nav className="bg-slate-600 rounded-xl px-4 py-5 ">
          <div className="flex container  items-center justify-between mb-3">
            <Link to="mining" className="btn btn-sm  btn-warning">
              Play for 1 Ticket
            </Link>
            <h3 className="btn btn-sm btn-warning">Your Tickets: 2</h3>
          </div>
          <h2 className="btn btn-sm btn-info">Get More Tickets</h2>
        </nav>
      </div>
    </div>
  );
}

export default Home;
