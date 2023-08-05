import { blog } from "@/models/blogModel";
import { isAuthenticatedUser } from "@/utils/auth";
import mongoose from "mongoose";
import Comments from "../../../models/commentModel"
import User from "@/models/userModel";
const { default: db } = require("@/utils/db");

db()
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createComment(req, res);
      break;
   
    case "PATCH":
      await updateComment(req, res);
      break;
    case "DELETE":
      await deleteComment(req, res);
      break;
  }
    
};




const createComment = async (req, res) => {
    //  const result=await isAuthenticatedUser(req,res)
    // if (!result) return res.status(400).json({ msg: "invalid Authentication." });

  try {
    const { id } = req.query;

    let { comments } = await blog.findOne({ _id: id });

    let { content, blog_id, blog_user_id, image, user } = req.body;

    const newComment = new Comments({
      user: user._id, ///result._id
      userImg: user.image, //result.avatar
      image,
      content,
      blog_id,
      blog_user_id,
    });

    const data = {
      ...newComment._doc,
      user: user, //result

      createdAt: new Date().toISOString(),
    };
      // const io = new Server(res.socket.server);
      // res.socket.server.io = io;
    // if (res.socket.server.io) {
    //   console.log("Socket is already running");
    // } else {
    //   console.log("Socket is initializing");
    //   const io = new Server(res.socket.server);
    //   res.socket.server.io = io;
    //   io.to(`${blog_id}`).emit("createComment", data)
    // }
    if (user._id !== blog_user_id) {
      const notification = {
        message: `${user.name} commented on Your post.`,
        user: user._id,
        path: `/blog/${blog_id}`,
        createdAt: new Date(),
      };
      await User.findByIdAndUpdate(blog_user_id, {
        $push: {
          notification,
        },
      });
    }
    await newComment.save();
    
    let newcm = await blog.updateOne({ _id: id }, { comments: comments + 1 });
   
    //  io.on("connection", (socket) => {
    //    console.log(`${socket.id} connected`);
    //   //  socket.broadcast.emit("joinRoom", newComment);
    //    socket.on("getCommentdata", (e) => {
    //      io.emit("createComment", e);
    //    });
    //  });
     res.status(201).json(newComment);
  } catch (err) {
      console.log("comment",err);
      return res.status(500).json({ msg: err.message });
    }
  }
 


const updateComment = async (req, res) => {
      // const result=await isAuthenticatedUser(req,res)
      // if (!result) return res.status(400).json({ msg: "invalid Authentication." });

     try {
       const { data } = req.body;
      //  console.log("upddta",data)
         const { id } = req.query;
       const comment = await Comments.findOneAndUpdate(
         {
           _id: id,
           user: data.user?._id, //result._id
         },
         { content: data.content }
       );

       if (!comment) return res.status(400).json({ msg: "Comment does not exits." });
  //  const notification = {
  //    message: `${data.user?.name} Updated comment on Your post.`,
  //    user: data.user?._id,
  //    createdAt: new Date(),
  //  };
  //  await User.findByIdAndUpdate(id, {
  //    $push: {
  //      notification,
  //    },
  //  });
        res.status(200).json({success:true, msg: "Update Success!" });
     } catch (err) {
       return res.status(500).json({ msg: err.message });
     }
   }
const deleteComment = async (req, res) => {
      const result = await isAuthenticatedUser(req, res);
      if (!result) return res.status(400).json({ msg: "invalid Authentication." });
console.log("DelComresult",result)
    try {
       const { id } = req.query;
       const comment = await Comments.findOneAndDelete({
         _id: id,
         $or: [{ user: result?._id }, { blog_user_id: result?._id }],
       });

       if (!comment) return res.status(400).json({ msg: "Comment does not exits." });

       if (comment.comment_root) {
         // update replyCM
         await Comments.findOneAndUpdate(
           { _id: comment.comment_root },
           {
             $pull: { replyCM: comment._id },
           }
         );
       } else {
         // delete all comments in replyCM
         await Comments.deleteMany({ _id: { $in: comment.replyCM } });
       }

       return res.json({ msg: "Delete Success!" });
     } catch (err) {
       return res.status(500).json({ msg: err.message });
     }
   };



