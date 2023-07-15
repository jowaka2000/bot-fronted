import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import DashboardNavbar from "../components/DashboardNavbar";
import axiosClient from "../axiosClient";

const HomeLayout = () => {
  const { token, setUser, setToken,setIsAdmin } = useStateContext();

  useEffect(() => {
    document.title = "Bot Dashboard";
  }, []);

  
  useEffect(() => {
    if (token) {
      axiosClient
        .get("/user")
        .then(({ data }) => {
          setUser(data.user);
          setIsAdmin(data.isAdmin);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, setUser,setIsAdmin]);

  if (!token) {
    localStorage.removeItem("ACCESS_TOKEN");
    setUser(null);
    setToken(null);
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
