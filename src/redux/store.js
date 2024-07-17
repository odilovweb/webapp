// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
let balanceUser = 0;
let ticketsUser = 0;
let userDatas = null;
export let userData = null;
export let friends = [];

const telegram = window.Telegram.WebApp;
telegram.ready();
const user = telegram.initDataUnsafe.user;

const getUserData = async () => {
  try {
    const docRef = doc(db, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      balanceUser = docSnap.data().balance;
      ticketsUser = docSnap.data().tickets;
      friends = docSnap.data().topFriends;
      userDatas = docSnap.data();
      userData = docSnap.data();
      return docSnap.data();
    } else {
      console.log("Eror");
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};
const getDatas = async () => {
  return await getUserData();
};
const initialState = {
  tickets: getDatas() ? ticketsUser : 0,
  balance: getDatas() ? balanceUser : 0,
};

const updateUserData = async (data) => {
  try {
    const docRef = await updateDoc(doc(db, "users", `${841886966}`), data);
    console.log("done");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Slice yaratish
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ticketMinus: (state) => {
      state.tickets--;
      userDatas.tickets--;
      updateUserData(userDatas);
    },
    plusBalance: (state, action) => {
      state.balance += action.payload;
      userDatas.balance += Number(action.payload);
      console.log(userDatas.balance, action.payload);
      console.log("ishladi");
      updateUserData(userDatas);
    },
  },
});

// Action'larni eksport qilish
export const { ticketMinus, plusBalance } = counterSlice.actions;

// Store'ni sozlash
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
