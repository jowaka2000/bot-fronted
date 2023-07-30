import React from "react";

const AddAppFirstPage = ({ state, dispatch }) => {
  return (
    <section className="px-4 space-y-8 py-4">
      <article>
        <label className="text-gray-800 text-sm font-semibold">Select Bot Type</label>
        <select
          defaultValue={state.botType}
          onChange={(e) =>
            dispatch({ type: "CHANGE_BOT_TYPE", payLoad: e.target.value })
          }
          className="w-full outline-none p-2 border border-gray-300 hover:border-gray-400 rounded text-sm"
        >
          <option value="facebook-page">Facebook Page Bot</option>
          <option value="telegram-channel">
            Telegram Channel Bot
          </option>
          <option disabled value="facebook-group">
            Facebook Group Bot
          </option>
          <option value="telegram-group">
            Telegram Group Bot
          </option>
          <option disabled value="telegram-user">
            Telegram User Bot
          </option>
          <option disabled value="facebook-user">
            Facebook User Profile Bot
          </option>
         
          <option disabled value="twitter">
            Twitter Bot
          </option>
        </select>
      </article>

      <div className="flex items-center justify-end pt-4 pb-2">
        <button
          onClick={()=>dispatch({type:'MOVE_TO_SECOND_PAGE'})}
          className="flex items-center text-green-600 hover:text-green-700 hover:underline"
        >
          <span className="text-xl">NEXT</span>
          <span>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default AddAppFirstPage;
