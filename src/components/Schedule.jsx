import React, { useState } from "react";
import {motion} from 'framer-motion';

const Schedule = ({ dispatch, post }) => {
  const { id, schedule, messageContent, created_at } = post;
  const [isDeleteButton, setIsDeleteButton] = useState(false);

  return (
    <motion.article whileHover={{scale:1.04}} className="shadow  p-1 space-y-2 rounded">
      <div className="flex justify-end text-[10px] border-b py-[4px] items-center flex justify-between">
        <span>1</span>
        <span className="text-gray-800 font-semibold">{created_at}</span>
      </div>
      <div>
        <div>Scheduler</div>
        <div className="text-sm">Run {schedule}</div>
      </div>

      <div>
        <div>Message Content ({messageContent.length})</div>
        <div className="text-sm">{messageContent[0]}</div>
      </div>

      <div>Likes Messages</div>

      <div className="relative flex text-xs justify-between border-t border-gray-300">
        <button>Publish</button>
        <button>Schedule</button>

        <article className="flex items-center">
          <button className="" title="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="currentColor"
              className="w-7 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button onClick={() => setIsDeleteButton(!isDeleteButton)}>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </article>

        {isDeleteButton && (
          <article className="absolute right-0 -top-7 shadow bg-white  flex justify-end px-2 py-1 rounded">
            <button
              onClick={() =>
                dispatch({ type: "SHOW_DELETE_ITEM_FORM", payLoad: id })
              }
              className="font-semibold text-red-600 text-[10px] hover:underline"
            >
              DELETE
            </button>
          </article>
        )}
      </div>
    </motion.article>
  );
};

export default Schedule;
