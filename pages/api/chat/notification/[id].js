import Notification from "@/models/notificationModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
db();
export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await notificationDelete(req, res);
      break;
    
  }
};
const notificationDelete = async (req, res) => {
  try {
    const { id } = req.query;
    await Notification.findByIdAndDelete({_id:id});
    return res.status(200).json({ success: true,msg:"Delete Successfull!☺" });
  } catch (error) {
    console.log("deleteerr",error.msg);
    return res.status(500).json({ error: error.msg });
  }
};
