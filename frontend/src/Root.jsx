import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";

const Root = () => {
  return (
    <div className="flex flex-col h-full">
      <ToastContainer />
      <Navbar />
      <div className="flex justify-center items-center grow ">
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  );
};

export default Root;
