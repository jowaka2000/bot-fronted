import React, { useEffect, useReducer } from "react";
import FirstPageAddScheduler from "./FirstPageAddScheduler";
import SecondPageAddScheduler from "./SecondPageAddScheduler";
import ThirdPageAddScheduler from "./ThirdPageAddScheduler";
import { useParams } from "react-router-dom";

const reducer = (state, action) => {
  if (action.type === "ADD_MESSAGE_CONTENT") {
    const newMessageContent = [...state.messageContent, action.payLoad];

    return {
      ...state,
      messageContent: newMessageContent,
    };
  }

  if (action.type === "ADD_REAL_FILES") {
    const newRealFiles = [...state.realFiles, action.payLoad];

    return { ...state, realFiles: newRealFiles };
  }

  if (action.type === "ADD_URL") {
    const url = action.payLoad;

    return { ...state, url: url };
  }

  if (action.type === "ERROR_MESSAGE") {
    return { ...state, isError: true, errorMessage: action.payLoad };
  }

  if (action.type === "SET_ERROR_FALSE") {
    return { ...state, isError: false, errorMessage: "" };
  }

  if (action.type === "SET_SUCCESS_MESSAGE_FALSE") {
    return { ...state, isSuccessMessage: false };
  }

  if (action.type === "SET_SUCCESS_MESSAGE_TRUE") {
    return {
      ...state,
      isSuccessMessage: true,
      isFirstPage: true,
      isSecondPage: false,
      isThirdPage: false,
      messageContent: [],
      url: "",
      imageScheduler: "none",
      schedule: "none",
      realFiles: [],
      isError: false,
      publishPost: false,
    };
  }

  //navigating through pages
  if (action.type === "MOVE_FIRST_PAGE") {
    return {
      ...state,
      isFirstPage: true,
      isSecondPage: false,
      isThirdPage: false,
    };
  }

  if (action.type === "MOVE_SECOND_PAGE") {
    return {
      ...state,
      isFirstPage: false,
      isSecondPage: true,
      isThirdPage: false,
    };
  }

  if (action.type === "MOVE_THIRD_PAGE") {
    return {
      ...state,
      isFirstPage: false,
      isSecondPage: false,
      isThirdPage: true,
    };
  }
  //end navigating through pages

  //add scheduler
  if (action.type === "ADD_SCHEDULER") {
    return { ...state, schedule: action.payLoad };
  }

  if (action.type === "PUBLISH_POST") {
    return { ...state, publishPost: action.payLoad };
  }

  //remove images from list
  if (action.type === "REMOVE_IMAGE") {
    const imageToRemove = action.payLoad;

    const images = state.realFiles.filter((image) => image !== imageToRemove);

    return { ...state, realFiles: images };
  }

  //remove message content
  if (action.type === "REMOVE_MESSAGE_CONTENT") {
    const key = action.payLoad;

    const newMessageContent = state.messageContent.filter(
      (message, index) => index !== key
    );

    return { ...state, messageContent: newMessageContent };
  }

  if (action.type === "IMAGE_SCHEDULER_ON_CHANGE") {
    return { ...state, imageScheduler: action.payLoad };
  }
  throw new Error("No values included!");
};

const defaultAddPostState = {
  messageContent: [],
  url: "",
  images: [],
  schedule: "none",
  imageScheduler: "none",
  publishPost: false,
  isError: false,
  errorMessage: "",
  isFirstPage: true,
  isSecondPage: false,
  isThirdPage: false,
  realFiles: [],
  isSuccessMessage: false,
};

const AddPostScheduler = ({ setIsAddPost, isAddPost }) => {
  const data = useParams();

  const [state, dispatch] = useReducer(reducer, defaultAddPostState);

  const id = data.id;

  useEffect(() => {
    const intervals = setInterval(() => {
      if (state.isError) {
        dispatch({ type: "SET_ERROR_FALSE" });
      }

      if (state.isSuccessMessage) {
        dispatch({ type: "SET_SUCCESS_MESSAGE_FALSE" });
      }
    }, 6000);

    return () => clearInterval(intervals);
  });

  const handleCancelAddSchedulerButton = () => {
    // loadPosts(id);
    setIsAddPost(false);
   
  };

  return (
    <>
      {isAddPost && (
        <section className="absolute right-0 left-0 z-[28]  flex justify-center top-8">
          <div className="relative w-full md:w-6/12 shadow bg-white px-5">
            {state.isError && (
              <div className="absolute w-[90%] bg-red-500 text-center text-white text-sm py-1">
                {state.errorMessage}
              </div>
            )}

            {state.isSuccessMessage && (
              <div className="absolute w-[90%] bg-green-500 text-center text-white text-sm py-1">
                A scheduler has been Successfully Created!
              </div>
            )}

            <article className="w-full flex justify-end">
              <button
                onClick={handleCancelAddSchedulerButton}
                className="pt-3 hover:text-red-500 text-gray-800"
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
            </article>

            <article className="w-full flex justify-center text-lg font-semibold text-gray-700">
              ADD SCHEDULER
            </article>

            {/* first page */}
            {state.isFirstPage && (
              <FirstPageAddScheduler state={state} dispatch={dispatch} />
            )}

            {/* second page */}

            {state.isSecondPage && (
              <SecondPageAddScheduler state={state} dispatch={dispatch} />
            )}

            {/* Third page */}

            {state.isThirdPage && (
              <ThirdPageAddScheduler
                state={state}
                dispatch={dispatch}
                id={id}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default AddPostScheduler;
