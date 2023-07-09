import React, { useState } from "react";
import userProfile from "../assets/user.png";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import loading from "../assets/loading.gif";
import bot from "../assets/system/bot.png";

const DashboardNavbar = () => {
  const [isProfile, setIsProfile] = useState(false);
  const { user, setToken, setUser } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClickLogout = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axiosClient
      .get("/logout")
      .then((Response) => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="homeShadow w-full bg-white py-2">
      <section className="relative container flex mx-auto items-center justify-between md:px-0 px-3">
        <Link to="/dashboard" className="flex items-center">
          <img src={bot} alt="bot" className="w-9 h-7" />
          <span  className="text-lg text-gray-700 font-semibold">
            My Bot Dashboard
          </span>
        </Link>

        <article className="hidden md:flex gap-4 items-center ">
          <div className="flex gap-4">
            <Link to="/about-us" className="hover:underline">
              About-us
            </Link>
            <Link to="/contact-us" className="hover:underline">
              Contact-us
            </Link>
            <Link to="docs" className="hover:underline">
              Docs
            </Link>
          </div>
          <button
            className="flex px-3 border rounded hover:border-gray-400 py-1 items-center gap-2"
            onClick={() => setIsProfile(!isProfile)}
          >
            <span>
              <img src={userProfile} alt="user_profile" className="w-6 h-6" />
            </span>

            {user ? (
              <span className="text-sm">{user.name}</span>
            ) : (
              <span className="text-sm">Loading...</span>
            )}

            {isProfile && (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </span>
            )}

            {!isProfile && (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            )}
          </button>
        </article>

        {/* Small screen view */}
        <article className="flex md:hidden">
          <button onClick={() => setIsProfile(!isProfile)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </article>

        {isProfile && (
          <article className="z-[24] p-1 px-2 space-y-2 homeShadow absolute bg-white border rounded w-7/12 md:w-3/12 right-0 top-9">
            <div className="text-lg font-semibold hover:underline hover:text-green-600">
              <Link>My Profile</Link>
            </div>

            <div className="">
              <Link to="/docs" className="hover:underline">
                Docs
              </Link>
            </div>

            <div className="md:hidden flex">
              <Link to="/about-us" className="hover:underline">
                About-us
              </Link>
            </div>
            <div className="md:hidden flex">
              <Link to="/contact-us" className="hover:underline">
                Contact-us
              </Link>
            </div>

            <form className=" pt-3 pb-2 flex justify-center">
              <button
                disabled={isLoading}
                onClick={handleOnClickLogout}
                className="disabled:cursor-not-allowed border w-full flex justify-center border-gray-300 hover:border-gray-400 rounded "
              >
                {isLoading ? (
                  <span>
                    <img src={loading} alt="loading gif" className="w-6 h-6" />
                  </span>
                ) : (
                  <span>Logout</span>
                )}
              </button>
            </form>
          </article>
        )}
      </section>
    </div>
  );
};

export default DashboardNavbar;
