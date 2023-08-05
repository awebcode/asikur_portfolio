import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";
import { useEffect, useRef } from "react";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { toast } from "react-toastify";
import BottomScrool from "./BottomScrool";

const ScrollableChat = ({ messages, fetchMessages }) => {
  const { user } = ChatState();
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current &&
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const { data } = await axios.delete(`/api/chat/messages/delete/${id}`);
      fetchMessages();
      toast.success(data.message);
    }
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Menu>
                <MenuButton className="messageAvatarBg">
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender?.name}
                    src={m.sender?.image}
                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Profile">
                    <MenuItem>
                      <Link href={`/user/profile/${m.sender._id}`}>View Profile</Link>
                    </MenuItem>
                    <MenuItem>Block</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Help">
                    <MenuItem>Mute</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            )}

            <span
              style={{
                backgroundColor: `${m.sender?._id === user?._id ? "#BEE3F8" : "#B9F5D0"}`,
                marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                marginTop: isSameUser(messages, m, i, user?._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              <span
                style={{
                  color: "#0f172a",
                  display: "block",
                  fontSize: "8px",
                  marginTop: "-4px",
                  marginLeft: "-5px",
                }}
              >
                -{moment(m.createdAt).format("llll")}
              </span>
              <span style={{ color: "#0f172a" }}>{m.content}</span>
              <span>
                <Delete
                  style={{ fontSize: "10px", margin: "0px 10px" }}
                  onClick={() => deleteMessage(m._id)}
                />
              </span>
            </span>
          </div>
        ))}
      <div ref={scrollRef} id="messageBottom" />
    </ScrollableFeed>
  );
};

export default ScrollableChat;
