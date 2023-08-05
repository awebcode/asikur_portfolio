import postReactCommentModel from "@/models/ReactModel/CmReactModel";

import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import mongoose from "mongoose";

db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await reactPostComment(req, res);
      break;

   
  }
};
const reactPostComment = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  try {
    const { id } = req.query;
    const { postId, react, userId,userName,commentCreatorId } = req.body;
    const check = await postReactCommentModel.findOne({
      postRef: postId,
      reactBy: new mongoose.Types.ObjectId(userId), ////result._id
    });
    if (check == null) {
      const newReact = new postReactCommentModel({
        react: react,
        postRef: postId,
        reactBy: userId, ////result._id
      });
      // await newReact.save();
      // Notification part
      if (userId !== commentCreatorId) {
        const notification = {
          message: `${userName} ${react} React on Your Comment.`,
          user: userId,
          path: `/blog/${postId}`,
          createdAt: new Date(),
        };

        await User.findByIdAndUpdate(commentCreatorId, {
          $push: {
            notification,
          },
        });
      }

      
      await newReact.save();
      return res.json({ success: true });
    } else {
      if (check.react == react) {
        await postReactCommentModel.findByIdAndRemove(check._id);
      } else {
        await postReactCommentModel.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    console.log("errorcmreact",error);
    return res.status(500).json({ message: error.message });
  }
};

