import React, { useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../axiosClient";
import loading from "../assets/loading.gif";

const ThirdPageAddScheduler = ({ state, dispatch, id }) => {
  const [isPublishPost, setIsPublishPost] = useState(state.publishPost);
  const [isLoading, setIsLoading] = useState(false);


  const handleSelectSchedulerOnChange = (e) => {
    dispatch({ type: "ADD_SCHEDULER", payLoad: e.target.value });
    if (e.target.value === "once") {
      setIsPublishPost(true);
    }
  };

  const handlePublishPostOnChange = (e) => {
    if (e.target.checked) {
      dispatch({ type: "PUBLISH_POST", payLoad: true });
      setIsPublishPost(true);
    } else {
      setIsPublishPost(false);
      dispatch({ type: "PUBLISH_POST", payLoad: false });
    }
  };

  //submit scheduler


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData();

    state.realFiles.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });



    const payLoad = {
      appId: id,
      messageContent: state.messageContent,
      url: state.url,
      schedule: state.schedule,
      imageScheduler: state.imageScheduler,
      publishPost: state.publishPost,
    };



    formData.append("payLoad", JSON.stringify(payLoad));

    axiosClient
      .post("/schedule-post/create", formData)
      .then(({ data }) => {
        setIsLoading(false);
        dispatch({ type: "SET_SUCCESS_MESSAGE_TRUE" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label className="text-gray-700 text-sm font-semibold">
            Scheduler (Select a Schedule to your post)
          </label>
          <select
            defaultValue={state.schedule}
            onChange={handleSelectSchedulerOnChange}
            className="flex w-full text-sm outline-none py-3 px-1 border border-slate-300 rounded hover:border-slate-400"
          >
            <option value="none">None</option>
            <option value="once">Post Once(now)</option>
            <option value="every_one_hour">Post Every Hour</option>
            <option value="every_two_hours">Post Every Two Hours</option>
            <option value="every_three_hours">Post Every Three Hours</option>
            <option value="every_four_hours">Post Every Four Hours</option>
            <option value="every_five_hours">Post Every Five Hours</option>
            <option value="every_six_hours">Post Every Six Hours</option>
            <option value="every_eight_hours">Post Every Eight Hours</option>
            <option value="every_twelve_hours">Post Every Twelve Hours</option>
            <option value="every_day">
              Post Every Day(Once at radom time)
            </option>
            <option value="every_week">Post Every Week</option>
          </select>
        </div>

        {state.images.length > 1 && state.schedule !== "once" && (
          <div>
            <label className="text-gray-700 text-sm font-semibold">
              Image Scheduler(Schedule the images)
            </label>
            <select
              defaultValue={state.imageScheduler}
              onChange={(e) =>
                dispatch({
                  type: "IMAGE_SCHEDULER_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              className="flex w-full text-sm outline-none py-3 px-1 border border-slate-300 rounded hover:border-slate-400"
            >
              <option value="none">none</option>
              <option value="one_image">Post One image at a time</option>
              <option value="all_images">Post All Images at once</option>
              {state.images.length % 2 === 0 && state.images.length !== 2 && (
                <option value="two_images_at_time">
                  Post 2 images at a time
                </option>
              )}
              {state.images.length % 3 && state.images.length > 3 && (
                <option value="three_images_at_time">
                  Post 3 images at a time
                </option>
              )}
              {state.images.length % 4 && state.images.length > 4 && (
                <option value="four_images_at_time">
                  Post 4 images at a time
                </option>
              )}
              {state.images.length % 5 && state.images.length > 5 && (
                <option value="five_images_at_time">
                  Post 5 images at a time
                </option>
              )}
            </select>
          </div>
        )}

        <div className="flex items-center gap-1 py-1">
          <input
            type="checkbox"
            name="publish"
            id="publish"
            className=""
            checked={isPublishPost || state.schedule === "none"}
            onChange={handlePublishPostOnChange}
          />
          <label
            className="text-sm text-gray-700 font-semibold"
            htmlFor="publish"
          >
            Publish Post Now{" "}
            {state.schedule !== "none" && `and ${state.schedule} afterwards`}
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 pb-2">
          <button
            onClick={() => dispatch({ type: "MOVE_SECOND_PAGE" })}
            type="button"
            className="flex items-center text-gray-700 hover:underline hover:text-gray-900"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="pt-[3px]">PREVIOUS</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.07 }}
            type="submit"
            disabled={isLoading}
            className="disabled:cursor-not-allowed disabled:bg-opacity-75 px-4 bg-green-600 hover:bg-green-700 flex justify-center text-white font-semibold rounded py-1 basis-1/2"
          >
            {isLoading ? (
              <span>
                <img src={loading} alt="loading" className="w-6 h-6" />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ThirdPageAddScheduler;
