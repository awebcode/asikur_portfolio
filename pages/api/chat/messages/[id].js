


import Message from "@/models/messageModel";
import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await allMessages(req, res);
      break;
 
  }
};
const allMessages = async (req, res) => {
 
  try {
    console.log(req.query.id);
    const messages = await Message.find({ chat: req.query.id }) //req.params.chatId
      .populate("sender", "name image email")
      .populate("chat");
      res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

