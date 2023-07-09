import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";

const AppLayout = () => {

 
  return (
    <div className="w-full">
      <HomeNavbar />

      <Outlet />
    </div>
  );
};

export default AppLayout;
