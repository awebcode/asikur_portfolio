


import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await accessChat(req, res);
      break;
  }
};

const accessChat = async (req, res) => {
  db()
  const { userId, currUserId } = req.body;
//  const result=await isAuthenticatedUser(req,res)
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: currUserId } } }, //result._id
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [currUserId, userId], //result._id
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
     return res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
}

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected

