import React from "react";
import ReactDOM from "react-dom/client";
import App from "./weather"; // 👈 make sure the file name is App.js, not weather.js

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
