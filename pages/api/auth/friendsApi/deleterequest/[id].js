import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await deleteRequest(req, res);
      break;
  }
};
const deleteRequest = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  try {
    const { userId } = req.body;
    const { id } = req.query;
    if (userId !== id) {
      const receiver = await User.findById(userId);
      const sender = await User.findById(id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $pull: {
            requests: sender._id,
            followers: sender._id,
          },
        });
        await sender.updateOne({
          $pull: {
            following: receiver._id,
          },
        });
        // Notification part
        const notification = {
          message: `${receiver.name} deleted your friend request`,
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
        // }
        res.json({ success: true, message: "delete request😍" });
        
      } else {
        return res.status(400).json({ message: "Already deleted" });
      }
    } else {
      return res.status(400).json({ message: "You can't delete yourself" });
    }
  } catch (error) {
    console.log("delreq",error)
    res.status(500).json({ message: error.message });
  }
};