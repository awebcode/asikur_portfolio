import Notification from "@/models/notificationModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");

db();
export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await notificationCreate(req, res);
            break;
       
    
    }
    
};
const notificationCreate = async (req, res) => {
    try {
        const { name, receiver, sender, chat, status, receiverId } = req.body;
        const newNoti = await Notification.create({
          name,
          receiver,
          sender,
          chat,
          status,
          receiverId,
        });
        return res.status(200).json({success:true,newNoti})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.msg})
    }
}
