import React, { useReducer, useEffect } from "react";
import AddAppFirstPage from "./add-app/AddAppFirstPage";
import AddAppSecondPage from "./add-app/AddAppSecondPage";
import { useDashboardContext } from "../contexts/DashboardContext";

const reducer = (state, action) => {
  if (action.type === "CHANGE_BOT_TYPE") {
    return {
      ...state,
      botType: action.payLoad,
      botTitle: action.payLoad,
      botName: "",
      mediaName: "",
      pageID: "",
      userID: "",
      botNickname: "",
      channelLink: "",
      botUsername: "",
      botAccessToken: "",
      botLink: "",
      isLoading:false,
    };
  }
  if (action.type === "BOT_NAME_ON_CHANGE") {
    return { ...state, botName: action.payLoad };
  }
  if (action.type === "MEDIA_NAME_ON_CHANGE") {
    return { ...state, mediaName: action.payLoad };
  }
  if (action.type === "PAGE_ID_ON_CHANGE") {
    return { ...state, pageID: action.payLoad };
  }
  if (action.type === "USER_ID_ON_CHANGE") {
    return { ...state, userID: action.payLoad };
  }
  if (action.type === "BOT_NICKNAME_ID_ON_CHANGE") {
    return { ...state, botNickname: action.payLoad };
  }
  if (action.type === "CHANNEL_LINK_ON_CHANGE") {
    return { ...state, channelLink: action.payLoad };
  }
  if (action.type === "BOT_USERNAME_ON_CHANGE") {
    return { ...state, botUsername: action.payLoad };
  }
  if (action.type === "BOT_ACCESS_TOKEN_ON_CHANGE") {
    return { ...state, botAccessToken: action.payLoad };
  }
  if (action.type === "BOT_LINK_ON_CHANGE") {
    return { ...state, botLink: action.payLoad };
  }
  if (action.type === "SET_IS_LOADING") {
    return { ...state, isLoading: action.payLoad };
  }
  if (action.type === "SET_ERROR") {
    return {
      ...state,
      isError: true,
      errorMessage: action.payLoad,
      isLoading: false,
    };
  }
  if (action.type === "SET_ERROR_OFF") {
    return { ...state, isError: false };
  }
  if (action.type === "APP_ADDED") {
    return {
      ...state,
      isSuccessMessage: true,
      isError: false,
      botType: "facebook-page",
      botName: "",
      mediaName: "",
      pageID: "",
      userID: "",
      botNickname: "",
      channelLink: "",
      botUsername: "",
      botAccessToken: "",
      botLink: "",
      botTitle: "",
      isFirstPage: true,
    };
  }
  if (action.type === "REMOVE_SUCCESS_MESSAGE") {
    return { ...state, isSuccessMessage: false };
  }
  if (action.type === "MOVE_TO_SECOND_PAGE") {
    return { ...state, isFirstPage: false, botTitle: state.botType };
  }
  if (action.type === "MOVE_TO_FIRST_PAGE") {
    return { ...state, isFirstPage: true };
  }
  throw new Error("No command Found!");
};

const defaultAddAppValues = {
  botType: "facebook-page",
  botName: "",
  mediaName: "",
  pageID: "",
  userID: "",
  botNickname: "",
  channelLink: "",
  botUsername: "",
  botAccessToken: "",
  botLink: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccessMessage: false,
  isFirstPage: true,
  botTitle: "",
};

const AddApp = () => {
  const [state, dispatch] = useReducer(reducer, defaultAddAppValues);
  const {setIsAddAppForm,loadApps}=useDashboardContext();

  useEffect(() => {
    const intervals = setInterval(() => {
      if (state.isError) {
        dispatch({ type: "SET_ERROR_OFF" });
      }

      if (state.isSuccessMessage) {
        dispatch({ type: "REMOVE_SUCCESS_MESSAGE" });
      }
    }, 6000);

    return () => clearInterval(intervals);
  });

  return (
    <div className="z-[20] absolute w-full flex justify-center top-4">
      <article className="relative homeShadow w-11/12 md:w-6/12 bg-white p-2">
        {state.isError && (
          <div className="absolute w-[96%] top-8 bg-red-600 flex justify-center text-white">
            {state.errorMessage}
          </div>
        )}

        {state.isSuccessMessage && (
          <div className="absolute w-[96%] top-8 bg-green-600 flex justify-center text-white">
            Bot has Been Added Successfully!
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={()=>{setIsAddAppForm(false);loadApps()}}
            className="hover:text-red-800 border px-1 rounded hover:border-red-400"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <article className="flex w-full justify-center text-xl font-semibold text-gray-800">
          {state.botTitle === ""
            ? "ADD BOT"
            : state.botTitle.toUpperCase() + " BOT"}
        </article>

        {state.isFirstPage ? (
          <AddAppFirstPage state={state} dispatch={dispatch} />
        ) : (
          <AddAppSecondPage state={state} dispatch={dispatch} />
        )}
      </article>
    </div>
  );
};

export default AddApp;
