import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import "./assets/css/style_dark.css";
import "./assets/css/metismenu.min.css";
// import "./assets/images/favicon.ico";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
