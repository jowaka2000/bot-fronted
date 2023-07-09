import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddPostScheduler from "../../components/AddPostScheduler";
import axiosClient from "../../axiosClient";
import Scheduler from "../../components/Scheduler";
import { motion } from "framer-motion";
import Posts from "../../components/Posts";

const ShowApp = () => {
  const data = useParams();
  const [isAddPost, setIsAddPost] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isPosts, setIsPosts] = useState(false);


  const handleSubmitAccessToken = (e) => {
    e.preventDefault();

    if (accessToken !== "") {
      const pageId = data.id;

      const payLoad = {
        pageId,
        accessToken,
      };

      axiosClient
        .post("/user-apps/update-access-token", payLoad)
        .then(({ data }) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative container mx-auto pt-10">
      {isAddPost && (
        <div className="absolute right-0 left-0 z-[10]  flex justify-center top-8">
          <AddPostScheduler setIsAddPost={setIsAddPost} id={data} />
        </div>
      )}

      {
        isAddPost && <div className="absolute w-full h-full bg-gray-300 opacity-50"></div>
      }
      <div>
        <form onSubmit={handleSubmitAccessToken} className="w-full">
          <article className="flex w-5/12 border border-slate-300 rounded hover:border-slate-400">
            <input
              type="text"
              name="access_token"
              placeholder="access token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="w-10/12 p-1 outline-none  text-sm "
            />
            <button className="text-sm bg-slate-300 w-2/12">Update</button>
          </article>
        </form>
      </div>

      <div className="flex w-full justify-between pb-2 my-8 border-b border-gray-300">
        <article className="flex gap-5">
          <button onClick={()=>setIsPosts(false)} className={`${!isPosts && 'border-b-4'} border-gray-400 hover:text-gray-700`}>
            Schedulers
          </button>
          <button onClick={()=>setIsPosts(true)} className={`${isPosts && 'border-b-4'} border-gray-400 hover:text-gray-700`}>Page Posts</button>
        </article>
        <article>
          <motion.button
            whileHover={{ scale: 1.07 }}
            onClick={() => setIsAddPost(!isAddPost)}
            className="shadow rounded bg-slate-200 rounded-lg px-3 text-slate-900 font-bold"
          >
            Add Scheduler
          </motion.button>
        </article>
      </div>

      {isPosts ? <Posts /> : <Scheduler />}
    </div>
  );
};

export default ShowApp;
