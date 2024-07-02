import React, { useEffect, useState } from "react";
import solanaLogo from "../../public/images/solana.svg";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { fetchRecords, updateBalance } from "../api/airtable";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../api/firebase-config";

function Home() {
  const [records, setRecords] = useState([]);
  const [canGet, setCanGet] = useState(false);
  const [balance, setBalance] = useState(0);
  const [seconbalance, setSecondBalance] = useState(0);
  const [miningBalance, setMiningBalance] = useState(0.001);
  const [users, setUsers] = useState([]);
  const [difference, setDifference] = useState(null);
  const [amount, setAmount] = useState(0);
  const [address, setAddres] = useState("addres");
  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async (idX) => {
      const usersCollection = getDoc(doc(db, "users", idX));

      if ((await usersCollection).exists()) {
        const usersList = (await usersCollection).data();
        setUsers(usersList);
      } else {
        console.log("error");
      }
    };

    fetchUsers(id);
  }, []);


  useEffect(() => {
    users && setBalance(users.balance);
    setSecondBalance(users.seconbalance);
    const enddate = new Date().getTime();
    let differ = (enddate - users.date) / 1000;
    if (differ > 86400) {
      setCanGet(true);
    }
    setDifference(parseInt(differ));
  }, [users]);

  const handleUpdate = async (newBalance) => {
    const userRef = doc(db, "users", id);

    try {
      await updateDoc(userRef, {
        balance: newBalance,
      });

      console.log(`Hujjat muvaffaqiyatli yangilandi: ${id}`);
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik:", error);
    }
  };

  const dateUpdate = async () => {
    const userRef = doc(db, "users", id);

    try {
      await updateDoc(userRef, {
        date: new Date().getTime(),
      });
      setBalance(0);
      console.log(`Hujjat muvaffaqiyatli yangilandi: ${id}`);
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik:", error);
    }
  };

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

        <input type="checkbox" id="send_ton_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Withdrawal Toncoin!</h3>
            <p className="py-4 font-mono text-red-600">
              Please enter your web3 wallet address only, don't write the wallet
              of CEX exchanges. If you enter the wallet address of CEX
              exchanges, your money will be burned and will not be returned.
            </p>
            <label>
              <p className="text-cyan-500">Enter Your Wallet Address</p>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddres(e.target.value);
                }}
                placeholder="Toncoin address"
                className="input input-bordered input-info w-full max-w-xs mb-3"
              />
            </label>
            <label className="block mb-3">
              <div className="max-w- w-full flex justify-center gap-2 py-1 items-center ">
                <p className="text-cyan-500">Enter Amount</p>{" "}
                <img
                  className="block max-w-8 max-h-5"
                  src="../../public/images/solana.svg"
                />
              </div>
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  setAmount(e.target.value);
                }}
                value={amount}
                type="number"
                placeholder="Minimum amount 0.3 TON"
                className="input input-bordered input-info w-full max-w-xs"
              />
            </label>
            <label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (0.29 < Number(amount) && balance >= amount) {
                    setBalance((prev) => prev - amount);
                    console.log(balance);
                    handleUpdate(balance - amount);
                    setAmount(0);
                    setIsSending(true);
                    setAddres("");
                    setTimeout(() => {
                      setIsSending(false);
                    }, 3000);
                  }
                }}
                className="btn btn-wide bg-cyan-500 text-white"
              >
                Send
              </button>
            </label>
            <div className="modal-action">
              <label htmlFor="send_ton_modal" className="btn">
                Close!
              </label>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="send_ton_modal">
            Close
          </label>
        </div>

        <div className="navbar  bg-gray-600 text-cyan-500 font-medium px-5 rounded-xl mb-5">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <img
                className=""
                src="../../public/images/solana.svg"
                alt="Toncoi"
              />
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <p>Toncoin Balance</p>
            <p className="font-bold text-lg">{balance} TON</p>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost bg-white hover:bg-cyan-500 hover:text-white">
              <label className="font-bold " htmlFor="send_ton_modal">
                Send
              </label>
            </button>
          </div>
        </div>
        <div className="navbar bg-gray-600 text-cyan-500 font-medium px-5 rounded-xl ">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <img
                className=""
                src="../../public/images/solana.svg"
                alt="Toncoop"
              />
            </button>
          </div>
          <div className="flex-1 flex flex-col">
            <p>Toncoop Balance</p>
            <p className="font-bold text-xs">
              {seconbalance} = {seconbalance * 0.001} $
            </p>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost bg-white hover:bg-cyan-500 hover:text-white">
              <p className="font-bold ">Send</p>
            </button>
          </div>
        </div>
      </div>
      <div className="mb-28 mt-6 flex justify-center gap-7">
        <Link
          to={`/${id}`}
          className="btn btn-xs bg-slate-600 text-white sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-500"
        >
          Toncoin Mining
        </Link>
        <button
          className="btn btn-xs bg-slate-600 text-white sm:btn-sm md:btn-md lg:btn-lg hover:bg-cyan-500"
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
      <div>
        <div className="max-w-full mb-11">
          <div className=" max-w-96 m-0 h-72 flex justify-between mx-auto align-middle ">
            <img
              className="animate-bounce  hover:max-w-72 hover:h-60 hover:transition-all transition-all mx-auto"
              src="../../public/images/solana.svg"
              alt="Solana Mining"
            />
          </div>
          <h1 className="text-xl my-2 font-semibold">
            {canGet
              ? `Balance: ${miningBalance} SOL`
              : `You can get more Toncoin after ${parseInt(
                  (86400 - difference) / 3600
                )} hours`}
          </h1>
          <div className="flex max-w-full justify-center gap-7 text-white">
            {canGet ? (
              <h1
                onClick={async () => {
                  if (canGet) {
                    setBalance(balance + miningBalance);
                    handleUpdate();
                    dateUpdate();
                    setCanGet(false);
                  }
                }}
                className="max-w-16 rounded-md py-2 w-full bg-cyan-500 text-center hover:bg-slate-600 hover:text-red-50"
              >
                Claim
              </h1>
            ) : (
              <h1 className=" max-w-16 rounded-md py-2 w-full bg-gray-600 text-center hover:bg-slate-600 hover:text-red-50">
                Claim
              </h1>
            )}
            <Link className="max-w-16 rounded-md py-2 w-full bg-cyan-500 text-center hover:bg-slate-600 hover:text-red-50">
              Boost
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
