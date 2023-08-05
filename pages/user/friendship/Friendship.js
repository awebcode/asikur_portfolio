import { loadUser } from "@/actions/userAction";
import { NotificationAdd } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";


import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../../actions/followUnfollow";
import NotificationPage from "../../Notification";
import useClickOutside from "../profile/intro/clickOutside";
import axios from "axios";
import { toast } from "react-toastify";
export default function Friendship({ friendshipp, profileid }) {
  // console.log("freendship", friendshipp)
  // console.log("profileid", profileid);
  const Navigate = useRouter();
  const dispatch = useDispatch();
  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);
  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));
  const { user } = useSelector((state) => state.user);
  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileid,user._id);
  };
  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileid,user._id);
  };
  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileid,user._id);
  };
  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileid,user._id);
  };
  const acceptRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptRequest(profileid,user._id);
  };
  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unfriend(profileid,user._id);
  };
  const deleteRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteRequest(profileid,user._id);
  };
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  //
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
    Navigate.push("/message");
  };
  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => followHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={() => unfriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler()}>
          <img src="../../../icons/cancelRequest.png" className="invert" alt="" />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={menu1}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequestHanlder()}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => deleteRequestHanlder()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
        {/* {console.log("friends",profileid)} */}
        <button onClick={()=>handleContact(profileid)} className={friendship?.friends ? "blue_btn" : "gray_btn"}>
          <img
            src="../../../icons/message.png"
            className={friendship?.friends && "invert"}
            alt=""
          />
          <span>Message</span>
        </button>
        {profileid === user?._id && (
          <Badge
            badgeContent={user?.notification?.length}
            color="warning"
            onClick={() => Navigate.push("/Notification")}
            style={{ cursor: "pointer" }}
          >
            <NotificationAdd color="white" />
          </Badge>
        )}
        {/* <div style={{display:"none"}}> */}
        {/* <NotificationPage noti={user?.notification} /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
