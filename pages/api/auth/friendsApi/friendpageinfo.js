import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import mongoose from "mongoose";

db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getFriendsPageInfos(req, res);
      break;
  }
};

const getFriendsPageInfos = async (req, res) => {
       const result = await isAuthenticatedUser(req, res);
  try {
    const user = await User.findById(result._id)
      .select("friends requests")
      .populate("friends")
      .populate("requests");
    const sentRequests = await User.find({
      requests:new mongoose.Types.ObjectId(result._id),
    }).select("name avatar");
    res.json({
      friends: user.friends,
      requests: user.requests,
      sentRequests,
    });
  } catch (error) {
    console.log("friendpageinfoerr",error)
    res.status(500).json({ message: error.message });
  }
};
