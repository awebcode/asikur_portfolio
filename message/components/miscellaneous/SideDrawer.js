import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu";
import { message, Tabs } from "antd";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import Image from "next/image";



import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";

import { Spinner } from "@chakra-ui/spinner";

import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { useRouter } from "next/router";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "@/message/config/ChatLogics";
import { ChatState } from "@/message/Context/ChatProvider";
import Cookies from "js-cookie";
import { Delete } from "@material-ui/icons";
import Badge from "@mui/material/Badge";
import { signOut } from "next-auth/react";
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from "@/actions/userAction";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [seennotif, setSeenNotif] = useState([]);
   const { user } = useSelector((state) => state.user);
  const {
    setSelectedChat,

    chats,
    setChats,
    
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(`/api/chat/allUser?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      setLoadingChat(true);
      const currUserId = user._id;
      const { data } = await axios.post(`/api/chat/createChat`, { userId, currUserId });

      if (chats && !chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  //notification part ////////
  const dispatch = useDispatch();
  const navigate = useRouter();

  // const [loading, setLoading] = useState(false);
  // unseeen slice start
  const [visibleNotifications, setVisibleNotifications] = useState();

  const handleLoadMore = () => {
    const newVisibleNotifications = user?.messagenotification?.slice(
      0,
      visibleNotifications?.length + 5
    );
    setVisibleNotifications(newVisibleNotifications);
  };

  const handleLoadLess = () => {
    setVisibleNotifications(user?.messagenotification?.slice(0, 5));
  };
  useEffect(() => {
    setVisibleNotifications(user?.messagenotification?.slice(0, 5));
  }, [user?.messagenotification]);
  // unseeen slice end
  // seeen slice start
  const [visibleSeenNotifications, setSeenVisibleNotifications] = useState();

  const handleLoadMoreSeen = () => {
    const newVisibleNotifications = user?.messageseennotification?.slice(
      0,
      visibleSeenNotifications?.length + 5
    );
    setSeenVisibleNotifications(newVisibleNotifications);
  };

  const handleLoadLessSeen = () => {
    setSeenVisibleNotifications(user?.messageseennotification?.slice(0, 5));
  };
  useEffect(() => {
    setSeenVisibleNotifications(user?.messageseennotification?.slice(0, 5));
  }, [user?.messageseennotification]);

  // seeen slice end

  const handleMarkAllRead = async () => {
    try {
      if (window.confirm("Are you sure Mark All Read?")) {
        setLoading(true);
        const res = await axios.put("/api/chat/seennotification", {
          userId: user._id,
        });
        setLoading(false);
        dispatch(loadUser());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.msg);
        }
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handleMarkSingleRead = async (i) => {
    try {
      setLoading(true);

      const res = await axios.put("/api/chat/seennotification/readsingle", {
        userId: user._id,
        messagenotification: i,
      });
      setLoading(false);
      if (res.data.success) {
        dispatch(loadUser());
        message.success(res.data.message);
      } else {
        message.error(res.data.msg);
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handleSingleDelete = async (i) => {
    try {
      if (window.confirm("Are you sure want to delete This?")) {
        const res = await axios.put("/api/chat/seennotification/deletesingle", {
          userId: user._id,
          messagenotification: i,
        });
        dispatch(loadUser());
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("somthing went wrong");
    }
  };
  // delete notifications
  const handleDeleteAllFinally = async () => {
    try {
      setLoading(true);
      if (window.confirm("Are you sure want to delete all?")) {
        const res = await axios.put("/api/chat/seennotification/deleteAll", {
          userId: user._id,
        });
        dispatch(loadUser());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };

  return (
    <>
      <Box
        // d="flex"
        // justifyContent="space-between"
        // alignItems="center"
        // bg="green"
        // w="100%"
        // p="5px 10px 5px 10px"
        // borderWidth="5px"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 10px 5px 10px",
          borderRadius: "5px",
          backgroundColor: "#334155",
        }}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <SearchIcon />
            <Text d={{ base: "none", md: "flex" }} px={4} color="black">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontFamily="Work sans" className="chat-font">
          Happy Messaging
        </Text>
        <div>
          <Menu justifyContent="end">
            <MenuButton>
              {/* <NotificationBadge count={notification?.length} effect={Effect.SCALE} /> */}
              <NotificationBadge
                count={user?.messagenotification && user.messagenotification?.length}
                // effect={SCALE}
                style={{
                  backgroundColor: "red",
                  padding: "5px 4px 15px 4px",
                  textAlign: "center",
                  color: "white",
                }}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} backgroundColor={"whatsapp.900"}>
              <Tabs>
                <Tabs.TabPane tab="Unseen Notifications" key={0}>
                  <div className="d-flex justify-content-end">
                    <h4
                      className="p-2"
                      onClick={handleMarkAllRead}
                      style={{ color: "#ccd6f6" }}
                    >
                      Mark All Read ({user?.messagenotification?.length})
                    </h4>
                  </div>

                  <h3 style={{ padding: "20px 5px" }}>
                    ({user?.messagenotification && user.messagenotification?.length}
                    )Notifications
                  </h3>
                  <h4 style={{ color: "ButtonHighlight" }}>
                    {" "}
                    {!visibleNotifications?.length && "No New Messages"}
                  </h4>
                  {visibleNotifications
                    ?.sort((a, b) => {
                      return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                    ?.map((notificationMgs, i) => {
                      return (
                        <div
                          className="cardNotification"
                          style={{ cursor: "pointer" }}
                          // onClick={() => handleMarkSingleRead(notificationMgs)}
                        >
                          <div
                            className="card-text"
                            onClick={() => {
                              setSelectedChat(notificationMgs?.chat),
                              handleMarkSingleRead(notificationMgs)}}
                          >
                            <p>
                              <span>
                                <Link
                                  href={`/user/profile/${notificationMgs?.user?._id}`}
                                >
                                  <Image
                                    src={notificationMgs?.user?.image}
                                    alt={notificationMgs?.user?.name}
                                    height={20}
                                    width={20}
                                    style={{ animation: "none", display: "inline-block" }}
                                  />
                                </Link>
                              </span>{" "}
                              {notificationMgs.message}{" "}
                            </p>
                            <span
                              className="p-2"
                              onClick={() => handleMarkSingleRead(notificationMgs)}
                              style={{ padding: "8px 0px" }}
                            >
                              Mark As Read
                            </span>
                            <span style={{ padding: "8px 8px" }}>
                              <a onClick={() => setSelectedChat(notificationMgs?.chat)}>
                                View Message
                              </a>
                            </span>
                            <span style={{ padding: "8px 6px" }}>
                              <Link href={notificationMgs.path}>view Profile</Link>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  {visibleNotifications?.length === user?.messagenotification?.length ? (
                    ""
                  ) : (
                    <>
                     
                      {user?.messagenotification?.length > 5 && (
                        <button onClick={handleLoadMore} className="common-btn">
                          <i></i>
                          <i></i> <a>Load More</a>
                        </button>
                      )}
                    </>
                  )}

                  {visibleNotifications?.length > 5 && ( //visibleNotifications?.length === user?.notification?.length &&
                    <button onClick={handleLoadLess} className="common-btn">
                      <i></i>
                      <i></i> <a>Load Less</a>
                    </button>
                  )}
                </Tabs.TabPane>
                {/* {user?.seennotification && user?.seennotification?.length>=1 ? (
          <>
            {" "} */}
                <Tabs.TabPane tab="Seen Notifications" key={2}>
                  <div className="d-flex justify-content-end">
                    <h4
                      className="p-2"
                      onClick={handleDeleteAllFinally}
                      style={{ color: "#ccd6f6" }}
                    >
                      Delete All Read ({user?.messageseennotification?.length})
                    </h4>
                  </div>
                  <h3 style={{ padding: "20px 5px" }}>
                    (
                    {user?.messageseennotification &&
                      user.messageseennotification?.length}
                    )Notifications
                  </h3>
                  <h1 style={{ color: "ButtonHighlight" }}>
                    {" "}
                    {!visibleSeenNotifications?.length && "No New Messages"}
                  </h1>
                  {visibleSeenNotifications &&
                    visibleSeenNotifications
                      ?.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      })
                      ?.map((notificationMgs, i) => {
                        return (
                          <div className="cardNotification" style={{ cursor: "pointer" }}>
                            <div
                              className="card-text"
                              onClick={() => setSelectedChat(notificationMgs?.chat)}
                            >
                              <a>
                                <p>
                                  <span>
                                    <Link
                                      href={`/user/profile/${notificationMgs?.user?._id}`}
                                    >
                                      <Image
                                        src={notificationMgs?.user?.image}
                                        alt={notificationMgs?.user?.name}
                                        height={20}
                                        width={20}
                                        style={{
                                          animation: "none",
                                          display: "inline-block",
                                        }}
                                      />
                                    </Link>
                                  </span>{" "}
                                  {notificationMgs.message}{" "}
                                </p>
                                <span
                                  className="p-2"
                                  onClick={() => handleSingleDelete(notificationMgs._id)}
                                >
                                  Delete Parmanent
                                </span>
                                <span style={{ padding: "0px 6px" }}>
                                  <a
                                    onClick={() => setSelectedChat(notificationMgs?.chat)}
                                  >
                                    view message
                                  </a>
                                </span>
                                <span style={{ padding: "0px 6px" }}>
                                  <Link href={notificationMgs.path}>view Profile</Link>
                                </span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  {visibleSeenNotifications?.length ===
                  user?.messageseennotification?.length ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      {user?.messageseennotification?.length > 5 && (
                        <button onClick={handleLoadMoreSeen} className="common-btn">
                          <i></i>
                          <i></i> <a>Load More</a>
                        </button>
                      )}
                    </>
                  )}

                  {visibleSeenNotifications?.length > 5 && (
                    <button onClick={handleLoadLessSeen} className="common-btn">
                      <i></i>
                      <i></i> <a>Load Less</a>
                    </button>
                  )}
                </Tabs.TabPane>
                {/* </>
        ) : (
          ""
        )} */}
              </Tabs>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              rightIcon={<ChevronDownIcon />}
              style={{ animation: "none" }}
              animation="none"
            >
              <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.image} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
