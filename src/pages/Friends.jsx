import React, { useEffect, useState } from "react";

import { FaCopy, FaPaperPlane, FaPlane } from "react-icons/fa";
import { FaPlaneArrival, FaPlaneUp } from "react-icons/fa6";
import toncoin from "../assets/toncoin.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
import { telegram } from "../App";
function Friends() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const getUserData = async (Idx) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", `${Idx}`);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFriends(docSnap.data().topFriends);
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
      setUserId(telegram.initDataUnsafe.user.id);
      getUserData(telegram.initDataUnsafe.user.id);
    }
  }, []);

  const [isActive, setIsActive] = useState(false);
  return (
    <div className="h-full relative ">
      {isActive && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Text copied to clipboard!</span>
          </div>
        </div>
      )}
      <div className="pt-8 ">
        {friends.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-cyan-500 mb-3">
                Your Friends : {friends.length}
              </h1>
              <h1 className="text-lg font-bold text-red-500 flex gap-4 w-full justify-center">
                <span>Your Bonus ONDP : {friends.length * 250}</span>
                <span>Your Bonus TONCOIN : {friends.length * 0.001}</span>
              </h1>
              <h3 className="text-lg">
                <span>
                  {" "}
                  Invite your friends to this bot. You earn 250 ONDP , 1 ticket
                  and 0.001 Toncoin
                </span>{" "}
                <span>
                  {<img src={toncoin} className="inline-block max-w-4 w-4" />}
                </span>{" "}
                <span>for each friend</span>
              </h3>
            </div>
            <div className="flex flex-col h-96 overflow-x-auto">
              {friends &&
                friends.map((user, i) => {
                  return (
                    <div
                      className="bg-slate-600 rounded-xl flex justify-star gap-4 mb-2 "
                      key={user.name}
                    >
                      <p className="  text-xl flex items-center content-center align-middle">
                        {(i += 1)}
                      </p>
                      <h3 className="max-w-full">
                        {user.name.toString().slice(0, 15)}...
                      </h3>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>
            <h1>You don't have friends</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 absolute bottom-7 max-w-full w-full">
        <a
          href={`https://t.me/share/url?url=https://t.me/OnedropMine_bot?start=${userId}&text=
🎮Hey friend! Let’s play together and earn Toncoin for free!`}
          className="btn btn-outline btn-secondary"
        >
          <span>
            <FaPlaneUp />
          </span>
          <span>Share Invite Link</span>
        </a>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(`https://t.me/OnedropMine_bot?start=${userId}`)
              .then(() => {
                setIsActive(true);
                setTimeout(() => {
                  setIsActive(false);
                }, 2000);
              })
              .catch((err) => {
                console.error("Failed to copy text");
              });
          }}
          className="btn btn-secondary"
        >
          <span>
            <FaCopy />
          </span>{" "}
          <span>Copy Invite Link</span>
        </button>
      </div>
    </div>
  );
}

export default Friends;
