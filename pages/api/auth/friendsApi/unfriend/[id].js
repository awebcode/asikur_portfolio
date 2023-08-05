import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await unfriend(req, res);
      break;
  }
};

const unfriend = async (req, res) => {
//  const result = await isAuthenticatedUser(req, res);
  try {
     const { userId } = req.body;
    const { id } = req.query;
    if (userId !== id) {
      const sender = await User.findById(userId);
      const receiver = await User.findById(id);
      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });
        await sender.updateOne({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });
        // Notification part
        const notification = {
          message: `${sender.name} Has been unfriend You`,
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
       
        res.json({sucess: true, message: "unfriend request accepted" });
      } else {
        return res.status(400).json({ message: "Already not friends" });
      }
    } else {
      return res.status(400).json({ message: "You can't unfriend yourself" });
    }
  } catch (error) {
    console.log("unfr", error
    )
    res.status(500).json({ message: error.message });
  }
};
