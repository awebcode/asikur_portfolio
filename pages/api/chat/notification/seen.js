import Notification from "@/models/notificationModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
require("@/models/chatModel")
require("@/models/messageModel");
db();
export default async (req, res) => {
  switch (req.method) {
  
    case "PUT":
      await notificationSeen(req, res);
          break;
        case "GET":
      await notificationAllUnSeen(req, res);
      break;
  
  }
};

const notificationSeen = async (req, res) => {
   
    try {
       const { status, id } = req.body;
      const newNoti = await Notification.findByIdAndUpdate(id ,{ status })
    return res.status(200).json({ success: true, newNoti });
  } catch (error) {
    console.log("seenerr",error.message);
    return res.status(500).json({ error: error.message });
  }
};
const notificationAllUnSeen = async (req, res) => {
    const result = await isAuthenticatedUser(req, res);
  try {
   
    const newNoti = await Notification.find({
      status:  "seen",
      receiverId: result?._id,
    }).populate("sender receiver chat");
    return res.status(200).json({ success: true, newNoti });
  } catch (error) {
    console.log("seenerr", error.message);
    return res.status(500).json({ error: error.message });
  }
};
