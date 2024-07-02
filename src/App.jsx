import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import RooterLayout from "./layouts/RooterLayout";

function App() {
  const [count, setCount] = useState(0);
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RooterLayout />}>
          <Route index element={<RooterLayout />} />
          <Route path="id" />
          {/* <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} /> */}
        </Route>
      </Route>
    )
  );
  return (
    <div className="h-full">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
