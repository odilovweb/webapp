import { createSlice } from "@reduxjs/toolkit";
import { userDataBase } from "../pages/Home";

const initialState = {
  tickets: userDataBase ? userDataBase.tickets : 0,
  balance: userDataBase ? userDataBase.balance : 0,
};

const updateUserData = async (data) => {
  try {
    const docRef = await updateDoc(doc(db, "users", `${payload}`), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const comfySlice = createSlice({
  name: "miniapp",
  initialState,
  reducers: {
    minusTicket: (state) => {
      state.tickets--;
      userDataBase.tickets--;
      updateUserData(userDataBase);
    },
  },
});
export const { minusTicket } = comfySlice.actions;
export default comfySlice.reducer;
