
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";


db();
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await cancelRequest(req, res);
            break;
    }
};



const cancelRequest = async (req, res) => {
   const result = await isAuthenticatedUser(req, res);
  try {
      const { userId } = req.body;
     const { id } = req.query;
     if ( userId !== id) {
       const sender = await User.findById(userId);
       const receiver = await User.findById(id);
       if (
         receiver.requests.includes(sender._id) &&
         !receiver.friends.includes(sender._id)
       ) {
         await receiver.updateOne({
           $pull: { requests: sender._id },
         });
         await receiver.updateOne({
           $pull: { followers: sender._id },
         });
         await sender.updateOne({
           $pull: { following: receiver._id },
         });
         // Notification part
         const notification = {
           message: `${sender.name}  Cancelled/Removed friend request`,
           user: sender._id,
           path: `/user/profile/${sender._id}`,
           createdAt: new Date(),
         };

         await User.findByIdAndUpdate(receiver._id, {
           $push: {
             notification,
           },
         });
          res.json({ sucess: true, message: "friend request has been Cancelled😭😢" });
       } else {
         return res.status(400).json({ message: "Already Canceled" });
       }
     

         // console.log("resNoti", res);
      
      
     } else {
       return res.status(400).json({ message: "You can't cancel a request to yourself" });
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
};