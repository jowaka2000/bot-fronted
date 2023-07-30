import loading from "../assets/loading.gif";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bot from "../assets/system/bot.png";
import fb from "../assets/media/fb.png";
import telegramIcon from "../assets/media/telegram.png";
import { useDashboardContext } from "../contexts/DashboardContext";

const UserMediaBots = () => {

  const {isLoading,apps,setIsAddAppForm}=useDashboardContext();


  return (
    <div className="pt-6">
      {isLoading && (
        <div className="flex w-full justify-center py-10">
          <span>
            <img src={loading} alt="app_loading" className="w-6 h-6" />
          </span>
          <span>Loading...</span>
        </div>
      )}

      {!isLoading && (
        <>
          {apps.length === 0 && (
            <div className="space-y-8 pt-14">
              <article className="w-full flex justify-center text-xl">
                No Bots found
              </article>
              <article className="w-full flex justify-center">
                <motion.button
                  onClick={() => setIsAddAppForm(true)}
                  whileHover={{ scale: 1.07 }}
                  className="text-center flex gap-1 items-center bg-green-600 px-3 py-1 text-white text-lg font-semibold rounded-lg"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>

                  <span>CREATE NEW BOT</span>
                </motion.button>
              </article>
              <div className="w-full flex justify-center text-xs">
                You can add Facebook and Telegram Bots
              </div>
            </div>
          )}
          {apps.length > 0 && (
            <div className="dashboardShadow p-3  rounded-t-xl space-y-4">
              <section className="border-b border-slate-400 flex">
                Facebook,Telegram, and Twitter Bots
              </section>

              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {apps.map((app) => {
                  const {
                    search_id,
                    bot_type,
                    bot_name,
                    page_id,
                    active,
                    activated,
                    approved
                  } = app;

                  return (
                    <Link
                      key={search_id}
                      to={`/dashboard/apps/${bot_type}/${search_id}`}
                    >
                      <motion.article
                        whileHover={{ scale: 1.04 }}
                        className={`border rounded-lg  px-1 pb-1  border-slate-300 hover:border-slate-400`}
                      >
                        <div className="w-full flex justify-between">
                          {(bot_type === "telegram-channel" ||
                            bot_type === "telegram-group" ||
                            bot_type === "telegram-user") && (
                            <img
                              src={telegramIcon}
                              alt="Telegram icon"
                              className="w-4 h-4"
                            />
                          )}

                          {(bot_type === "facebook-page" ||
                            bot_type === "facebook-group") && (
                            <img
                              src={fb}
                              alt="Facebook icon"
                              className="w-4 h-4"
                            />
                          )}

                          {(activated && approved) && (
                            <span className="text-green-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          )}
                        </div>

                        <div className="flex border-b pb-4 pt-2">
                          <div className="basis-3/5 space-y-[3px]">
                            <div className="text-sm font-bold">{bot_name}</div>
                            {bot_type==='facebook-page'  && <div className="text-xs text-gray-800">App Id: {page_id}</div>}
                            {bot_type==='facebook-group'  && <div className="text-xs text-gray-800">User Id: {page_id}</div>}
                            <div className="text-xs text-gray-800">Bot Type: {bot_type}</div>
                            <div className="text-xs text-gray-800">
                              Status: {active ? "Active" : "Not Active"}
                            </div>
                          </div>

                          <div className="basis-2/5 ">
                            <img src={bot} alt="bot" />
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })}
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserMediaBots;
