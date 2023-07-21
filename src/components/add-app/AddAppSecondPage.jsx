import React from "react";
import { motion } from "framer-motion";
import loading from "../../assets/loading.gif";
import axiosClient from "../../axiosClient";

const AddAppSecondPage = ({ state, dispatch }) => {


  const handleAppDataSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_IS_LOADING", payLoad: true });

    if (state.botName === "" || state.botTYpe === "") {
      dispatch({ type: "SET_ERROR", payLoad: "Please include bot name!" });
    } else {
      if (
        state.botType === "facebook-page" &&
        (state.pageID === "" || state.mediaName === "")
      ) {
        dispatch({
          type: "SET_ERROR",
          payLoad: "Please include Page ID and Page Name!",
        });
      } else if (
        state.botType === "facebook-group" &&
        (state.mediaName === "" || state.userID === "")
      ) {
        dispatch({
          type: "SET_ERROR",
          payLoad: "Please include User ID and Group Name!",
        });
      } else if (
        state.botType === "telegram-group" &&
        (state.mediaName === "" || state.botNickname === "")
      ) {
        dispatch({
          type: "SET_ERROR",
          payLoad: "Please include Media name and Bot nickname!",
        });
      } else if (
        state.botType === "telegram-channel" &&
        (state.mediaName === "" ||
          state.botNickname === "" ||
          state.channelLink === "")
      ) {
        dispatch({
          type: "SET_ERROR",
          payLoad: "All Fields are required!",
        });
      } else if (
        state.botType === "telegram-user" &&
        (state.botNickname === "" ||
          state.botUsername === "" ||
          state.botAccessToken === "" ||
          state.botLink === "")
      ) {
        dispatch({
          type: "SET_ERROR",
          payLoad: "All Fields are required!",
        });
      } else {
        //continue

        const payLoad = {
          botType: state.botType,
          botName: state.botName,
          mediaName: state.mediaName,
          pageID: state.pageID,
          userID: state.userID,
          botNickname: state.botNickname,
          channelLink: state.channelLink,
          botUsername: state.botUsername,
          botAccessToken: state.botAccessToken,
          botLink: state.botLink,
        };

        axiosClient
          .post("/user-apps/create", payLoad)
          .then(({ data }) => {
            dispatch({ type: "APP_ADDED" });
            dispatch({ type: "SET_IS_LOADING", payLoad: false });
          })
          .catch((error) => {
            const { response } = error;

            console.log(error);
            if (response && response.status === 422) {
              dispatch({
                type: "SET_ERROR",
                payLoad: response.data.message,
              });
            }

            dispatch({ type: "SET_IS_LOADING", payLoad: false });
          });
      }
    }
  };

  return (
    <form className="px-4 space-y-3" onSubmit={handleAppDataSubmit}>
      <article>
        <label>Preferred Bot Name </label>
        <input
          type="text"
          placeholder="Give your Bot a Name"
          value={state.botName}
          onChange={(e) =>
            dispatch({
              type: "BOT_NAME_ON_CHANGE",
              payLoad: e.target.value,
            })
          }
          className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
        />
      </article>

      {state.botType !== "telegram-user" && (
        <article>
          <label>
            {state.botType === "facebook-page" && "Page Name"}
            {state.botType === "facebook-group" && "Group Name"}
            {state.botType === "telegram-channel" && "Telegram Channel Name"}
            {state.botType === "telegram-group" && "Telegram Group Name"}
          </label>
          <input
            type="text"
            value={state.mediaName}
            onChange={(e) =>
              dispatch({
                type: "MEDIA_NAME_ON_CHANGE",
                payLoad: e.target.value,
              })
            }
            placeholder={
              state.botType === "facebook-page"
                ? "Name of your Facebook Page on Social Media"
                : state.botType === "facebook-group"
                ? "Name of your Facebook Group on Social Media"
                : state.botType === "telegram-channel"
                ? "Name of your Telegram Channel"
                : state.botType === "telegram-group"
                ? "Name of your Telegram Group"
                : ""
            }
            className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
          />
        </article>
      )}

      {state.botType === "facebook-page" && (
        <article>
          <label className="flex justify-between items-center">
            <span>Page ID</span>
            <a
              href="/media-bot/dashboard/docs/#facebook-page-id"
              className="text-xs text-green-600 hover:underline"
            >
              Get Page ID
            </a>
          </label>

          <input
            type="number"
            value={state.pageID}
            onChange={(e) =>
              dispatch({ type: "PAGE_ID_ON_CHANGE", payLoad: e.target.value })
            }
            placeholder={`Enter Page ID of your Page`}
            className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
          />
        </article>
      )}

      {state.botType === "facebook-group" && (
        <article>
          <label className="flex justify-between items-center">
            <span>User ID</span>
            <a
              href="/media-bot/dashboard/docs/#facebook-user-id"
              className="text-xs text-green-600 hover:underline"
            >
              Get User ID
            </a>
          </label>
          <input
            type="number"
            value={state.userID}
            onChange={(e) =>
              dispatch({ type: "USER_ID_ON_CHANGE", payLoad: e.target.value })
            }
            placeholder={`Enter Your User ID From Facebook`}
            className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
          />
        </article>
      )}

      {(state.botType === "telegram-channel" ||
        state.botType === "telegram-group" ||
        state.botType === "telegram-user") && (
        <article>
          <label>Preferred Bot Nickname</label>
          <input
            type="text"
            value={state.botNickname}
            onChange={(e) =>
              dispatch({
                type: "BOT_NICKNAME_ID_ON_CHANGE",
                payLoad: e.target.value,
              })
            }
            placeholder={`Enter bot nickname e.g John Doe`}
            className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
          />
        </article>
      )}

      {state.botType === "telegram-channel" && (
        <article>
          <label>Channel Link</label>
          <input
            type="url"
            value={state.channelLink}
            onChange={(e) =>
              dispatch({
                type: "CHANNEL_LINK_ON_CHANGE",
                payLoad: e.target.value,
              })
            }
            placeholder={`Enter Telegram Channel Link`}
            className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
          />
        </article>
      )}

      {state.botType === "telegram-user" && (
        <article className="space-y-3">
          <article>
            <label className="flex justify-between items-center">
              <span>Bot Username</span>
              <a
                href="/media-bot/dashboard/docs/#telegram-bot-username"
                className="text-xs text-green-600 hover:underline"
              >
                Get Username
              </a>
            </label>
            <input
              type="text"
              value={state.botUsername}
              onChange={(e) =>
                dispatch({
                  type: "BOT_USERNAME_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder={`Enter bot username from telegram`}
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>

          <article>
            <label className="flex justify-between items-center">
              <span>Bot Access Token</span>
              <a
                href="/media-bot/dashboard/docs/#facebook-user-id"
                className="text-xs text-green-600 hover:underline"
              >
                Get Access Token
              </a>
            </label>
            <input
              type="text"
              value={state.botAccessToken}
              onChange={(e) =>
                dispatch({
                  type: "BOT_ACCESS_TOKEN_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder={`Enter access token from telegram`}
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>

          <article>
            <label className="flex justify-between items-center">
              <span>Bot Link</span>
              <a
                href="/media-bot/dashboard/docs/#facebook-user-id"
                className="text-xs text-green-600 hover:underline"
              >
                Get User ID
              </a>
            </label>
            <input
              type="text"
              value={state.botLink}
              onChange={(e) =>
                dispatch({
                  type: "BOT_LINK_ON_CHANGE",
                  payLoad: e.target.value,
                })
              }
              placeholder={`Enter bot link from telegram`}
              className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
            />
          </article>
        </article>
      )}

      <div className="flex items-center justify-between pt-4 pb-2">
        <button
          onClick={() => dispatch({ type: "MOVE_TO_FIRST_PAGE" })}
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
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="text-xl">PREVIOUS</span>
        </button>

        <div className="basis-1/2">
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
        </div>
      </div>
    </form>
  );
};

export default AddAppSecondPage;
