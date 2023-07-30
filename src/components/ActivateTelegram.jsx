import React, { useState, useEffect } from "react";
import { useShowAppContext } from "../contexts/ShowAppContext";
import axiosClient from "../axiosClient";
import { motion } from "framer-motion";
// import loading from "../assets/loading.gif";

const ActivateTelegram = ({ dispatch }) => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { app } = useShowAppContext();
  const [updates, setUpdates] = useState([]);
  const [update, setUpdate] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [indexChecked, setIndexChecked] = useState(null);

  useEffect(() => {
    if (app.id) {
      getTelegramUpdates(app);
    }
  }, [app]);

  const getTelegramUpdates = (app) => {
    axiosClient
      .get(`/telegram/get-channels/${app.id}`)
      .then((response) => {
        if (response.status === 299) {
          setIsDataLoading(false);
        } else {
          setIsDataLoading(false);
          setUpdates(response.data.updates);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsDataLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!update.update_id) {
      console.log("empty");
    } else {
      let chat_id = 0;

      if (update.message) {
        chat_id = update.message.chat.id;
      } else {
        chat_id = update.my_chat_member.chat.id;
      }

      const payLoad = {
        appId: app.id,
        chatId: chat_id,
      };

      axiosClient
        .post(`/telegram/set-chat-id/${app.id}`, payLoad)
        .then((response) => {
          dispatch({ type: "SET_ACTIVATE_COMPONENT", payLoad: false });
          dispatch({type:'ACTIVATED_MESSAGE',payLoad:true});
        })
        .catch((error) => {
          // console.log(error);
        });

    }
  };

  const handleRefreshOnClick = () => {
    getTelegramUpdates(app);
  };

  return (
    <motion.form
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleFormSubmit}
      className="absolute w-[98%] flex justify-center top-16"
    >
      {isFirstPage && (
        <article className="w-full md:w-7/12 shadow bg-white z-[24] p-1 px-3 space-y-3 px-2">
          <div className="flex justify-end pt-2">
            <button
              onClick={() =>
                dispatch({ type: "SET_ACTIVATE_COMPONENT", payLoad: false })
              }
              className="border border-white hover:border-red-300 rounded"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 text-lg">
            To activate the Bot, please follow these simple steps. Open the
            Telegram app and navigate to the desired Telegram channel or group
            where you want to include the bot. Click on the "Add Users" option
            and search for{" "}
            <span className="font-bold">@{app.telegram_bot_username}</span> with
            a name <span className="font-bold">{app.bot_nickname}</span>. Add
            the Bot to the group/channel and{" "}
            <span className="font-bold">make it admin</span> if the
            group/channel does not allow everyone to post. After completing
            these steps , you will find the of channel/group you have added the
            Bot in the next page. From there, you can select the channel/group
            activating it.
            <span>
              Note that the group/channel must have at least one Message(Chat)
              in it.{" "}
            </span>
          </div>

          <div className="flex justify-end py-4">
            <button
              onClick={() => setIsFirstPage(false)}
              className="bg-green-500 text-white hover:bg-green-600 text-lg font-semibold px-4 py-1 basis-2/5"
            >
              Next
            </button>
          </div>
        </article>
      )}

      {!isFirstPage && (
        <div className="w-full px-2 md:w-7/12 shadow bg-white z-[24] p-1">
          <div className="flex justify-end">
            <button
              onClick={() =>
                dispatch({ type: "SET_ACTIVATE_COMPONENT", payLoad: false })
              }
              type="button"
              className="border border-white hover:border-red-300 rounded"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 flex justify-center text-xl font-semibold">
            Select Your Channel/Group
          </div>

          {isDataLoading && (
            <div className="flex justify-center text-center">Loading</div>
          )}

          {!isDataLoading && (updates && updates.length) === 0 && (
            <div className="pt-8 space-y-3">
              <div className="flex text-center text-sm px-8 text-yellow-900">
                Make sure the channel/group has least 1 message. Also make sure
                you have made the bot admin if everyone is not allowed to post
                on the channel/group.{" "}
              </div>

              <div className="flex justify-center">
                <button
                  className="flex items-center gap-1 relative"
                  type="button"
                  onClick={handleRefreshOnClick}
                >
                  {/* <img src={loading} alt="loading" className="absolute left-8 w-6 h-6 " /> */}
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          )}

          {!isDataLoading && (
            <div className="space-y-3 px-2 md:px-4">
              {updates.map((update, index) => {
                const { update_id, my_chat_member, message } = update;

                return (
                  <motion.article
                    whileHover={{ scale: 1.03 }}
                    whileInView={
                      indexChecked === index ? { scale: 1.03 } : { scale: 1 }
                    }
                    key={update_id}
                    className={`${
                      indexChecked === index ? "border-2 border-green-400" : ""
                    } homeShadow text-gray-800 p-2`}
                  >
                    <label htmlFor={index}>
                      {my_chat_member &&
                        my_chat_member.chat.type !== "private" && (
                          <div className="flex justify-between">
                            <div className="space-y-2">
                              <div>
                                <span className="font-semibold">Name: </span>
                                <span>{my_chat_member.chat.title}</span>
                              </div>
                              <div>
                                <span className="font-semibold">Type: </span>{" "}
                                <span>{my_chat_member.chat.type}</span>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <input
                                name="update"
                                type="radio"
                                id={index}
                                value={my_chat_member.chat.id}
                                onClick={() => {
                                  setUpdate(update);
                                  setIndexChecked(index);
                                }}
                                className="px-2 bg-green-600 text-white hover:bg-green-700 rounded-lg py-[2px]"
                              />
                            </div>
                          </div>
                        )}

                      {message && message.chat.type !== "private" && (
                        <div className="flex justify-between">
                          <div>
                            <div>
                              <span className="font-semibold">Name: </span>{" "}
                              <span>{message.chat.title}</span>
                            </div>
                            <div>
                              <span className="font-semibold">Type: </span>{" "}
                              <span>{message.chat.type}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              name="update"
                              type="radio"
                              id={index}
                              value={message.chat.id}
                              onClick={() => {
                                setUpdate(update);
                                setIndexChecked(index);
                              }}
                              className="px-2 bg-green-600 text-white hover:bg-green-700 rounded-lg py-[2px]"
                            />
                          </div>
                        </div>
                      )}
                    </label>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between pt-10 pb-2 px-0 md:px-2">
            <button
              type="button"
              className="flex items-center text-gray-700 hover:underline hover:text-gray-900"
              onClick={() => setIsFirstPage(true)}
            >
              <span>
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
              <span className="text-base md:text-lg">PREVIOUS</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              type="submit"
              disabled={(updates && (updates.length === 0)) || isDataLoading}
              className="disabled:cursor-not-allowed disabled:bg-opacity-75 px-4 bg-green-600 hover:bg-green-700 flex justify-center text-white font-semibold rounded py-1 basis-1/2"
            >
              <span>ACTIVATE</span>
            </motion.button>
          </div>
        </div>
      )}
    </motion.form>
  );
};

export default ActivateTelegram;
