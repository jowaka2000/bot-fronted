import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import Post from "../Post";
import { motion } from "framer-motion";
import loading from "../../assets/loading.gif";


const FacebookPosts = () => {
  const pageId = useParams();
  const [app, setApp] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteForm, setIsDeleteForm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [deletePostIsLoading, setDeletePostIsLoading] = useState(false);
  const [isSuccessMessage,setIsSuccessMessage]=useState(false);

  const id = pageId.id;

  
  useEffect(() => {
    axiosClient
      .get(`/user-apps/${id}`)
      .then(({ data }) => {
        setApp(data.app);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const loadPostFromFb = () => {
    const { access_token, page_id } = app;
    axios
      .get(`https://graph.facebook.com/${page_id}/feed`, {
        params: {
          access_token: access_token,
        },
      })
      .then(({ data }) => {
        const p = Array.from(data.data);
        setPosts(p);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Error occurred while fetching page feed:", error);
      });
  };

  useEffect(() => {
    if (app) {
      loadPostFromFb();
    }
  }, [app]);

  const deletePostOnClick = (id) => {
    setIdToDelete(id);
    setIsDeleteForm(true);
  };

  const handleDeletePostForm = () => {
    setDeletePostIsLoading(true);

    if (idToDelete !== 0) {
      axios
        .delete(`https://graph.facebook.com/${idToDelete}`, {
          params: {
            access_token: app.access_token,
          },
        })
        .then((response) => {
          loadPostFromFb();
          setIsDeleteForm(false);
          setDeletePostIsLoading(false);
          setIsSuccessMessage(true);
        })
        .catch((error) => {
          // console.log("Error occurred while deleting post:", error);
          setDeletePostIsLoading(false);
        });
    } else {
      setDeletePostIsLoading(false);
    }
  };

  useEffect(() => {
    const intervals = setInterval(() => {
      if (isSuccessMessage) {
        setIsSuccessMessage(false);
      }
    }, 5000);

    return () => clearInterval(intervals);
  });
  return (
    <div className="relative container mx-auto space-y-3 pb-20">
      {isSuccessMessage && (
        <div className="fixed flex justify-center w-full top-20">
          <div className="bg-green-400 shadow w-3/12 text-gray-800 text-center">
            <span className="text-white">Post Deleted Successfully</span>
          </div>
        </div>
      )}

      {isDeleteForm && (
        <div className="fixed bg-gray-300 w-full h-full opacity-50 top-12 cursor-not-allowed"></div>
      )}
      {isDeleteForm && (
        <div className="fixed  left-0 right-0 flex justify-center top-16">
          <div className=" w-4/12 bg-white shadow p-2 rounded space-y-2">
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteForm(false)}
                className="hover:text-red-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-center text-yellow-600">
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="text-sm">
              Are you sure you want to delete the post!
            </div>
            <div className="flex justify-end">
              <motion.button
                disabled={deletePostIsLoading}
                onClick={handleDeletePostForm}
                whileHover={{ scale: 1.07 }}
                className="bg-red-600 text-white rounded-lg px-3 py-1 text-xs"
              >
                {deletePostIsLoading ? (
                  <span className="flex justify-center gap-1 items-center">
                    <img src={loading} alt="loading" className="w-3 h-3" />
                    <span>Deleting..</span>
                  </span>
                ) : (
                  <span>Delete</span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <article className="flex justify-center">
          <div className="flex items-center">
            <img src={loading} alt="loading" className="w-6 h-6 " />
            <span>Loading...</span>
          </div>
        </article>
      )}

      {!isLoading && (
        <>
          {posts.map((post) => {
            const { id, message } = post;
            return (
              <Post
                key={id}
                id={id}
                message={message}
                deletePostOnClick={deletePostOnClick}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default FacebookPosts;
