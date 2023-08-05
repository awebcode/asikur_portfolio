import { blog } from "@/models/blogModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

import sendToken from "@/utils/getJwtToken";


db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await userDetails(req, res);
      break;
  }
};
const userDetails = async (req, res, next) => {
  try {
    const result = await isAuthenticatedUser(req, res);
    // console.log("detailsUser",result)
    const { id } = req.query;
    const user = await User.findById(result?._id);
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
     const profile = await User.findOne({_id: id }).select("-password");
     const friendship = {
       friends: false,
       following: false,
       requestSent: false,
       requestReceived: false,
     };
     if (!profile) {
       return res.json({ ok: false });
     }

     if (user.friends.includes(profile._id) && profile.friends.includes(user._id)) {
       friendship.friends = true;
     }
     if (user.following.includes(profile._id)) {
       friendship.following = true;
     }
     if (user.requests.includes(profile._id)) {
       friendship.requestReceived = true;
     }
     if (profile.requests.includes(user._id)) {
       friendship.requestSent = true;
     }
  const posts = await blog.find({ user: profile._id })
   .populate("user")
      .sort({ createdAt: -1 });
  
    await profile.populate("friends");
    res.json({ ...profile.toObject(), posts, friendship });
  } catch (error) {
    console.log("details error")
    return res.status(500).json({ msg: error.message });
  }
};
