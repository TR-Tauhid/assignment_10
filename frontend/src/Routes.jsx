import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/Root"; 


let router = createBrowserRouter([
  {
    path: "/",
    Component: <Root/>,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
