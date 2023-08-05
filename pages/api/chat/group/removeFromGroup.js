


import Chat from "@/models/chatModel";
import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await removeFromGroup(req, res);
      break;
  }
};
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};
