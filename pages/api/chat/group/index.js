

import Chat from "@/models/chatModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createGroupChat(req, res);
      break;
    case "PUT":
      await renameGroup(req, res);
      break;
  }
};
const createGroupChat = async (req, res) => {
  // const result = await isAuthenticatedUser(req, res);
  const { currUser } = req.body;
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required to form a group chat");
  }

  users.push(currUser); //req.user //result=currUser

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: currUser, //req.user //currUser=result
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};
