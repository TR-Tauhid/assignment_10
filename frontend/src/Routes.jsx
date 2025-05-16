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
import ViewDetails from "./components/ViewDetails";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: async () => {
      const res = await fetch("http://localhost:5000/allTouristSpot");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
    // errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "addTouristSpot",
        element: <AddTouristSpot />,
      },
      {
        path: "allTouristSpot",
        element: <AllTouristSpot />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/myList",
        loader: async () => {
          try {
            const res = await fetch(
              `http://localhost:5000/myList/`
            );
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({
                message: res.statusText || "Unknown server error",
              }));
              throw new Error(errorData.message || "Failed to fetch data");
            }
            return await res.json();
          } catch (error) {
            console.error("Error in viewDetails loader:", error);
            throw new Error(
              "Could not load tourist spot details: " + error.message
            );
          }
        },
        element: <MyList />,
      },
      {
        path: "/viewDetails/:id",
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `http://localhost:5000/viewDetails/${params.id}`
            );
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({
                message: res.statusText || "Unknown server error",
              }));
              throw new Error(errorData.message || "Failed to fetch data");
            }
            return await res.json();
          } catch (error) {
            console.error("Error in viewDetails loader:", error);
            throw new Error(
              "Could not load tourist spot details: " + error.message
            );
          }
        },
        element: <ViewDetails />,
      },
    ],
  },
]);

export default router;
