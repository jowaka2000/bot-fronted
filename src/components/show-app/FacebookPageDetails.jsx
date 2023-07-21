import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import loading from "../../assets/loading.gif";
import { useStateContext } from "../../contexts/ContextProvider";

const FacebookPageDetails = () => {
  const data = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [app, setApp] = useState({});
  const [isAccessLoading, setIsAccessLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { isAdmin } = useStateContext();

  const id = data.id;

  useEffect(() => {
    axiosClient
      .get(`/user-apps/${id}`)
      .then(({ data }) => {
        setApp(data.app);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSubmitAccessToken = (e) => {
    e.preventDefault();

    if (accessToken !== "") {
      setIsAccessLoading(true);

      const payLoad = {
        id,
        accessToken,
      };

      axiosClient
        .post("/user-apps/update-access-token", payLoad)
        .then(({ data }) => {
          setIsAccessLoading(false);
          setAccessToken("");
        })
        .catch((error) => {
          console.log(error);
          setIsAccessLoading(false);
        });
    }
  };

  return (
    <section className="block md:flex justify-between px-1 md:px-8 space-y-3 md:space-y-0">
      <div className="w-full md:basis-1/2 space-y-2">
        <div className="flex text-sm text-gray-700 md:justify-start justify-between">
          <div className="md:basis-2/3">
            <article>{`Page Id: ${isLoading ? "....." : app.page_id}`}</article>
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
        <div className="w-full md:basis-1/2">
          <form onSubmit={handleSubmitAccessToken} className="w-full space-y-1">
            <div>Access Token</div>
            <article className="flex w-full border border-slate-300 rounded hover:border-slate-400">
              <input
                type="text"
                name="access_token"
                placeholder="access token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-10/12 p-1 outline-none  text-sm "
              />
              <button
                disabled={isAccessLoading || isLoading}
                className="disabled:cursor-not-allowed text-sm bg-green-600 text-white w-2/12 flex justify-center items-center"
              >
                {isAccessLoading || isLoading ? (
                  <img src={loading} alt="loading" className="w-7 h-7" />
                ) : (
                  <span>Update</span>
                )}
              </button>
            </article>
          </form>
        </div>
      )}
    </section>
  );
};

export default FacebookPageDetails;
