import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TonConnectUIProvider manifestUrl="https://classy-syrniki-47e640.netlify.app/manifest-my-app.json">
    <App />
    <ToastContainer position="top-center" />
  </TonConnectUIProvider>
);
