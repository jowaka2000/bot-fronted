import React, { useState, useEffect } from "react";
import loading from "../../assets/loading.gif";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const TelegramDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [app, setApp] = useState({ page_id: "" });
  const [isFormLoading, setIsFormLoading] = useState(true);
  const { isAdmin } = useStateContext();

  const [telegramBotAccessToken, setTelegramBotAccessToken] = useState("");
  const [telegramBotUsername, setTelegramBotUsername] = useState("");

  const data = useParams();
  const id = data.id;

  useEffect(() => {
    axiosClient
      .get(`/user-apps/${id}`)
      .then(({ data }) => {
        setApp(data.app);
        setIsLoading(false);
        setIsFormLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
        setIsFormLoading(false);
      });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (telegramBotAccessToken !== "" || telegramBotUsername !== "") {
      setIsFormLoading(true);
      const payLoad = {
        id: id,
        accessToken: telegramBotAccessToken,
        username: telegramBotUsername,
      };

      axiosClient
        .post("/user-apps/update-telegram-username-token", payLoad)
        .then(({ data }) => {
          setIsFormLoading(false);
          setTelegramBotAccessToken("");
          setTelegramBotUsername("");
        })
        .catch((error) => {
          console.log(error);
          setIsFormLoading(false);
        });
    }
  };

  return (
    <section className="block md:flex justify-between px-1 md:px-8 space-y-3 md:space-y-0">
      <div className="w-full md:basis-1/2 space-y-2">
        <div className="flex text-sm text-gray-700 md:justify-start justify-between">
          <div className="md:basis-2/3 space-y-1">
          
            {app.bot_type === "telegram-channel" && (
              <article>{`Channel Name: ${
                isLoading ? "....." : app.media_name
              }`}</article>
            )}

            {app.bot_type === "telegram-group" && (
              <article>{`Group Name: ${
                isLoading ? "....." : app.media_name
              }`}</article>
            )}

            <article>{`Bot Nickname: ${
              isLoading ? "....." : app.bot_nickname
            }`}</article>

            <article>{`Bot Type: ${
              isLoading ? "....." : app.bot_type
            }`}</article>
          </div>

          <div className="md:basis-1/3">
            <article>Status</article>
            {!isLoading && (
              <>
                {app.active ? (
                  <article className="text-xs">
                    <div className="flex items-center">
                      <span className="text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                      </span>
                      <span className="text-green-700">ACTIVE</span>
                    </div>
                  </article>
                ) : (
                  <div className="text-xs">Not Active</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="w-full md:basis-1/2 space-y-2">
          <form className="w-full space-y-1" onSubmit={handleFormSubmit}>
            <article className="flex w-full border border-slate-300 rounded hover:border-slate-400">
              <input
                type="text"
                name="telegram_bot_access_token"
                placeholder="Telegram bot access token"
                value={telegramBotAccessToken}
                onChange={(e) => setTelegramBotAccessToken(e.target.value)}
                className="w-10/12 p-1 outline-none  text-sm "
              />
            </article>
            <div className="flex w-full justify-between">
              <article className="flex w-8/12 border border-slate-300 rounded hover:border-slate-400">
                <input
                  type="text"
                  name="telegram_bot_username"
                  placeholder="Telegram bot username"
                  value={telegramBotUsername}
                  onChange={(e) => setTelegramBotUsername(e.target.value)}
                  className="w-10/12 p-1 outline-none  text-sm "
                />
              </article>

              <button
                disabled={isFormLoading || isLoading}
                type="submit"
                className="disabled:cursor-not-allowed text-sm bg-green-600 hover:bg-green-700 text-white w-2/12 flex justify-center items-center"
              >
                {isFormLoading || isLoading ? (
                  <img src={loading} alt="loading" className="w-7 h-7" />
                ) : (
                  <span>Update</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default TelegramDetails;
