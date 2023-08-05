import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await acceptRequest(req, res);
      break;
  }
};
const acceptRequest = async (req, res) => {
   
  try {
      const { userId } = req.body;
     const { id } = req.query;
     if (userId !== id) {
       //userId=result._id
       const receiver = await User.findById(userId); ///userId=result._id
       const sender = await User.findById(id);

       if (receiver.requests.includes(sender._id)) {
         await receiver.updateOne({
           $push: { friends: sender._id, following: sender._id },
         });
         await sender.updateOne({
           $push: { friends: receiver._id, followers: receiver._id },
         });
         await receiver.updateOne({
           $pull: { requests: sender._id },
         });

         // Notification part
         const notification = {
           message: `${receiver.name} accept your friend request`,
           user: receiver._id,
           path: `/user/profile/${receiver._id}`,
           createdAt: new Date(),
         };

         await User.findByIdAndUpdate(sender._id, {
           $push: {
             notification,
           },
         });

         // console.log("resNoti", res);
         //  }
         res.json({ success: true, message: "friend request accepted😍" });
       } else {
         return res.status(400).json({ message: "Already friends" });
       }
      
     } else {
       return res
         .status(400)
         .json({ message: "You can't accept a request from  yourself" });
     }
   } catch (error) {
     console.log("accerptreqerr",error)
     res.status(500).json({ message: error.message });
   }
};