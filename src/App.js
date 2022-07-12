import React from "react";
import Routers from "./routes.js";
import { BrowserRouter } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}