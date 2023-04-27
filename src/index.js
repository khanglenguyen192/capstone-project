import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./reducers/store";

import "./index.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";
import "./assets/css/style_dark.css";
import "./assets/css/metismenu.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
