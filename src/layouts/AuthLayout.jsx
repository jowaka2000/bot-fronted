import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const AuthLayout = () => {
  const { token } = useStateContext();


  //navigate to dashboard if token exists
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
