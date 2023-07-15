import React, { useState } from "react";
import {motion} from 'framer-motion';
import AddApp from "../../components/AddApp";
import UserMediaBots from "../../components/UserMediaBots";

const Dashboard = () => {
  const [isAddAppForm,setIsAddAppForm]=useState(false);


  const handleOnClickAddAppBtn = ()=>{
    setIsAddAppForm(true);
  }

  const handleOnClickHideAddAppForm = ()=>{
    setIsAddAppForm(false);
  }

  return (
    <div className="relative w-full container mx-auto pt-10 pb-28">
      
      {
        isAddAppForm && <div className="absolute z-[10] bg-gray-300 opacity-75 w-full h-full"></div>
      }
      
      {
        isAddAppForm && <AddApp handleOnClickHideAddAppForm={handleOnClickHideAddAppForm} />
      }

      <div className="z-[1] flex w-full justify-between pb-2 border-b border-gray-300">
        <span className="text-lg font-semibold text-gray-700">MY BOTS </span>
        <motion.button onClick={handleOnClickAddAppBtn} whileHover={{scale:1.07}} className=" border px-3 font-semibold  rounded flex items-center text-white border-gray-400 hover:border-green-500 bg-green-600 hover:bg-green-700">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>

          <span>Add Bot</span>
        </motion.button>
      </div>

   
      <UserMediaBots setIsAddAppForm={setIsAddAppForm} />
    </div>
  );
};

export default Dashboard;
