import React, { useEffect, useState } from "react";
import loading from "../assets/loading.gif";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bot from '../assets/system/bot.png';

const UserApps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/user-apps/index")
      .then(({ data }) => {
        setApps(data.apps);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

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
        {
          apps.length===0 && 
          <div>
            <article className="w-full flex justify-center">No Apps found</article>
          </div>
        }
          {apps.length > 0 && (
            <div className="dashboardShadow p-3  rounded-t-xl space-y-4">
              <section className="border-b border-slate-400 flex">
                Facebook,Telegram, and Twitter Apps
              </section>

              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {apps.map((app) => {
                  const { app_type, app_name, page_id, active, access_token } =
                    app;
                  return (
                    <Link
                      key={page_id}
                      to={`/dashboard/apps/${page_id}`}
                    >
                      <motion.article
                        whileHover={{ scale: 1.04 }}
                        className={`border rounded-lg  px-1 pb-1  border-slate-300 hover:border-slate-400 ${
                          !access_token && "pt-4"
                        }`}
                      >
                        {access_token && (
                          <div className="w-full flex justify-end">
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
                          </div>
                        )}

                        <div className="flex border-b pb-4">
                          <div className="basis-3/5">
                            <div className="text-sm font-bold">{app_name}</div>
                            <div className="text-xs">App Id: {page_id}</div>
                            <div className="text-xs">Bot Type: {app_type}</div>
                            <div className="text-xs">
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

export default UserApps;
