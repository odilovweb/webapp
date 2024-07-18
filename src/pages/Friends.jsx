import React, { useEffect, useState } from "react";

import { FaCopy, FaPaperPlane, FaPlane } from "react-icons/fa";
import { FaPlaneArrival, FaPlaneUp } from "react-icons/fa6";
import toncoin from "../assets/toncoin.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
function Friends() {
  // const telegram = window.Telegram.WebApp;
  // telegram.ready();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getUserData = async (id) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", `${id}`);

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
    // if (telegram.initDataUnsafe) {
    getUserData("841886966");
    // }
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
      <div className="pt-8">
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
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Telegram Name</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {friends.map((user, i) => {
                  return (
                    <tr key={user.id}>
                      <th>{(i += 1)}</th>
                      <td>{user.id}</td>
                      <td className="max-w-11 max-h-9">
                        {user.name.toString().slice(0, 10)}...
                      </td>
                      <td>{user.time.toString().slice(0, 10)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h1>You don't have friends</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 absolute bottom-7 max-w-full w-full">
        <a
          href={`https://t.me/share/url?url=https://t.me/OnedropMine_bot?start=${id}&text=
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
              .writeText(`https://t.me/OnedropMine_bot?start=${id}`)
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
