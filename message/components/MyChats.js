import { AddIcon } from "@chakra-ui/icons";
import {  Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";


import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import moment from "moment";
import { useRouter } from "next/router";


const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
const navigate=useRouter()
  const { selectedChat, setSelectedChat, user, chats, setChats, realTimeGetChat } =
    ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("/api/chat/getChat", config);
      setChats(data);
      setFetchAgain(!fetchAgain);
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
    const currentUser1 = localStorage.getItem("currentUser");
    if (currentUser1) {
      setLoggedUser(JSON.parse(localStorage.getItem("currentUser")));
    }
    fetchChats(); 
      
       
        
         // Reset `fetchAgain` to false after fetching chats
      
    fetchUser();
    // eslint-disable-next-line
  }, [fetchAgain]);
  const fetchUser = async (e) => {
    const { data } = await axios.get(`/api/auth/userDetails`);
    setLoggedUser(data.user);
    // console.log("userChatProvuerData", data);
  };

  const seenMsg = async (id) => {
    const { data } = await axios.put(`/api/chat/messages/seen/${id}`);
    // console.log("seendata", data);
    fetchChats();
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      // bg="white"
      w={{ base: "100%", md: "31%", sm: "100%" }}
      // style={{ display: selectedChat ? "none" : "flex" }}
      borderRadius="lg"
      borderWidth="1px"
      className={selectedChat ? "mychats-none" : "mychats"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <span> My Chats</span>
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            // rightIcon={<AddIcon />}
          >
            New Group Chat <AddIcon style={{ padding: "0px 3px" }} />
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        // bg="#F8F8F8"
        w="100%"
        h="100vh"
        borderRadius="lg"
        overflowY="auto"
        className="mychats-box"
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                onClick={() => {setSelectedChat(chat), navigate.push("#messageBottom");}}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#cbd5e1"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {chat?.latestMessage?.seen === false ? (
                    <>
                      <span className="notification_indicator"></span>
                    </>
                  ) : (
                    ""
                  )}
                  <span
                    style={{
                      fontSize: "16px",
                      color: chat?.latestMessage?.seen === false ? "#a4a" : "#000",
                    }}
                  >
                    {" "}
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </span>
                </Text>
                {/* {console.log(
                  ("notification", chat.latestMessage.notifications[0]?.message)
                )} */}
                {/* {console.log("lastmessage",chat?.latestMessage?.seen)} */}

                {chat.latestMessage && (
                  <Text
                    fontSize="xs"
                    onClick={() => seenMsg(chat.latestMessage._id)}
                    style={{
                      color: chat.latestMessage.seen === false ? "#3b0764" : "#000",
                      fontWeight: chat.latestMessage.seen === false ? "600" : "200",
                      fontSize: chat.latestMessage.seen === false ? "16px" : "12px",
                    }}
                  >
                    <b>
                      <span
                        style={{
                          color:
                            chat.latestMessage.seen === false ? "#3b0764" : "#0e7490",
                        }}
                      >
                        {chat.latestMessage.sender?.name}{" "}
                      </span>
                    </b>
                    {/* {console.log(realTimeGetChat)} */}
                    <span style={{ color: "#0f172a", fontSize: "14px" }}>
                      <>
                        {chat.latestMessage.content?.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage?.content}{" "}
                      </>

                      <span style={{ color: "#0f172a", fontSize: "10px" }}>
                        -{moment(chat.latestMessage?.createdAt).calendar()}
                      </span>
                    </span>
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
