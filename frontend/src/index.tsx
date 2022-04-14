import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./style/app.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
