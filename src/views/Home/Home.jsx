import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import paper from "../../assets/home/paper.png";
import fb from "../../assets/media/fb.png";
import telegram from "../../assets/media/telegram.png";
import blue from "../../assets/home/blue.jpg";

const Home = () => {
  useEffect(()=>{
    window.document.title="Post Master";
  },[])
  
  return (
    <div className="container mx-auto py-20 md:py-24">
      <div className="block md:flex space-y-4 md:space-y-0 w-full">
        <article className="basis-1/2 md:px-0 px-4 space-y-10">
          <div className="pt-14">
            <article className="pr-4 md:pr-14 text-4xl font-extrabold text-gray-800">
              Automate, Connect, and Post Everywhere. Simplify Social Media
              Management.
            </article>
          </div>

          <div>
            <article className="font-semibold text-gray-700 pr-0 md:pr-4">
              Unleash the Full Potential of Your Social Presence. Seamlessly
              Connect to Facebook, Telegram, and Twitter APIs for Unprecedented
              Reach, Engagement, and Growth.
            </article>
          </div>

          <div className="pt-4 md:pt-8">
            <Link to="/login">
              <motion.button
                whileHover={{ y: -4 }}
                className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-xl pt-3 text-white font-semibold text-lg"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </article>

        <article className="basis-1/2">
          <img src={paper} alt="paper" className="w-full" />
        </article>
      </div>

      <div className="pt-16  md:px-0 px-4 ">
        <div className="text-gray-800 font-semibold text-2xl md:text-3xl text-center">
          Connect to your Followers on Facebook,Telegram, and Twitter 24/7
        </div>

        <div className="grid grid-col-1 md:grid-cols-4 py-7 gap-7">
          <motion.article
            whileHover={{ scale: 1.04 }}
            className="homeShadow bg-white rounded-lg p-3 space-y-4"
          >
            <div className="pt-5">
              <img src={fb} alt="facebook" className="w-16" />
            </div>
            <div className="text-2xl text-gray-800">Facebook Page</div>
            <div className="text-gray-800">
              Simplify your social media management. Connect to our bot and
              effortlessly schedule automatic 24/7 Facebook page posts.
            </div>
            <div className="pt-4 flex justify-end">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1 hover:underline"
              >
                <span>Create Bot</span>
                <span className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ scale: 1.04 }}
            className="homeShadow bg-white rounded-lg p-3 space-y-4"
          >
            <div className="pt-5">
              <img src={fb} alt="facebook" className="w-16" />
            </div>
            <div className="text-2xl text-gray-800">Facebook Group</div>
            <div className="text-gray-800">
              Simplify your social media management. Connect to our bot and
              effortlessly schedule automatic 24/7 posts in your Facebook group.
            </div>
            <div className="pt-4 flex justify-end">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1 hover:underline"
              >
                <span>Connect</span>
                <span className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ scale: 1.04 }}
            className="homeShadow bg-white rounded-lg p-3 space-y-4"
          >
            <div className="pt-5">
              <img src={telegram} alt="telegram" className="w-16" />
            </div>
            <div className="text-2xl text-gray-800">Telegram Channel</div>
            <div className="text-gray-800">
              Connect to our bot to automatically send messages, engaging your
              audience effortlessly, around the clock on Telegram Channel.
            </div>
            <div className="pt-4 flex justify-end">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1 hover:underline"
              >
                <span>Create Bot</span>
                <span className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ scale: 1.04 }}
            className="homeShadow bg-white rounded-lg p-3 space-y-4"
          >
            <div className="pt-5">
              <img src={telegram} alt="telegram" className="w-16" />
            </div>
            <div className="text-2xl text-gray-800">Telegram Group</div>
            <div className="text-gray-800">
              Connect to our bot and send automated messages seamlessly, keeping
              your group engaged 24/7 on Telegram Group.
            </div>
            <div className="pt-4 flex justify-end">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1 hover:underline"
              >
                <span>Create Bot</span>
                <span className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </motion.article>
        </div>
      </div>

      <div className="mt-36">
        <div className="relative w-full">
          <div className="w-full absolute p-4 space-y-10">
            <div className="w-full md:w-6/12 pt-1 md:pt-2 md:pt-20 text-base md:text-4xl font-bold text-white">
              Experience the Future of Messaging with Our Innovative Bot.
              Unleash the Power of Automation, Enriching Your Conversations with
              Dynamic Interactions
            </div>
            <div className="hidden md:flex md:text-sm text-xs w-full md:w-6/12 text-gray-100">
              Say goodbye to static messages and embrace the future of
              messaging. Our bot is designed to bring your conversations to
              life, transforming animated drawings into engaging interactions
              that captivate your audience. This first-of-its-kind project opens
              up a world of possibilities, making your conversations more
              vibrant, interactive, and memorable.
            </div>
            <div className="flex md:justify-start justify-end text-lg text-gray-200 font-semibold underline">
              <Link to='/login' className="hover:text-xl">Start Now</Link>
            </div>
          </div>
          <img src={blue} alt="blue_background" className=" w-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
