import { blog } from "@/models/blogModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getBlogUser(req, res);
      break;
  }
};
const getBlogUser = async (req, res) => {
    
    
  try {
    const result = await isAuthenticatedUser(req, res);
    const allBlogs = await blog.find({user:result._id}).populate("user");
    
     res.status(200).send({ success: true, msg: "All Blogs", allBlogs });
  } catch (error) {
     res.status(500).send({ success: false, msg: error.msg });
  }
};
