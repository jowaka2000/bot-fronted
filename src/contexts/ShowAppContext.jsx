import { createContext, useState, useContext } from "react";
import axiosClient from "../axiosClient";

const StateContext = createContext({
  posts: [],
  isLoading: null,
  isAppSubscribed:null,
  app:null,
  isAppLoading:null,
  isAppActive:false,
  isAppApproved:true,
  isTelegramBotActivated:false,
  setIsAppActive:()=>{},
  setIsAppLoading:()=>{},
  setIsAppSubscribed:()=>{},
  handleSetApp:()=>{},
  setIsLoading: () => {},
  setPosts: () => {},
  loadPosts: () => {},
});

export const ShowAppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [app, setApp] = useState({});
  const [isAppSubscribed, setIsAppSubscribed] = useState(false);
  const [isAppLoading,setIsAppLoading]=useState(true);
  const [isAppActive,setIsAppActive]=useState();
  const [isAppApproved,setIsAppApproved]=useState(true);
  const [isTelegramBotActivated,setIsTelegramBotActivated]=useState(false);

  const loadPosts = (appId) => {
    axiosClient
      .get(`/schedule-post/posts/${appId}`)
      .then(({ data }) => {
        if (data.schedulers) {
          setPosts(data.schedulers);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  };

  const handleSetApp = (id) => {
    axiosClient
      .get(`/user-apps/${id}`)
      .then(({ data }) => {
        setApp(data.app);
        setIsAppSubscribed(data.app.subscribed);
        setIsAppActive(data.app.active);
        setIsAppLoading(false);
        setIsAppApproved(data.app.approved);
        setIsTelegramBotActivated(data.app.activated);
      })
      .catch((error) => {
        setIsAppLoading(false);
        // console.log(error);
      });
  };

  return (
    <StateContext.Provider
      value={{
        posts,
        isLoading,
        app,
        isAppSubscribed,
        isAppLoading,
        isAppActive,
        isAppApproved,
        isTelegramBotActivated,
        setIsAppActive,
        setIsAppSubscribed,
        setIsAppLoading,
        handleSetApp,
        setIsLoading,
        setPosts,
        loadPosts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useShowAppContext = () => useContext(StateContext);
