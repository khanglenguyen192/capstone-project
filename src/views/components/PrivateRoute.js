import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import MainLayout from "../main-layout/MainLayout";

const PrivateRoute = (props) => {
  console.log("PrivateRoute");
  const isLoggedIn = useSelector((state) => {
    console.log(state.AuthReducer);
    return state.AuthReducer.isLoggedIn;
  });

  return isLoggedIn ? (
    <Route element={<MainLayout />}>{props.children}</Route>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
