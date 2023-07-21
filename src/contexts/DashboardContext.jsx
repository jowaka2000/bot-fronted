import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axiosClient";

const StateContext = createContext({
    isLoading:true,
    apps:[],
    isAddAppForm:false,
    setIsAddAppForm:()=>{},
    loadApps:()=>{},
});

export const DashboardContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [isAddAppForm,setIsAddAppForm]=useState(false);


  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    axiosClient
      .get("/user-apps/index")
      .then(({ data }) => {
        setApps(data.apps);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  };
  return <StateContext.Provider value={{
    isLoading,
    apps,
    isAddAppForm,
    setIsAddAppForm,
    loadApps,
    setIsLoading,
    setApps,
  }}>{children}</StateContext.Provider>;
};

export const useDashboardContext = () => useContext(StateContext);
