// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";
let balanceUser = 0;
let ticketsUser = 0;
let userDatas = null;

export let friends = [];

const telegram = window.Telegram.WebApp;
telegram.ready();
export const user = telegram.inDitataUnsafe.user.id;

const getUserData = async () => {
  try {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      balanceUser = docSnap.data().balance;
      ticketsUser = docSnap.data().tickets;
      friends = docSnap.data().topFriends;
      userDatas = docSnap.data();
      return docSnap.data();
    } else {
      console.log("Eror");
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
};

const initialState = async () => {
  return {
    tickets: (await getUserData()) ? userDatas.ticketsUser : 0,
    balance: (await getUserData()) ? userDatas.balanceUser : 0,
    id: user,
  };
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
