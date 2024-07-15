import { useState } from "react";

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

function App() {
  const [count, setCount] = useState(0);
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RooterLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/mining" element={<TapMine />} />
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
