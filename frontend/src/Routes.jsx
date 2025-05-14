import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./components/Home";
import ErrorPage from "./ErrorPage";
import AddTouristSpot from "./components/AddTouristSpot";
import AllTouristSpot from "./components/AllTouristSpot";
import Login from "./components/Login";
import Register from "./components/Register";
import MyList from "./components/MyList";


let router = createBrowserRouter([
   {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "addTouristSpot",
        element: <AddTouristSpot/>,
      },
      {
        path: "allTouristSpot",
        element: <AllTouristSpot/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,
      },
      {
        path: "myList",
        element: <MyList/>,
      }
    ]
  },
]);

export default router;
