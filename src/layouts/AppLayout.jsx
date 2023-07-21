import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";

const AppLayout = () => {

 
  return (
    <div className="w-full">
      <HomeNavbar />

      <Outlet />

      <Footer/>
    </div>
  );
};

export default AppLayout;
