import Chat from "@/models/chatModel";

import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
require("@/models/chatModel");
require("@/models/messageModel");
require("@/models/userModel");
  db();
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
       
         const result = await isAuthenticatedUser(req, res);
         await Chat.find({ users: { $elemMatch: { $eq: result?._id } } })
           .populate("users", "-password")
           .populate("groupAdmin", "-password")
           .populate("latestMessage")
             //comment latesetM then work
           .sort({ updatedAt: -1 })
           .then(async (results) => {
            //  console.log("chats:,", results);
             results = await User.populate(results, {
               path: "latestMessage.sender", //latestMessage.sender
               select: "name image email",
             });
             res.status(200).send(results);
           }); 
      } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
      }
    default:
      return;
  }
  
}
  
