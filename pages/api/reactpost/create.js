
import { blog } from "@/models/blogModel";
import postReactModel from "@/models/ReactModel/ProductReactModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

db();
export default async (req, res) => {
  
  switch (req.method) {
    case "PUT":
      
      await reactPost(req, res);
      break;

    
  }
};
const reactPost = async (req, res) => {
  
  // const result = await isAuthenticatedUser(req, res);
  // console.log("postr",result)
  try {
    const { id } = req.query;
     const { postId, react, userId,userName,postCreatorId } = req.body;
      let { likes } = await blog.findOne({ _id: postId });
    
    console.log("postId",likes)
    const check = await postReactModel.findOne({
      postRef: postId,
      reactBy: new mongoose.Types.ObjectId(userId), //result._id
    });
    if (check == null) {
      const newReact = new postReactModel({
        react: react,
        postRef: postId,

        reactBy: userId, //result._id
      });
      let newcm = await blog.updateOne({ _id: postId }, { likes: likes + 1 });
      // console.log("newlikess", newcm);
      
      // Notification part
      if (userId !== postCreatorId) {
        const notification = {
          message: `${userName} ${react} React on Your post.`,
          user: userId,
          path: `/blog/${postId}`,
          createdAt: new Date(),
        };
      
        await User.findByIdAndUpdate(postCreatorId, {
          $push: {
            notification,
          },
        });
      }
       
      await newReact.save();
      return res.status(200).json({ success: true });
    } else {
      if (check.react == react) {
        let newcm = await blog.updateOne({ _id: postId }, { likes: likes - 1 });
         console.log("declikess", newcm);
        await postReactModel.findByIdAndRemove(check._id);
        
      } else {
       
        await postReactModel.findByIdAndUpdate(check._id, {
          react: react,
        });
        let newcm = await blog.updateOne({ _id: postId }, { likes: likes });
        console.log("updlikess", newcm);
      }
    }
  } catch (error) {
    console.log("errorreact",error);
    return res.status(500).json({ message: error.message });
  }
};