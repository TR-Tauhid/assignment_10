import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
