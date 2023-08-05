
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";


db();
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await addFriend(req, res);
            break;
    }
};



const addFriend = async (req, res) => {
  // const result =await isAuthenticatedUser(req, res);
  // console.log("addfr",result)
  try {
    const { userId } = req.body;
        const { id } = req.query;
    if (userId !== id) {
      //result._id

      const sender = await User.findById(userId); //result._id
     
      const receiver = await User.findById(id);
     
      
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id) &&
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { requests: sender._id },
        });
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        // Notification part
        const notification = {
          message: `${sender.name} sent you a friend request`,
          user: sender._id,
          path: `/user/profile/${sender._id}`,
          createdAt: new Date(),
        };
        // const user = await User.findById(receiver._id);
        // const check = user.notification.find(
        //   (x) => x.user._id.toString() === sender._id.toString()
        // );
        // console.log("check", check);
        // if (check) {
        //   const res = await User.updateOne(
        //     {
        //       _id: receiver._id,
        //       "notification._id": check._id,
        //     },
        //     {
        //       $set: { "notification.$.createdAt": new Date() },
        //     }
        //   );
        // } else {
         await User.findByIdAndUpdate(receiver._id, {
            $push: {
              notification,
            },
          });

          // console.log("resNoti", res);
        // }
         res.json({sucess:true, message: "friend request has been sent" });
         
          
         
      } else {
        //  console.log("addfrerr1", error);
        return res.status(400).json({ message: "Already sent" });
      }
    } else {
      
      return res.status(400).json({ message: "You can't send a request to yourself" });
    }
    } catch (error) {
      console.log("addfrerr",error)
    res.status(500).json({ message: error.message });
  }
};
