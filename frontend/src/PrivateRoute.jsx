import React, { useEffect, useRef } from "react";
import LoadingPage from "./components/LoadingPage";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

const PrivateRoute = ({children}) => {
  const { user, loading, notify } = useAuth();
  const hasNotified = useRef(false);
  useEffect(() => {
    if (!loading && !hasNotified.current) {
      if (!user) {
        notify(
          "Please Log in to see your list of tourist spots...!!!",
          "warning"
        );
        hasNotified.current = true;
      } else {
        notify("Welcome to your list of tourist spots...!!!", "success");
        hasNotified.current = true;
      }
    }
  }, [user, loading, notify]);

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
