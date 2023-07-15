import React, { useState, useEffect, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import AddPostScheduler from "../../components/AddPostScheduler";
import axiosClient from "../../axiosClient";
import { motion } from "framer-motion";
import loading from "../../assets/loading.gif";
import FacebookPageDetails from "../../components/show-app/FacebookPageDetails";
import Switch from "react-switch";
import Schedulers from "../../components/Schedulers";
import TelegramDetails from "../../components/show-app/TelegramDetails";
import FacebookPosts from "../../components/posts/FacebookPosts";
import TelegramMessages from "../../components/posts/TelegramMessages";
import { useShowAppContext } from "../../contexts/ShowAppContext";
import { useStateContext } from "../../contexts/ContextProvider";
import ActivateTelegram from "../../components/ActivateTelegram";

const reducer = (state, action) => {
  if (action.type === "SET_IS_ACTIVE_BUTTON_LOADING") {
    return { ...state, isActiveButtonLoading: action.payLoad };
  }

  if (action.type === "SET_ACTIVATE_WINDOW") {
    return {
      ...state,
      isActivateComponent: action.payLoad,
      isActivateButton: !action.payLoad,
    };
  }
  if (action.type === "SET_ACTIVATE_COMPONENT") {
    return { ...state, isActivateComponent: action.payLoad };
  }

  throw new Error("Not Found!");
};

const defaultShowAppValues = {
  isActiveButtonLoading: false,
  isActivateComponent: false,
  isActivateButton: true,
};

const ShowApp = () => {
  const data = useParams();
  const [isAddPost, setIsAddPost] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultShowAppValues);
  const [isApproveAlert, setIsaApproveAlert] = useState(true);
  const [isAlertError, setIsAlertError] = useState(false);

  const { isAdmin } = useStateContext();
  const {
    handleSetApp,
    isAppActive,
    isLoading,
    app,
    isAppLoading,
    isAppApproved,
    isTelegramBotActivated,
  } = useShowAppContext();

  const id = data.id;

  useEffect(() => {
    handleSetApp(id);
  }, [id]);

  const handleSetIsAppActive = () => {
    dispatch({ type: "SET_IS_ACTIVE_BUTTON_LOADING", payLoad: true });

    //check few things

    if (!isAppApproved || !isTelegramBotActivated) {
      setIsaApproveAlert(true);
      dispatch({ type: "SET_IS_ACTIVE_BUTTON_LOADING", payLoad: false });
    } else {
      const payLoad = {
        active: !isAppActive,
      };

      axiosClient
        .post(`/user-apps/${id}/update`, payLoad)
        .then(({ data }) => {
          dispatch({ type: "SET_IS_ACTIVE_BUTTON_LOADING", payLoad: false });
          handleSetApp(id);
        })
        .catch((error) => {
          // console.log(error);
          dispatch({ type: "SET_IS_ACTIVE_BUTTON_LOADING", payLoad: false });
        });
    }
  };

  const handleOnApproveSubmit = (e) => {
    e.preventDefault();

    if (
      (app.bot_type === "telegram-group" ||
        app.bot_type === "telegram-channel") &&
      (app.telegram_bot_access_token === null ||
        app.telegram_bot_username === null)
    ) {
      setIsAlertError(true);
    } else if (app.bot_type === "facebook-page" || (app.access_token = null)) {
      setIsAlertError(true);
    } else {
      axiosClient
        .post(`/user-apps/${app.id}/update-app-approve`)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative container mx-auto md:px-0 px-2 pt-4 pb-28">
      {isAlertError && (
        <div className="absolute flex justify-center w-full">
          <article className="bg-red-400">
            Please include bot username and bot access token
          </article>
        </div>
      )}

      {isAppApproved && (
        <>
          {!isTelegramBotActivated &&
            state.isActivateButton &&
            !isAppLoading && (
              <div className="absolute flex justify-center w-[98%] z-[24]">
                <article className="homeShadow bg-white">
                  <div>
                    Congratulations, your Bot has been configured successfully!
                  </div>
                  <div>Click the button bellow to activate it</div>
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_ACTIVATE_WINDOW", payLoad: true })
                    }
                    className="bg-green-400"
                  >
                    Activate
                  </button>
                </article>
              </div>
            )}
        </>
      )}

      {isAppApproved && (
        <>
          {!isTelegramBotActivated && state.isActivateComponent && (
            <ActivateTelegram dispatch={dispatch} />
          )}
        </>
      )}

      {!isAppApproved && (
        <>
          {isApproveAlert && (
            <div className="absolute flex w-[95%] justify-center z-[30] pl-3 md:pl-0">
              <div className="w-full md:w-8/12 bg-yellow-500 text-red-800 space-y-3 pb-4">
                <div className="flex justify-end p-1">
                  <button
                    onClick={() => setIsaApproveAlert(false)}
                    className="border rounded border-yellow-500 hover:border-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-center text-lg font-semibold">Alert!</div>
                <div className="px-3">
                  <p className="text-center">
                    Your bot configuration is underway. Please note that it will
                    take less than 5 hours to complete the configuration. We
                    appreciate your patience and understanding during this time.
                    Once the configuration is complete, your bot will be ready
                    to assist you. If you have any questions or concerns, please
                    don't hesitate to reach out to our support team.
                    <span className="">
                      <i>Keep checking this page</i>
                    </span>
                  </p>
                </div>
                <div className="text-center ">
                  <Link to="/dashboard/docs" className="hover:underline">
                    You can click{" "}
                    <span className="text-green-900">
                      <i>here</i>
                    </span>{" "}
                    to read more...
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isAddPost && (
        <div className="absolute right-0 left-0 z-[28]  flex justify-center top-8">
          <AddPostScheduler setIsAddPost={setIsAddPost} />
        </div>
      )}

      {(isAddPost || state.isActivateComponent) && (
        <div className="absolute w-full h-full bg-gray-300 opacity-50 cursor-not-allowed z-[22]"></div>
      )}

      <article className="pb-4 flex justify-between">
        <div className="font-semibold text-base items-center md:text-lg text-gray-800 flex items-center gap-1 md:gap-2 px-1 md:px-0">
          <Link
            to="/dashboard"
            className="border border-gray-300 rounded px-1 py-[1px] hover:border-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <span>
            {isAppLoading
              ? "Loading........."
              : app && app.bot_name.toUpperCase()}
          </span>
        </div>

        <div className="relative flex items-center gap-1">
          {isAdmin && !isAppApproved && (
            <div>
              <form onSubmit={handleOnApproveSubmit}>
                <button
                  type="submit"
                  className="bg-green-600 px-2 text-white rounded hover:bg-green-700"
                >
                  Approved
                </button>
              </form>
            </div>
          )}
          {state.isActiveButtonLoading && (
            <img
              src={loading}
              alt="Loading"
              className="absolute w-5 h-5 right-14 z-[40]"
            />
          )}
          {isAppActive ? (
            <span className="text-xs">Turn off Posting</span>
          ) : (
            <span className="text-xs">Turn On Posting</span>
          )}

          <Switch
            disabled={state.isActiveButtonLoading}
            onChange={handleSetIsAppActive}
            checked={isAppActive ? isAppActive : false}
          />
        </div>
      </article>

      {data.bot_type === "facebook-page" && <FacebookPageDetails />}

      {(data.bot_type === "telegram-channel" ||
        data.bot_type === "telegram-group") && <TelegramDetails />}

      <div className="flex w-full justify-between pb-2 my-8 border-b border-gray-300 px-1 ">
        <article className="flex gap-5">
          <button
            onClick={() => setIsPosts(false)}
            className={`${
              !isPosts && "border-b-4"
            } border-gray-400 hover:text-gray-700`}
          >
            SCHEDULERS
          </button>
          <button
            onClick={() => setIsPosts(true)}
            className={`${
              isPosts && "border-b-4"
            } border-gray-400 hover:text-gray-700`}
          >
            {data.bot_type === "facebook-page" ? "FB POSTS" : "MESSAGES"}
          </button>
        </article>

        <article>
          {!isLoading && (
            <motion.button
              whileHover={{ scale: 1.07 }}
              onClick={() => setIsAddPost(!isAddPost)}
              className="shadow rounded bg-green-600 rounded-lg px-3 text-slate-900 font-semibold py-1 text-white"
            >
              Add Scheduler
            </motion.button>
          )}
        </article>
      </div>

      {isPosts ? (
        data.bot_type === "facebook-page" ? (
          <FacebookPosts />
        ) : data.bot_type === "telegram-channel" ||
          data.bot_type === "telegram-group" ? (
          <TelegramMessages />
        ) : (
          ""
        )
      ) : (
        <Schedulers setIsAddPost={setIsAddPost} />
      )}
    </div>
  );
};

export default ShowApp;
