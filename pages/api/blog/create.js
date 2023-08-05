import { blog } from "@/models/blogModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";


// Connect to database
db();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createBlog(req, res);
      break;
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, desc, category, tag, images, user } = req.body;


    // Find the user who created the blog post
    const sender = await User.findById(user);

    // Create the new blog post
    const newBlog = await blog.create({ title, desc, category, tag, images, user });

    // If the user is an admin, create notifications for all users
    if (sender.role === "admin") {
      const users = await User.find({ _id: { $ne: sender._id } });
      users.forEach(async (user) => {
        
          const notification = {
            message: `${sender.name} created a new post...`,
            user: sender._id,
            path: `/blog/${newBlog._id}`,
            createdAt: new Date(),
          };
          await User.findByIdAndUpdate(user._id, {
            $push: {
              notification,
            },
          });
       
      });
    } else {
      // If the user is not an admin, create notifications for their followers
      if (sender.followers && sender.followers.length > 0) {
        sender.followers.forEach(async (follower) => {
          const notification = {
            message: `${sender.name} created a new post...`,
            user: sender._id,
            path: `/blog/${newBlog._id}`,
            createdAt: new Date(),
          };
          await User.findByIdAndUpdate(follower, {
            $push: {
              notification,
            },
          });
        });
      }
    }

    // Return success response
    return res
      .status(201)
      .json({ success: true, msg: "Blog created successfully", newBlog });
  } catch (error) {
    // Return error response
    console.log(error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};
