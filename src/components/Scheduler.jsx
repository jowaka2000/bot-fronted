import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import loading from "../assets/loading.gif";

const Scheduler = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/schedule-post/posts")
      .then(({ data }) => {
        setPosts(data.schedulers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        isLoading &&
        <div className="flex w-full justify-center">
            <div className="flex">
            <span><img src={loading} alt="loading" className="w-6 h-6" /></span>
            <span>Loading...</span>
        </div>
        </div>
      }
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => {
          const { id } = post;
          return (
            <article key={id} className="shadow  p-1 space-y-5">
              <div className="flex justify-end text-xs">Post id</div>
              <div>Image</div>
              <div>Message/text</div>
              <div>Time</div>
              <div>Likes Messages</div>
              <div className="flex text-xs justify-between">
                <button>Publish</button>
                <button>Schedule</button>
                <button>Delete</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Scheduler;
