import { useEffect, useState } from "react";

import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import RooterLayout from "./layouts/RooterLayout";
import TapMine from "./pages/TapMine";
import { db } from "./api/firebase-config";
import { ref, set, onValue, get, child } from "firebase/database";
import { data } from "autoprefixer";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import Tapping from "./pages/Tapping";
function App() {
  const [id, setId] = useState("841886966");
  const [url, urlPhoto] = useState("");
  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    console.log(telegram);
    telegram.ready();
    if (telegram.initDataUnsafe) {
      const user = telegram.initDataUnsafe.user;
      setId(user.id);
      urlPhoto(user.photo_url);
    }
  }, []);
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RooterLayout />}>
          <Route index element={<Home id={id} url={url} />} />
        </Route>{" "}
        <Route path="/mining" element={<TapMine />} />
        <Route path="/tapping" element={<Tapping />} />
      </Route>
    )
  );
  return (
    <div className="p-0">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
