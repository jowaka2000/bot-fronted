import React, { useState } from "react";
import { motion } from "framer-motion";

const Schedule = ({ dispatch, post }) => {
  const { id, schedule, messageContent, created_at, url, images } = post;
  const [isDeleteButton, setIsDeleteButton] = useState(false);

  return (
    <motion.article
      whileHover={{ scale: 1.04 }}
      className="relative shadow  p-1 space-y-2 rounded"
    >
      <div className="flex justify-end text-[10px] border-b py-[4px] items-center flex justify-between">
        <span className="font-semibold text-green-800">Run {schedule}</span>
        <span className="text-orange-900 font-semibold">{created_at}</span>
      </div>

      {images && images.length > 0 && <div>Images</div>}

      <div
        className={`${
          images && images.length > 0 ? "border-t" : ""
        } border-gray-300 w-full`}
      >
        <div className="font-semibold">
          Message Content ({messageContent ? messageContent.length : "0"})
        </div>

        {messageContent && messageContent.length > 0 ? (
          <>
            <div className="text-sm flex overflow-x-hidden w-full">
              {messageContent[0].length > 180
                ? messageContent[0].slice(0, 180) + "..."
                : messageContent[0]}
            </div>

            <button
            className="text-green-700 hover:underline text-sm"
              onClick={() =>
                dispatch({ type: "SHOW_EDIT_SCHEDULER", payLoad: post })
              }
            >
              View More...
            </button>
          </>
        ) : (
          <div className="flex w-full justify-center">Not Messages</div>
        )}

        {messageContent && messageContent.length > 1 && (
          <div className="py-2">
            <div className="text-sm overflow-x-hidden">
              {messageContent[1].length > 180
                ? messageContent[1].slice(0, 180) + "..."
                : messageContent[1]}
            </div>

            {messageContent.length > 2 && (
              <div className="flex text-sm justify-end text-green-700 hover:underline">
                <button
                  onClick={() =>
                    dispatch({ type: "SHOW_EDIT_SCHEDULER", payLoad: post })
                  }
                >
                  View More...
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-300">
        <div className="font-semibold">Ulr/link </div>
        <div className="text-sm overflow-x-hidden">{url}</div>
      </div>

      <div className="py-4"></div>
      <div className="w-full absolute bottom-0">
        <div className="relative flex text-xs justify-between border-t border-gray-300">
          <button>Active</button>

          <article className="flex items-center">
            <button
              onClick={() =>
                dispatch({ type: "SHOW_EDIT_SCHEDULER", payLoad: post })
              }
              className=""
              title="edit"
            >
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
      </div>
    </motion.article>
  );
};

export default Schedule;
