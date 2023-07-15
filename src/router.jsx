import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./views/Home/Home";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./views/Home/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ResetPassword from "./views/auth/ResetPassword";
import NotFound from "./views/error/NotFound";
import ShowApp from "./views/show/ShowApp";
import Index from "./views/documentation/Index";
import { ShowAppContext } from "./contexts/ShowAppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  //dashboard
  {
    path: "/dashboard",
    element: <HomeLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/apps/:bot_type/:id",
        element: (
          <ShowAppContext>
            <ShowApp />
          </ShowAppContext>
        ),
      },
      {
        path: "/dashboard/docs",
        element: <Index />,
      },
    ],
  },

  //authentication
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  //not found
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
