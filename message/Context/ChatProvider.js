import { loadUser } from "@/actions/userAction";
import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
   const [userNotification, setUserNotification] = useState([]);
  const [chats, setChats] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [realTimeGetChat, setRealTimeGetChat] = useState([]);
  const history = useRouter();
  const dispatch=useDispatch()
const {user:currUser}=useSelector((s)=>s.user)
  useEffect(() => {
    dispatch(loadUser())
    const userInfo = JSON.parse(localStorage.getItem("currentUser"));
    if (userInfo) {
      setUser(userInfo);
    } 
fetchUser()
    // if (!userInfo || !currUser) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  // console.log("userChatProvuer",user)
  const fetchUser = async (e) => {
   const { data } = await axios.get(`/api/auth/userDetails`);
    setUser(data.user);
    // console.log("userChatProvuerData", data);
 }
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        userNotification,
        setUserNotification,
        activeUsers,
        setActiveUsers,
        realTimeGetChat,
        setRealTimeGetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
