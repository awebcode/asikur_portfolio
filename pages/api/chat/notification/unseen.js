import Notification from "@/models/notificationModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");

db();
export default async (req, res) => {
  switch (req.method) {
  
    case "GET":
      await notificationGet(req, res);
      break;
  }
};

const notificationGet = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  try {
    const newNoti = await Notification.find({
      status: "unseen",
      receiverId: result._id,
    }).populate("receiver sender chat");
    return res.status(200).json({ success: true, newNoti });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.msg });
  }
};
