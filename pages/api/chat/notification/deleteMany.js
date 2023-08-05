import Notification from "@/models/notificationModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");

db();
export default async (req, res) => {
    switch (req.method) {
        case "DELETE":
            await notificationDeleteAll(req, res);
            break;
    }
};
const notificationDeleteAll = async (req, res) => {
  try {
  
    const newNoti = await Notification.deleteMany({status:"seen"});
    return res.status(200).json({ success: true,msg:"All Notification Deleted Successfull",newNoti});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.msg });
  }
};

