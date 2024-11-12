import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Background from "./utilities/3DBackground";
import ScrollToTop from "./utilities/ScrollToTop";
  
import "./style/App.scss";
import { BrowserRouter } from "react-router-dom";
import { APP_FOLDER_NAME } from "./globals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter basename={`/${APP_FOLDER_NAME}`}> */}
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
