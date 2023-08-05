import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";


import { toast } from "react-toastify";

import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import { Edit, GitHub } from "@mui/icons-material";
import Facebook from "@material-ui/icons/Facebook";

import Friendship from "@/pages/user/friendship/Friendship";
import IntroForAccount from "./user/profile/intro/OnlyAccount";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import { loadUser } from "@/actions/userAction";
import axios from "axios";
import { follow } from "@/actions/followUnfollow";
import { RemoveRedEyeTwoTone } from "@material-ui/icons";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AccountModal = (props) => {
  const navigate = useRouter();
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };
  const { user } = useSelector((s) => s.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  //converstaions create

  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const handleContact = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
       const currUserId = user._id;
       const { data } = await axios.post(`/api/chat/createChat`, { userId, currUserId },config);
      // console.log("chatData", data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);

      //  onClose();
    } catch (error) {
      toast.error({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    navigate.push("/message");
  };

  return (
    <>
      <div class="header__wrapper">
        {props.open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={props.value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                      <Tab label="Followers" value="1" />
                      <Tab label="Following" value="2" />
                      <Tab label="Friends" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="1"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    {props.user?.followers &&
                      props.user.followers.map((follower) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              margin: "5px 5px",
                            }}
                          >
                            <Link href={`/user/profile/${follower._id}`}>
                              {" "}
                              <Avatar
                                src={follower.image}
                                // onClick={() => navigate.push(`/user/profile/${follower._id}`)}
                              />
                            </Link>

                            <span>{follower.name}</span>
                            {follower._id === user?._id ? (
                              <Button
                                variant="outlined"
                                endIcon={<RemoveRedEyeTwoTone />}
                                onClick={() =>
                                  navigate.push(`/account`)
                                }
                              >
                                Your Profile
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => handleContact(follower._id)}
                              >
                                Message
                              </Button>
                            )}
                          </div>
                        );
                      })}
                  </TabPanel>
                  <TabPanel value="2">
                    {props.user?.following &&
                      props.user.following.map((follower) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              margin: "5px 5px",
                            }}
                          >
                            <Link href={`/user/profile/${follower._id}`}>
                              {" "}
                              <Avatar
                                src={follower.image}
                                // onClick={() => navigate.push(`/user/profile/${follower._id}`)}
                              />
                            </Link>
                            <span>{follower.name}</span>
                            {follower._id === user?._id ? (
                              <Button
                                variant="outlined"
                                endIcon={<RemoveRedEyeTwoTone />}
                                onClick={() => handleContact(follower._id)}
                              >
                                Your Profile
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => handleContact(follower._id)}
                              >
                                Message
                              </Button>
                            )}
                          </div>
                        );
                      })}
                  </TabPanel>
                  <TabPanel value="3">
                    {props.user?.friends &&
                      props.user.friends.map((follower) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              margin: "5px 5px",
                            }}
                          >
                            <Link href={`/user/profile/${follower._id}`}>
                              {" "}
                              <Avatar
                                src={follower.image}
                                // onClick={() => navigate.push(`/user/profile/${follower._id}`)}
                              />
                            </Link>
                            <span>{follower.name}</span>
                            {follower._id === user?._id ? (
                              <Button
                                variant="outlined"
                                endIcon={<RemoveRedEyeTwoTone />}
                                onClick={() => handleContact(follower._id)}
                              >
                                Your Profile
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() => handleContact(follower._id)}
                              >
                                Message
                              </Button>
                            )}
                          </div>
                        );
                      })}
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default AccountModal;
