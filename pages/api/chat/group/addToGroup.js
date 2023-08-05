






import Chat from "@/models/chatModel";
import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await addToGroup(req, res);
      break;
  }
};
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
}
