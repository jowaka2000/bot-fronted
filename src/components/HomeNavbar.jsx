import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bot from "../assets/system/bot.png";

const HomeNavbar = () => {
  const [isMenu, setIsMenu] = useState();

  return (
    <div className="fixed homeShadow w-full bg-white py-4 md:py-7 z-[100]">
      <section className="relative container flex mx-auto items-center justify-between md:px-0 px-3">
        <article>
          <Link
            to="/"
            className="text-xl md:text-2xl font-semibold flex items-center"
          >
            <span>
              <img src={bot} alt="bot" className="w-8 md:w-9" />
            </span>
            <span>Post Master</span>
          </Link>
        </article>

        <article className="hidden md:flex items-center gap-4">
          <div>
            <Link to='/about' className="hover:underline">About Us</Link>
          </div>
          <div>
            <Link className="hover:underline">Contact Us</Link>
          </div>
          <div>
            <Link to='/privacy-policy' className="hover:underline">Privacy Policy</Link>
          </div>
        </article>

        <article className=" flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex">
            <Link to="/dashboard" className="hover:underline">
              My Bots
            </Link>
          </div>

          <div className="hidden md:flex">
            <Link to="/docs" className="hover:underline">
              Docs
            </Link>
          </div>

          <div>
            <Link to="/login" className="">
              <motion.button
                whileHover={{ scale: 1.07 }}
                className="border border-green-600  rounded-lg px-2 md:px-3 py-1 shadow hover:bg-green-700 text-gray-800 font-bold hover:text-white"
              >
                Sign In
              </motion.button>
            </Link>
          </div>

          <div className="pt-2 block md:hidden">
            <button className="" onClick={()=>setIsMenu(!isMenu)}>
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
          </div>
        </article>

        {isMenu && (
          <div className="absolute block md:hidden homeShadow right-0 top-12 bg-white w-6/12 md:w-2/12 rounded-l px-3 space-y-2 p-2 rounded-b">
            <div>
              <Link to="/docs" className="hover:underline" onClick={()=>setIsMenu(false)}>
                Docs
              </Link>
            </div>
            <div>
              <Link to='/about' className="hover:underline" onClick={()=>setIsMenu(false)}>About Us</Link>
            </div>

            <div>
              <Link className="hover:underline" onClick={()=>setIsMenu(false)}>Contact Us</Link>
            </div>

            <div>
              <Link to="/login" className="hover:underline" onClick={()=>setIsMenu(false)}>
                Login
              </Link>
            </div>

            <div>
              <Link to="/register" className="hover:underline" onClick={()=>setIsMenu(false)}>
                Register
              </Link>
            </div>

            <div>
              <Link to='/privacy-policy' className="hover:underline">Privacy Policy</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeNavbar;
