import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const HomeNavbar = () => {
  return (
    <div className="homeShadow w-full bg-white py-7">
      <section className="container flex mx-auto items-center justify-between md:px-0 px-3">
        <article>Media Bot</article>

        <article>
          <Link to="/login" className="">
            <motion.button
              whileHover={{ scale: 1.07 }}
              className="border border-green-600  rounded-lg px-3 py-1 shadow hover:bg-green-700 text-gray-800 font-bold hover:text-white"
            >
              Sign In
            </motion.button>
          </Link>
        </article>
      </section>
    </div>
  );
};

export default HomeNavbar;
