import React, { useEffect, useReducer } from "react";
import axiosClient from "../axiosClient";
import loading from "../assets/loading.gif";
import { motion } from "framer-motion";
import Schedule from "./Schedule";
import { Link, useParams } from "react-router-dom";
import { useShowAppContext } from "../contexts/ShowAppContext";
import AppData from '../data/AppData';

const reducer = (state, action) => {
  if (action.type === "SHOW_DELETE_BUTTON") {
    return { ...state, isDeleteScheduler: action.payLoad };
  }
  if (action.type === "SHOW_DELETE_ITEM_FORM") {
    return {
      ...state,
      isDeleteScheduler: false,
      isDeleteSchedulerForm: true,
      itemToDeleteId: action.payLoad,
    };
  }
  if (action.type === "SET_IS_SCHEDULER_FORM") {
    return {
      ...state,
      isDeleteSchedulerForm: action.payLoad,
      itemToDeleteId: 0,
    };
  }
  if (action.type === "SET_IS_SUCCESS_MESSAGE") {
    return { ...state, isSuccessMessage: action.payLoad };
  }
  if (action.type === "SET_IS_DELETE_LOADING") {
    return { ...state, isDeleteLoading: action.payLoad };
  }

  throw new Error("404 Not found");
};

const defaultScheduleValues = {
  isDeleteScheduler: false,
  isDeleteSchedulerForm: false,
  itemToDeleteId: 0,
  isDeleteLoading: false,
  isSuccessMessage: false,
};

const Schedulers = ({setIsAddPost}) => {
  const data = useParams();

  const {loadPosts,posts,isLoading} = useShowAppContext();

  const [state, dispatch] = useReducer(reducer, defaultScheduleValues);
  
  const appId = data.id;



  useEffect(() => {
    loadPosts(appId);
  }, [appId]);


  const handleDeleteItem = () => {
    dispatch({ type: "SET_IS_DELETE_LOADING", payLoad: true });

    axiosClient
      .delete(`/schedule-post/${state.itemToDeleteId}/delete`)
      .then(({ data }) => {
        loadPosts(appId);
        dispatch({ type: "SET_IS_DELETE_LOADING", payLoad: false });
        dispatch({ type: "SET_IS_SCHEDULER_FORM", payLoad: false });
        dispatch({ type: "SET_IS_SUCCESS_MESSAGE", payLoad: true });
      })
      .catch((error) => {
        dispatch({ type: "SET_IS_DELETE_LOADING", payLoad: false });
      });
  };


  useEffect(() => {
    const intervals = setInterval(() => {
      if (state.isSuccessMessage) {
        dispatch({ type: "SET_IS_SUCCESS_MESSAGE", payLoad: false });
      }
    }, 5000);

    return () => clearInterval(intervals);
  });

  return (
    <div className="relative">
      {state.isSuccessMessage && (
        <div className="fixed top-20 flex w-full justify-center">
          <div className="w-4/12 bg-green-400 text-sm text-white p-2 text-center">
            Scheduler has been deleted Successfully!
          </div>
        </div>
      )}
      {state.isDeleteSchedulerForm && (
        <div className="fixed bg-gray-300 w-full h-full top-20 z-[20] opacity-50"></div>
      )}

      {state.isDeleteSchedulerForm && (
        <div className="fixed top-28 w-full flex justify-center z-[21]">
          <div className="w-11/12 md:w-4/12 shadow bg-white rounded">
            <article className="flex justify-end px-2 py-1">
              <button
                className="hover:text-green-500"
                onClick={() =>
                  dispatch({ type: "SET_IS_SCHEDULER_FORM", payLoad: false })
                }
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
            <article className="flex justify-center text-red-600">
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
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </article>

            <article className="flex justify-center">
              Confirm You want to delete the Scheduler
            </article>
            <article className="flex justify-end px-2 py-1">
              <motion.button
                whileHover={{ scale: 1.07 }}
                onClick={handleDeleteItem}
                className="bg-red-600 px-2 text-sm text-white rounded"
              >
                {state.isDeleteLoading ? (
                  <span className="flex items-center">
                    <img src={loading} alt="loading" className="w-4 h-4" />
                    <small>Deleting..</small>
                  </span>
                ) : (
                  <span> Delete</span>
                )}
              </motion.button>
            </article>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex w-full justify-center">
          <div className="flex">
            <span>
              <img src={loading} alt="loading" className="w-6 h-6" />
            </span>
            <span>Loading...</span>
          </div>
        </div>
      )}

      {(posts.length === 0 && !isLoading) && (
        <div className="space-y-4">
          <div className="flex justify-center text-lg text-gray-700 font-semibold">No Schedulers Found</div>

          <div className="flex justify-center">
            <motion.button onClick={()=>setIsAddPost(true)} whileHover={{scale:1.07}} className="bg-green-600 hover:bg-green-700 rounded-lg px-3 py-1 text-white font-semibold">Add your first Scheduler</motion.button>
          </div>

          <div className="flex justify-center">
           <article className="w-full md:w-8/12 font-sans text-slate-800 text-lg space-y-8 pt-10">
            <h1 className="text-center text-xl font-semibold">What is Scheduler and How They Work?</h1>
          
          
          {
            AppData.schedulerDescription.map((description)=>{
              return (
                <p key={description.id}>{description.content}</p>
              );
            })
          }
            <Link to='/dashboard/docs' className="text-green-700 underline">Learn more...</Link>
           </article>
          </div>
        </div>
      )}
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 space-y-4 md:space-y-0 md:gap-4 px-2 md:px-0">
          {posts.map((post) => {
            const { id } = post;
            return <Schedule key={id} dispatch={dispatch} post={post} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Schedulers;
