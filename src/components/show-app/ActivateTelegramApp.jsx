import React from "react";
import { useShowAppContext } from "../../contexts/ShowAppContext";
import ActivateTelegram from "../ActivateTelegram";
import {motion} from 'framer-motion';

const ActivateTelegramApp = ({ state, dispatch }) => {
  const { isAppApproved, isTelegramBotActivated, isAppLoading } =
    useShowAppContext();
  return (
    <>
      {isAppApproved && (
        <>
          {!isTelegramBotActivated &&
            state.isActivateButton &&
            !isAppLoading && (
              <motion.div whileInView={{y:40}}  className="absolute -top-4 flex justify-center w-[98%] z-[24]">
                <article className="homeShadow bg-white w-full px-2 md:w-5/12 flex justify-center px-3 py-4 pt-8 border border-green-400">
                  <div className="w-full space-y-10">
                    <div className="text-green-700 text-xl">
                      Congratulations! Your Bot has been configured and set
                      successfully! Click the button bellow to activate the Bot
                    </div>
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{scale:1.04}}
                        onClick={() =>
                          dispatch({
                            type: "SET_ACTIVATE_WINDOW",
                            payLoad: true,
                          })
                        }
                        className="bg-green-600 px-8 py-1 text-white font-semibold basis-2/5"
                      >
                        Activate
                      </motion.button>
                    </div>
                  </div>
                </article>
              </motion.div>
            )}

          {isAppApproved && (
            <>
              {!isTelegramBotActivated && state.isActivateComponent && (
                <ActivateTelegram dispatch={dispatch} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ActivateTelegramApp;
