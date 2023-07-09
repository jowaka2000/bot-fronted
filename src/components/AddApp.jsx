import React, { useReducer, useEffect } from "react";
import { motion } from "framer-motion";
import loading from "../assets/loading.gif";
import axiosClient from "../axiosClient";

const reducer = (state, action) => {
  if (action.type === "CHANGE_BOT_TYPE") {
    return { ...state, botType: action.payLoad };
  }
  if (action.type === "APP_NAME_ON_CHANGE") {
    return { ...state, appName: action.payLoad };
  }
  if (action.type === "PAGE_NAME_ON_CHANGE") {
    return { ...state, pageName: action.payLoad };
  }
  if (action.type === "PAGE_ID_ON_CHANGE") {
    return { ...state, pageID: action.payLoad };
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
      botType:"facebook-page",
      appName: "",
      pageName: "",
      pageID: "",
    };
  }

  if (action.type === "REMOVE_SUCCESS_MESSAGE") {
    return { ...state, isSuccessMessage: false };
  }
  throw new Error("No command Found!");
};

const defaultAddAppValues = {
  botType: "facebook-page",
  appName: "",
  pageName: "",
  pageID: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
  isSuccessMessage: false,
};

const AddApp = ({ handleOnClickHideAddAppForm }) => {
  const [state, dispatch] = useReducer(reducer, defaultAddAppValues);

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

  const handleOnAddAppFormSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_IS_LOADING", payLoad: true });

    if (
      state.pageName === "" ||
      state.pageID === "" ||
      state.appName === "" ||
      state.botType === ""
    ) {
      dispatch({ type: "SET_ERROR", payLoad: "All fields are required!" });
    } else {
      const payLoad = {
        botType: state.botType,
        appName: state.appName,
        pageName: state.pageName,
        pageID: state.pageID,
      };

      axiosClient
        .post("/user-apps/create", payLoad)
        .then(({ data }) => {
          dispatch({ type: "APP_ADDED" });
          dispatch({ type: "SET_IS_LOADING", payLoad: false });
        })
        .catch((error) => {
          const { response } = error;

          if (response && response.status === 422) {
            dispatch({
              type: "SET_ERROR",
              payLoad: response.data.message,
            });
          }

          dispatch({ type: "SET_IS_LOADING", payLoad: false });
        });
    }
  };


  return (
    <div className="z-[20] absolute w-full flex justify-center top-4">
      <article className="relative homeShadow w-11/12 md:w-7/12 bg-white p-2">
        {state.isError && (
          <div className="absolute w-[96%] top-8 bg-red-600 flex justify-center text-white">
            {state.errorMessage}
          </div>
        )}

        {state.isSuccessMessage && (
          <div className="absolute w-[96%] top-8 bg-green-600 flex justify-center text-white">
            App has Been Added Successfully!
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleOnClickHideAddAppForm}
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
        <form className="px-4 space-y-2" onSubmit={handleOnAddAppFormSubmit}>
          <article className="flex w-full justify-center text-lg font-semibold text-gray-800">
            Add App
          </article>
          <article>
            <label>Select Bot Type</label>
            <select
              defaultValue={state.botType}
              onChange={(e) =>
                dispatch({ type: "CHANGE_BOT_TYPE", payLoad: e.target.value })
              }
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            >
              <option value="facebook-page">Facebook Page Bot</option>
              <option value="facebook-group">Facebook Group Bot</option>
              <option value="facebook-user">Facebook Own Profile Bot</option>
              <option value="telegram">Telegram</option>
              <option value="twitter">Twitter</option>
            </select>
          </article>

          <article>
            <label>App Name</label>
            <input
              type="text"
              placeholder="Give your App a Name"
              value={state.appName}
              onChange={(e) =>
                dispatch({
                  type: "APP_NAME_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>

          <article>
            <label>
              {state.botType === "facebook-page" ? "Page " : "Group"} Name
            </label>
            <input
              type="text"
              value={state.pageName}
              onChange={(e) =>
                dispatch({
                  type: "PAGE_NAME_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder={`Enter the name of your ${state.botType==='facebook-page' ? 'Page' : 'Group'} From the Social Media`}
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>

        
          <article>
            <label className="flex justify-between items-center">
              <span>{state.botType === "facebook-page" ? "Page " : "User"} ID</span>
              <a href="/media-bot/dashboard/docs/#facebook-page-id"  className="text-xs text-green-600 hover:underline">
                Get ID
              </a>
            </label>
            <input
              type="number"
              value={state.pageID}
              onChange={(e) =>
                dispatch({ type: "PAGE_ID_ON_CHANGE", payLoad: e.target.value })
              }
              placeholder={`Enter your ${state.botType==='facebook-page' ? 'Page' : 'User'}  ID from the Social Media`}
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>

          <article className="py-3 flex w-full justify-center ">
            <motion.button
              whileHover={{ scale: 1.06 }}
              type="submit"
              disabled={state.isLoading}
              className="disabled:cursor-not-allowed w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold rounded flex justify-center"
            >
              {state.isLoading ? (
                <span>
                  <img src={loading} alt="image_loading" className="w-6 h-6" />
                </span>
              ) : (
                <span>ADD APP</span>
              )}
            </motion.button>
          </article>
        </form>
      </article>
    </div>
  );
};

export default AddApp;
