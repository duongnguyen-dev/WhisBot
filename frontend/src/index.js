import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import stores from "./states/stores";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={stores}>
    <App />
  </Provider>
);
