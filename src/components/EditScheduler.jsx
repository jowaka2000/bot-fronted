import React, { useReducer, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../axiosClient";
import loading from "../assets/loading.gif";
import EditImages from "./edit/EditImages";

const reducer = (editState, editAction) => {
  if (editAction.type === "HANDLE_MESSAGE_ADD_CHANGE_ON_CHANGE") {
    return { ...editState, messageToAdd: editAction.payLoad };
  }
  if (editAction.type === "SHOW_ADD_MESSAGE") {
    return { ...editState, isAddMessage: editAction.payLoad };
  }
  if (editAction.type === "SET_ERROR_ON") {
    return { ...editState, isError: true, errorMessage: editAction.payLoad };
  }
  if (editAction.type === "SET_ERROR_OFF") {
    return { ...editState, isError: false, errorMessage: "" };
  }
  if (editAction.type === "SET_ADD_MESSAGE_BUTTON_LOADING") {
    return { ...editState, isAddMessageButtonLoading: editAction.payLoad };
  }
  if (editAction.type === "SET_IS_SUCCESS_MESSAGE") {
    return {
      ...editState,
      isSuccessMessage: editAction.payLoad.status,
      successMessage: editAction.payLoad.message,
      isAddMessageButtonLoading: editAction.payLoad.isLoading,
      messageToAdd: "",
    };
  }
  if (editAction.type === "SET_IS_ACCESS_MESSAGE") {
    return {
      ...editState,
      isSuccessMessage: editAction.payLoad.status,
      successMessage: editAction.payLoad.message,
    };
  }

  if (editAction.type === "SET_IS_DELETE_LOADING") {
    return { ...editState, isDeleteLoading: editAction.payLoad };
  }
  if (editAction.type === "IS_URL_INPUT") {
    return { ...editState, isAddUrlInput: editAction.payLoad };
  }
  if (editAction.type === "URL_INPUT_ON_CHANGE") {
    return { ...editState, url: editAction.payLoad };
  }
  if (editAction.type === "ADD_SCHEDULER") {
    return { ...editState, schedule: editAction.payLoad };
  }
  if (editAction.type === "IS_ADD_URL_LOADING") {
    return { ...editState, isAddUrlLoading: editAction.payLoad };
  }
  if (editAction.type === "SET_URL") {
    return { ...editState, url: editAction.payLoad };
  }
  throw new Error("Not found");
};

const defaultAppEditValues = {
  images: [],

  imageScheduler: "none",

  messageToAdd: "",
  isAddMessage: false,
  isError: false,
  errorMessage: "",
  isAddMessageButtonLoading: false,
  isSuccessMessage: false,
  successMessage: "",
  isDeleteLoading: false,
  isAddUrlInput: false,
  url: "",
  schedule: "none",
  isAddUrlLoading: false,
};

const EditScheduler = ({ dispatch, post, updatePosts }) => {
  const [scheduler, setScheduler] = useState(post);
  const [editState, editDispatch] = useReducer(reducer, defaultAppEditValues);

  useEffect(() => {
    setScheduler(post);
  }, [post]);

  const handleOnAddMessageClick = () => {
    editDispatch({ type: "SET_ADD_MESSAGE_BUTTON_LOADING", payLoad: true });

    if (editState.messageToAdd === "") {
      editDispatch({ type: "SET_ERROR_ON", payLoad: "Add some text" });
      editDispatch({ type: "SET_ADD_MESSAGE_BUTTON_LOADING", payLoad: false });
    } else {
      const payLoad = {
        message: editState.messageToAdd,
      };

      axiosClient
        .post(`/schedule-post/${scheduler.id}/edit`, payLoad)
        .then((response) => {
          editDispatch({
            type: "SET_IS_SUCCESS_MESSAGE",
            payLoad: {
              status: true,
              message: "Message Content Added Successfully!",
              isLoading: false,
            },
          });

          editDispatch({ type: "SHOW_ADD_MESSAGE", payLoad: false });
          fetchScheduleData(scheduler.id);
        })
        .catch((error) => {
          const { response } = error;

          if (response && response.status === 403) {
            editDispatch({
              type: "SET_ERROR_ON",
              payLoad: "Ops! An error has occurred!",
            });
          } else {
            editDispatch({
              type: "SET_ERROR_ON",
              payLoad: "Ops! An error has occurred! Please try again",
            });
          }

          editDispatch({
            type: "SET_ADD_MESSAGE_BUTTON_LOADING",
            payLoad: false,
          });
        });
    }
  };

  //delete messages
  const handleDeleteMessageContent = (id) => {
    const messages = scheduler.messageContent.filter(
      (message, index) => index !== id
    );

    const payLoad = {
      messages,
    };

    axiosClient
      .post(`/schedule-post/message-content/${scheduler.id}/delete`, payLoad)
      .then((response) => {
        fetchScheduleData(scheduler.id);
        editDispatch({
          type: "SET_IS_ACCESS_MESSAGE",
          payLoad: { status: true, message: "Message deleted Successfully!" },
        });
      })
      .catch((error) => {
        editDispatch({
          type: "SET_ERROR_ON",
          payLoad: "Ops! An error has occurred!",
        });
      });
  };

  const fetchScheduleData = (id) => {
    axiosClient
      .get(`/schedule-post/show/${id}`)
      .then(({ data }) => {
        setScheduler(data.schedule);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const intervals = setInterval(() => {
      if (editState.isError) {
        editDispatch({ type: "SET_ERROR_OFF" });
      }
      if (editState.isSuccessMessage) {
        editDispatch({
          type: "SET_IS_SUCCESS_MESSAGE",
          payLoad: { status: false, message: "", isLoading: false },
        });
      }
    }, 4000);

    return () => clearInterval(intervals);
  });

  const handleUrlSubmit = (e) => {
    e.preventDefault();

    editDispatch({ type: "IS_ADD_URL_LOADING", payLoad: true });

    if (editState.url === "") {
      editDispatch({
        type: "SET_ERROR_ON",
        payLoad: "Please add the url",
      });
      editDispatch({ type: "IS_ADD_URL_LOADING", payLoad: false });
    } else {
      editDispatch({ type: "IS_ADD_URL_LOADING", payLoad: false });

      const payLoad = {
        url: editState.url,
      };
      axiosClient
        .post(`/schedule-post/update-url/${scheduler.id}`, payLoad)
        .then(({ data }) => {
          console.log(data);
          editDispatch({ type: "SET_URL", payLoad: data.schedule.url });
          setScheduler(data.schedule);
          editDispatch({ type: "IS_URL_INPUT", payLoad: false });
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const handleUrlOnChange = (e) => {
    editDispatch({ type: "URL_INPUT_ON_CHANGE", payLoad: e.target.value });
  };

  const handleOnClickDeleteUrlButton = () => {
    axiosClient
      .post(`/schedule-post/delete-url/${scheduler.id}`)
      .then(({ data }) => {
        setScheduler(data.schedule);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleSchedulerOnChange= (e)=>{

    const payLoad = {
      schedule:e.target.value,
    };
    axiosClient.post(`/schedule-post/update-schedule/${scheduler.id}`,payLoad)
    .then(({data})=>{
      setScheduler(data.schedule);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  return (
    <motion.div
      initial={{ y: 70 }}
      whileInView={{ y: -260 }}
      className="fixed w-full justify-center flex z-[21] h-[84%] md:h-[93%]"
    >
      <section className="relative homeShadow w-full md:w-6/12 bg-white h-full overflow-y-scroll pb-10">
        {editState.isError && (
          <div className="fixed w-[94%] md:w-[50%] flex justify-center">
            <div className="bg-red-500 basis-3/4 text-white text-center ">
              {editState.errorMessage}
            </div>
          </div>
        )}

        {editState.isSuccessMessage && (
          <div className="fixed w-[94%] md:w-[50%]  flex justify-center">
            <div className="bg-green-500 basis-3/4 text-white text-center ">
              {editState.successMessage}
            </div>
          </div>
        )}

        <div className="absolute flex justify-end p-1  w-full">
          <button
            onClick={() => {
              dispatch({ type: "HIDE_EDIT_SCHEDULER" });
              updatePosts();
            }}
            className="fixed border rounded border-white hover:border-red-800 bg-white"
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

        <div className="px-4 pt-10 space-y-8">
          <article className="">
            <div className="text-lg font-semibold pb-3 flex items-center justify-between">
              <span> Messages ({scheduler.messageContent.length})</span>

              {!editState.isAddMessage && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  title="Add message"
                  onClick={() =>
                    editDispatch({ type: "SHOW_ADD_MESSAGE", payLoad: true })
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.button>
              )}
            </div>

            <div className="space-y-7">
              {editState.isAddMessage && (
                <div>
                  <textarea
                    autoFocus={true}
                    value={editState.messageToAdd}
                    onChange={(e) =>
                      editDispatch({
                        type: "HANDLE_MESSAGE_ADD_CHANGE_ON_CHANGE",
                        payLoad: e.target.value,
                      })
                    }
                    className="w-full outline-none p-1 text-sm rounded border border-gray-300 hover:border-gray-400"
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      onClick={handleOnAddMessageClick}
                      disabled={editState.isAddMessageButtonLoading}
                      className="disabled:cursor-not-allowed disabled-bg-opacity-75 text-sm px-2 py-[2px] bg-green-500 hover:bg-green-600 flex justify-center rounded text-white"
                    >
                      {!editState.isAddMessageButtonLoading ? (
                        <span>Add Message</span>
                      ) : (
                        <img src={loading} alt="Loading" className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {scheduler.messageContent.length > 0 &&
                scheduler.messageContent.map((message, index) => {
                  return (
                    <div key={index} className="flex justify-between">
                      <div>{message}</div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        onClick={() => handleDeleteMessageContent(index)}
                        className="relative text-red-500"
                        type="submit"
                        title="delete"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  );
                })}
            </div>
          </article>

          <div>
            <div className="flex justify-between items-center pb-3">
              <div className="text-lg font-semibold">Link</div>
              <button
                className=""
                onClick={() =>
                  editDispatch({
                    type: "IS_URL_INPUT",
                    payLoad: !editState.isAddUrlInput,
                  })
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            {editState.isAddUrlInput && (
              <form className="w-full space-y-1">
                <div className="w-full">
                  <input
                    type="text"
                    onChange={(e) => handleUrlOnChange(e)}
                    className="w-full outline-none border border-gray-300 hover:border-gray-400 p-2 rounded"
                    placeholder="paste link/url"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleUrlSubmit}
                    disabled={editState.isAddUrlLoading}
                    type="submit"
                    className="disabled:cursor-not-allowed disabled-bg-opacity-75 text-sm px-2 py-[2px] bg-green-500 hover:bg-green-600 flex justify-center rounded text-white"
                  >
                    {!editState.isAddUrlLoading ? (
                      <span>Add Url</span>
                    ) : (
                      <img src={loading} alt="Loading" className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            )}

            {scheduler.url ? (
              <div className="flex justify-between py-8">
                <div className="w-11/12 overflow-x-hidden">{scheduler.url}</div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="text-red-500 "
                  onClick={handleOnClickDeleteUrlButton}
                  title="delete"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </motion.button>
              </div>
            ) : (
              <div>No Url</div>
            )}

            <div className="w-full">
              <div>
                <label className="text-lg font-semibold">Scheduler</label>
                <select onChange={(e)=>handleSchedulerOnChange(e)} defaultValue={scheduler.schedule} className="w-full outline-none p-2 border border-gray-300 rounded hover:border-gray-400">
                  <option value="none">None</option>
                  <option value="once">Post Once(now)</option>
                  <option value="every_one_hour">Post Every Hour</option>
                  <option value="every_two_hours">Post Every Two Hours</option>
                  <option value="every_three_hours">
                    Post Every Three Hours
                  </option>
                  <option value="every_four_hours">
                    Post Every Four Hours
                  </option>
                  <option value="every_five_hours">
                    Post Every Five Hours
                  </option>
                  <option value="every_six_hours">Post Every Six Hours</option>
                  <option value="every_eight_hours">
                    Post Every Eight Hours
                  </option>
                  <option value="every_twelve_hours">
                    Post Every Twelve Hours
                  </option>
                  <option value="every_day">
                    Post Every Day(Once at radom time)
                  </option>
                  <option value="every_week">Post Every Week</option>
                </select>
              </div>
            </div>

            <EditImages scheduler={scheduler} editDispatch={editDispatch} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default EditScheduler;
