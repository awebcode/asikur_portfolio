import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";

import Lottie from "react-lottie";
import animationData from "./animations/typing.json";

import io from "socket.io-client";

import { ChatState } from "../Context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import { getSender, getSenderFull } from "../config/ChatLogics";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ProfileModal from "./miscellaneous/ProfileModal";
import { Send } from "@material-ui/icons";
import BottomScrool from "./BottomScrool";
var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const ENDPOINT = "https://socket-s14w.onrender.com"; // "https://socket-s14w.onrender.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
   

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    userNotification,
    setUserNotification,
    realTimeGetChat,
    setRealTimeGetChat,
  } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(`/api/chat/messages/${selectedChat?._id}`);
      // console.log("getData1", data);
      setMessages(data);
      // console.log("dt50", data[data.length - 1]);
      //  setUserNotification(data[data.length-1].notifications);
      setLoading(false);

      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const [usersId, setUsersId] = useState();
  //  console.log("x1", usersId);
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
             "access-ControlAllow-Origin":"*"
           
          },
        };
        setNewMessage("");
        // console.log("selectedc", selectedChat)
        const x = selectedChat.users.forEach((x) => {
          if (x._id !== user._id) {
              setUsersId(x._id)
            }
        })
        console.log("x",usersId)
        const { data } = await axios.post(
          "/api/chat/messages/create",
          {
            content: newMessage,
            chatId: selectedChat,
            currUserId: user._id,
            userId: selectedChat?.users[0]._id === user._id
                    ? selectedChat?.users[1]._id
                    : selectedChat?.users[0]._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        
        
      } catch (error) {
        // console.log(error)
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  //test me send message
  const sendMessage1 = async (event) => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat?._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "access-ControlAllow-Origin": "*",
          },
        };
        setNewMessage("");
        // console.log("selectedc", selectedChat);
        const x = selectedChat.users.forEach((x) => {
          if (x._id !== user._id) {
            setUsersId(x._id);
          }
        });
        // console.log("x", usersId);
        const { data } = await axios.post(
          "/api/chat/messages/create",
          {
            content: newMessage,
            chatId: selectedChat,
            currUserId: user._id,
            userId:
              selectedChat?.users[0]._id === user._id
                ? selectedChat?.users[1]._id
                : selectedChat?.users[0]._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        // console.log(error);
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);
 

 const fetchChats = async () => {
   // console.log(user._id);
   try {
     const config = {
       headers: {
         Authorization: `Bearer ${user?.token}`,
       },
     };
     const { data } = await axios.get("/api/chat/getChat", config);
  
    //  console.log("getchat", data);
   } catch (error) {
     toast({
       title: "Error Occured!",
       description: "Failed to Load the chats",
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom-left",
     });
   }
 };
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log("newmsgreceived", newMessageRecieved.notifications[0]);
      //     setUserNotification([newMessageRecieved.notifications[0], ...userNotification]); //newMessageRecieved
      //    localStorage.setItem("notifications", newMessageRecieved.notifications[0]);
      // if (
      //   !selectedChatCompare || // if chat is not selected or doesn't match current chat
      //   selectedChatCompare?._id !== newMessageRecieved.chat?._id
      // ) {
      //   if (!notification.includes(newMessageRecieved)) {
      //     setNotification([newMessageRecieved, ...notification]); //newMessageRecieved
      //     setFetchAgain(!fetchAgain);
      //   }
      //   //user Notification
       
       
         
      // } else {
        setMessages([...messages, newMessageRecieved]);
        fetchChats();
        // fetchMessages()
        // setFetchAgain(!fetchAgain)
        
      // }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              style={{ position: "fixed" }}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <span> {getSender(user, selectedChat?.users)}</span>
                  <ProfileModal user={getSenderFull(user, selectedChat?.users)} />
                </>
              ) : (
                <>
                  <span>{selectedChat.chatName.toUpperCase()}</span>
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            // w="100%"
            // h="100%"
            borderRadius="lg"
            className="single-chat-box"
          >
            {loading ? (
              <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} fetchMessages={fetchMessages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}

                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                // variant="filled"
                // bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
              <span
                onClick={sendMessage1}
                style={{
                  position: "absolute",
                  right: "60px",
                  top: "6.5px",
                  zIndex: "9999999",
                  cursor: "pointer",
                }}
                className="sentdbtn"
              >
                <Send />
              </span>
            </FormControl>
          </Box>
          
        </>
      ) : (
        // to get socket.io on same page
        <Box
          // style={{
          //   display: "flex",
          //   height: "100%",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   padding: "5px 10px 5px 10px",
          //   borderRadius: "5px",
          //   }}
          // display={{ base: "flex", md: "none" }}
          className="startchattingpage"
        >
          <Text
            fontSize={{ base: "24px", md: "18px", lg: "56px" }}
            pb={3}
            fontFamily="Work sans"
            color="blackAlpha.900"
          >
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
