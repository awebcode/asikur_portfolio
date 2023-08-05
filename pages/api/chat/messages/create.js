


import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
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
      await sendMessage(req, res);
      break;
  }
};

//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req, res) => {
  // const result = await isAuthenticatedUser(req, res);
  const { content, chatId,currUserId,userId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  // console.log("msgscretate",req.body)
  var newMessage = {
    sender: currUserId, //result._id
    content: content,
    chat: chatId,
  };
  const user = await User.findById(currUserId)
  const receiver = await User.findById(userId);
   console.log("send",user,receiver)
  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name  image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name  image email",
    });
    // let notifications = message.notifications;
    // console.log("noti",notifications)
     const  messagenotification = {
       //  messagenotification
       message: `You Have A New Message From ${user.name}`,
       chat:chatId,
       user: user._id,
       path: `/user/profile/${user._id}`,
       createdAt: new Date(),
     };
     
     await User.findByIdAndUpdate(receiver._id, {
       $push: {
          messagenotification,
       },
     });
    
    //  await Message.findByIdAndUpdate(message._id, { notifications: notifications });
     await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
     console.log(error)
    res.status(400);
    throw new Error(error.message);
  }
};
