import { blog } from "@/models/blogModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import Comments from "@/models/commentModel";
import User from "@/models/userModel";


db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await replyComment(req, res);
      break;
    
  }
};




const replyComment = async (req, res) => {
  // const result = await isAuthenticatedUser(req, res);
  // if (!result) return res.status(400).json({ msg: "invalid Authentication." });

  try {
    const { content, blog_id, blog_user_id, comment_root, reply_user, image, user } = req.body;
    console.log("repCom",user)
    //    if (image) {
    //      const myCloud = await cloudinary.v2.uploader.upload(image, {
    //        folder: "comment_images",
    //      });
    //      image = myCloud.secure_url;
    //    }

    const newComment = new Comments({
      user: user?._id, //result?._id
      userImg: user.image, //result.avatar
      image,
      content,
      blog_id,
      blog_user_id,
      comment_root,
      reply_user: reply_user._id,
    });

    await Comments.findOneAndUpdate(
      { _id: comment_root },
      {
        $push: { replyCM: newComment._id },
      }
    );

    const data = {
      ...newComment,
      user: user, //result
      reply_user: reply_user._id,
      createdAt: new Date().toISOString(),
    };
    //   await NotificationModel.create({
    //     subject: `${req.user.name} reply comment on your product`,
    //     user: req.user,
    //     prid: blog_id,
    //   });
    if (user._id !== reply_user._id) {
      const notification = {
        message: `${user.name} replied Your Comment.`,
        user: user._id,
        path: `/blog/${blog_id}`,
        createdAt: new Date(),
      };
      await User.findByIdAndUpdate(reply_user._id, {
        $push: {
          notification,
        },
      });
    }
    await newComment.save();

    return res.json(newComment);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
