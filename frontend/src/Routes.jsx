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
import PrivateRoute from "./PrivateRoute";
import CountryModify from "./components/CountryModify";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        loader: async () => {
          try {
            const res = await fetch("https://cholo-backend.vercel.app/countries", {
              method: "GET",
            });
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
        element: <Home />,
      },
      {
        path: "addTouristSpot",
        element: (
          <PrivateRoute>
            <AddTouristSpot />
          </PrivateRoute>
        ),
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
            const res = await fetch(`https://cholo-backend.vercel.app/myList/`);
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
        element: (
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        ),
      },
      {
        path: "/viewDetails/:id",
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `https://cholo-backend.vercel.app/viewDetails/${params.id}`
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
      {
        path: "/countries",
        loader: async () => {
          try {
            const res = await fetch(`https://cholo-backend.vercel.app/countries/`);
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({
                message: res.statusText || "Unknown server error",
              }));
              throw new Error(errorData.message || "Failed to fetch data");
            }
            return await res.json();
          } catch (error) {
            console.error("Error in loader:", error);
            throw new Error(
              "Could not load countries spot details: " + error.message
            );
          }
        },
        element: (
          <PrivateRoute>
            <CountryModify />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
