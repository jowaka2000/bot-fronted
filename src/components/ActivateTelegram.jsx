import React, { useState, useEffect } from "react";
import { useShowAppContext } from "../contexts/ShowAppContext";
import axiosClient from "../axiosClient";
import { motion } from "framer-motion";

const ActivateTelegram = ({dispatch}) => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { app } = useShowAppContext();
  const [updates, setUpdates] = useState([]);
  const [update, setUpdate] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [indexChecked, setIndexChecked] = useState(null);

  useEffect(() => {
    if (app.id) {
      axiosClient
        .get(`/telegram/get-channels/${app.id}`)
        .then(({ data }) => {
          //   console.log(data.updates);
          setUpdates(data.updates);
          setIsDataLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsDataLoading(false);
        });
    }
  }, [app]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if(!update.update_id){
      console.log('empty')
    }else{
  

      let chat_id=0;

      if(update.message){
        chat_id=update.message.chat.id;
      }else{
        chat_id=update.my_chat_member.chat.id;
      }

      const payLoad = {
        appId:app.id,
        chatId:chat_id,
      }

      axiosClient.post(`/telegram/set-chat-id/${app.id}`,payLoad)
      .then((response)=>{
        dispatch({type:'SET_ACTIVATE_COMPONENT',payLoad:false});
      })
      .catch((error)=>{console.log(error)});

      console.log(payLoad);

    }

  };

  return (
    <form onSubmit={handleFormSubmit} className="absolute w-[98%] flex justify-center top-20">
      {isFirstPage && (
        <article className="w-11/12 md:w-7/12 shadow bg-white z-[24] p-1">
          <div className="flex justify-end">
            <button onClick={()=>dispatch({type:'SET_ACTIVATE_COMPONENT',payLoad:false})} >
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

          <div>
            To activate the Bot, please follow these simple steps. Open the
            Telegram app and navigate to the desired Telegram channel or group
            where you want to include the bot. Click on the "Add Users" option
            and search for{" "}
            <span className="font-bold">@{app.telegram_bot_username}</span>{" "}
            which have a nickname of{" "}
            <span className="font-bold">{app.bot_nickname}</span>. Once you find
            the bot's username, click on it. Then, click on "Users" and select
            the bot and <span className="font-bold">making it an admin</span> if
            the group or channel does not allow everyone to post. After
            completing these steps , you will find a list of channels or groups
            in the next page. From there, choose the channel or group you want
            the bot to be active in.
            <span>
              Note that the group or channel must have at least one chat
              (message){" "}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsFirstPage(false)}
              className="bg-green-400"
            >
              Next
            </button>
          </div>
        </article>
      )}

      {!isFirstPage && (
        <div className="w-11/12 md:w-7/12 shadow bg-white z-[24] p-1">
          <div className="flex justify-end">
            <button>x</button>
          </div>
          <div>Choose Channel/group</div>
          <div>list of channles</div>

          {isDataLoading && (
            <div className="flex justify-center text-center">Loading</div>
          )}

          {!isDataLoading && (
            <div className="space-y-3 px-2 md:px-4">
              {updates.map((update, index) => {
                const { my_chat_member, message } = update;

                return (
                  <motion.article
                    whileHover={{ scale: 1.03 }}
                    whileInView={
                      indexChecked === index ? { scale: 1.03 } : { scale: 1 }
                    }
                    key={
                      my_chat_member
                        ? my_chat_member.chat.id
                        : message
                        ? message.chat.title
                        : 0
                    }
                    className={`${
                      indexChecked === index ? "border-2 border-green-400" : ""
                    } homeShadow text-gray-800 p-2`}
                  >
                    <label htmlFor={index}>
                      {my_chat_member && (
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

                      {message && (
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

          <div className="flex items-center justify-between pt-10 pb-2 ">
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
              <span className="text-lg">PREVIOUS</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              type="submit"
              className="disabled:cursor-not-allowed disabled:bg-opacity-75 px-4 bg-green-600 hover:bg-green-700 flex justify-center text-white font-semibold rounded py-1 basis-1/2"
            >
              <span>Submit</span>
            </motion.button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ActivateTelegram;
