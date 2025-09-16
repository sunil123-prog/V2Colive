import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { loggedInUser } = useSelector((state) => state.auth);
  return loggedInUser ? children : <Navigate to="/login" />;
};
