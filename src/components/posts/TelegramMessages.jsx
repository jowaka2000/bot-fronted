import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useShowAppContext } from "../../contexts/ShowAppContext";

const TelegramMessages = () => {
  const [chats, setChats] = useState([]);

  const { app } = useShowAppContext();

  
  useEffect(() => {
    axiosClient
      .get(`/telegram/get-chats/${app.id}`)
      .then(({ data }) => {
        setChats(data.chats);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [app]);

  return (
    <div className="container mx-auto flex justify-center">
      <article className="w-full md:w-5/12 border-r border-l px-4">
        <div className="flex w-full justify-center text-sm font-semibold">
          Chats{" "}
        </div>

        <div className="space-y-3">
          {chats.map((chat) => {
            const { text } = chat;

            return <div className="sm-shadow p-1">{text}</div>;
          })}
        </div>
      </article>
    </div>
  );
};

export default TelegramMessages;
