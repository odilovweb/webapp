import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import solana from "../assets/onedrop.png";
import musictap from "../../public/tapsound.mp3";
import { telegram } from "../App";

function TapMine() {
  const [isLoading, setIsLoading] = useState(true);
  const [active, isActive] = useState(true);
  const [userData, setUserData] = useState(null);
  const [point, setPoint] = useState(0);
  const [time, setTime] = useState(20);

  const tapSoundFunc = () => {
    const tapSound = new Audio(musictap);
    tapSound.play();
  };
  const getUserData = async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", `${id}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setIsLoading(false);
      } else {
        console.log("Eror");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const updateUserData = async (data, idX) => {
    try {
      const docRef = await updateDoc(doc(db, "users", `${idX}`), data);
      console.log("yangilandi");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    telegram.ready();

    if (telegram.initDataUnsafe) {
      getUserData(telegram.initDataUnsafe.user.id);
    }
  }, []);

  useEffect(() => {
    if (userData && userData.tickets > 0) {
      setTimeout(() => {
        isActive(false);
      }, 20000);

      const interval = setInterval(() => {
        setTime((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    if (!active && userData) {
      const newUserData = {
        ...userData,
        balance: userData.balance + point,
        tickets: userData.tickets - 1,
      };
      if (telegram.initDataUnsafe) {
        updateUserData(newUserData, telegram.initDataUnsafe.user.id);
      }
      console.log(newUserData);
    }
  }, [active]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-screen py-6 flex flex-col gap-48">
          <div>
            {active && (
              <h1 className="font-bold text-5xl text-cyan-600 flex flex-col">
                <span className="btn btn-outline btn-success">{point} </span>

                <span className="btn btn-outline btn-warning">
                  {`00 : ${time}`}
                </span>
              </h1>
            )}
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
              <div className=" container  items-center flex flex-col gap-3 ">
                <a
                  href={`https://t.me/share/url?url=https://t.me/OnedropMine_bot?start=${id}&text=
🎮Hey friend! Got ${point} ONDP ! Join me and try to top my score!`}
                  className="btn  btn-"
                >
                  Share your Win
                </a>
                <Link to="/" className="btn  btn-warning">
                  Back Home
                </Link>
              </div>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default TapMine;
