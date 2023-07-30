import React from "react";
import { Link } from "react-router-dom";
import bot from "../assets/system/bot.png";
import fb from "../assets/media/fb.png";
import telegram from "../assets/media/telegram.png";
import twitter from "../assets/media/twitter.png";

const Footer = () => {
  return (
    <div className="w-full bg-slate-100">
      <div className="container mx-auto">
        <section className="flex flex-col md:flex-row justify-center">
          
          <article className="w-full md:w-4/12  flex justify-center py-16">
            <div className="space-y-4">
              <Link
                to="/"
                className="text-xl md:text-2xl font-semibold flex justify-center items-center pb-4"
              >
                <span>
                  <img src={bot} alt="bot" className="w-8 md:w-9" />
                </span>
                <span>Post Master</span>
              </Link>

              <div className="px-2 text-gray-700 flex justify-center">
                <small>Follow Us on</small>
              </div>

              <div className="flex px-2 items-center gap-3 justify-center">
                <a
                  href="https://web.facebook.com/profile.php?id=100094690910849"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={fb} alt="facebook" className="w-7 h-7" />
                </a>

                <a
                  href="https://t.me/mediapostmaster"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={telegram} alt="telegram" className="w-7 h-7" />
                </a>

                <Link>
                  <img src={twitter} alt="twitter" className="w-7 h-7" />
                </Link>
              </div>
            </div>
          </article>

          <article className="py-7 w-full md:w-3/12 flex justify-center">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-gray-800 flex justify-center">SERVICES</h1>
              <div className="text-gray-700  flex justify-center">Facebook Page Bot</div>
              <div className="text-gray-700  flex justify-center">Facebook Group Bot</div>
              <div className="text-gray-700  flex justify-center">Telegram Channel Bot</div>
              <div className="text-gray-700  flex justify-center">Telegram Group Bot</div>
              <div className="text-gray-700  flex justify-center">Twitter Bot</div>
            </div>
          </article>

          <article className="py-7 w-full md:w-3/12 flex justify-center">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold text-gray-800 flex justify-center">CONTACTS</h1>
              <div className="text-gray-700 flex items-center gap-1 justify-center">
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>
                <span>+24791742766</span>
              </div>
              <div className="text-gray-700 flex items-center  justify-center gap-1">
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
                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                </span>
                <span>+24791742766</span>
              </div>
              <div className="text-gray-700 flex items-center gap-1  justify-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    {" "}
                    flex items-center
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <span>bot@alphabailwake.com</span>
              </div>
            </div>
          </article>

        </section>
      </div>
    </div>
  );
};

export default Footer;
