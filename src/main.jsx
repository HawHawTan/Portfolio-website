import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
  
import "./style/App.scss";
import { BrowserRouter } from "react-router-dom";
import { APP_FOLDER_NAME } from "./globals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={`/${APP_FOLDER_NAME}`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
