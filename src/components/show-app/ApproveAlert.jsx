import React from "react";
import { Link } from "react-router-dom";
import { useShowAppContext } from "../../contexts/ShowAppContext";

const ApproveAlert = ({ setIsaApproveAlert,isApproveAlert }) => {
  const { isAppApproved } =
    useShowAppContext();
  return (
    <>
      {!isAppApproved && isApproveAlert && (
        <div className="absolute flex w-[95%] justify-center z-[30] pl-3 md:pl-0">
          <div className="w-full md:w-8/12 bg-yellow-500 text-red-800 space-y-3 pb-4">
            <div className="flex justify-end p-1">
              <button
                onClick={() => setIsaApproveAlert(false)}
                className="border rounded border-yellow-500 hover:border-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
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
            <div className="text-center text-lg font-semibold">Alert!</div>
            <div className="px-3">
              <p className="text-center">
                Your bot configuration is underway. Please note that it will
                take less than 5 hours to complete the configuration. We
                appreciate your patience and understanding during this time.
                Once the configuration is complete, your bot will be ready to
                assist you. If you have any questions or concerns, please don't
                hesitate to reach out to our support team. {" "}
                <span className="">
                  <i>Keep checking this page</i>
                </span>
              </p>
            </div>
            <div className="text-center ">
              <Link to="/about" className="hover:underline">
                You can click{" "}
                <span className="text-green-900">
                  <i>here</i>
                </span>{" "}
                to read more...
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveAlert;
