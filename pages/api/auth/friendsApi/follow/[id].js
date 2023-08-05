
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";


db();
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await follow(req, res);
            break;
    }
};



const follow = async (req, res) => {
const result = await isAuthenticatedUser(req, res);
  try {
   const { userId } = req.body;
   const { id } = req.query;
   if (userId !== id) {
     const sender = await User.findById(userId);
     const receiver = await User.findById(id);
     if (
       !receiver.followers.includes(sender._id) &&
       !sender.following.includes(receiver._id)
     ) {
       await receiver.updateOne({
         $push: { followers: sender._id },
       });

       await sender.updateOne({
         $push: { following: receiver._id },
       });
       // Notification part
       const notification = {
         message: `${sender.name} Followed You.`,
         user: sender._id,
         path: `/user/profile/${sender._id}`,
         createdAt: new Date(),
       };
      //  const user = await User.findById(receiver._id);
      //  const check = user.notification.find(
      //    (x) => x.user._id.toString() === sender._id.toString()
      //  );
      //  console.log("check", check);
      //  if (check) {
      //    const res = await User.updateOne(
      //      {
      //        _id: receiver._id,
      //        "notification._id": check._id,
      //      },
      //      {
      //        $set: { "notification.$.createdAt": new Date() },
      //      }
      //    );
      //  } else {
        await User.findByIdAndUpdate(receiver._id, {
           $push: {
             notification,
           },
         });

         // console.log("resNoti", res);
      //  }
       

       res.json({success:true, message: "follow success" });
     } else {
       return res.status(400).json({ message: "Already following" });
     }
   } else {
     return res.status(400).json({ message: "You can't follow yourself" });
   }
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
};