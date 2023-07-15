import React, { useRef } from "react";

const FirstPageAddScheduler = ({ state, dispatch }) => {
  const contentRef = useRef();

  const handleClickAddContentButton = () => {
    const content = contentRef.current.value;

    if (content === "") {
      dispatch({
        type: "ERROR_MESSAGE",
        payLoad: "The content field should not be empty!",
      });
    } else {
      dispatch({ type: "ADD_MESSAGE_CONTENT", payLoad: content });

      contentRef.current.value = "";
    }
  };

  const handleRemoveContent = (key) => {
    dispatch({ type: "REMOVE_MESSAGE_CONTENT", payLoad: key });
  };

  const handleUrlOnChange = (e) => {
    dispatch({ type: "ADD_URL", payLoad: e.target.value });
  };

  //handle submit
  const handleOnSubmitFirstPage = (e) => {
    e.preventDefault();
    const content = contentRef.current.value;

    if (state.messageContent.length === 0 && content !== "") {
      dispatch({ type: "ADD_MESSAGE_CONTENT", payLoad: content });

      contentRef.current.value = "";

      dispatch({ type: "MOVE_SECOND_PAGE" });
    } else {
      if (state.messageContent[state.messageContent.length - 1] !== content) {
        if (content !== "") {
          dispatch({ type: "ADD_MESSAGE_CONTENT", payLoad: content });
        }

        contentRef.current.value = "";
      }

      dispatch({ type: "MOVE_SECOND_PAGE" });
    }
  };

  return (
    <div>
      <form>
        <div>
          <div className="flex justify-between w-full">
            <label className="text-sm text-gray-700 font-semibold">
              Content(optional)
            </label>
          </div>
          {state.messageContent && (
            <div className="text-xs w-full pb-1">
              {state.messageContent.map((content, index) => {
                return (
                  <article
                    key={index}
                    className="flex gap-1 items-center border-b"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveContent(index)}
                      className="text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-3 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </button>
                    <span>{content}</span>
                  </article>
                );
              })}
            </div>
          )}
          <textarea
            ref={contentRef}
            className={`text-sm w-full p-2 outline-none border ${"border-slate-400 hover:border-slate-500 "} rounded-lg`}
            rows={3}
            placeholder="Type message here.."
          ></textarea>
          <div className="flex justify-end">
            
            <button
              onClick={handleClickAddContentButton}
              type="button"
              className="px-1 text-green-700 hover:text-green-900 flex items-center gap-1"
              title="Add another message"
            >
              <span className="text-xs pb-[4px]">Click here to add another message</span>
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-700 font-semibold">
            Link(optional)
          </label>
          <input
            type="url"
            name="url"
            value={state.url}
            onChange={handleUrlOnChange}
            placeholder="Type url here.."
            className="text-sm w-full p-2 outline-none border border-slate-400 hover:border-slate-500 rounded-lg"
          />
        </div>

        <div className="py-3 flex w-full justify-end">
          <button
            onClick={handleOnSubmitFirstPage}
            className="flex items-center text-green-600 hover:text-green-700 hover:underline"
          >
            <span className="pt-[3px]">NEXT</span>
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FirstPageAddScheduler;
