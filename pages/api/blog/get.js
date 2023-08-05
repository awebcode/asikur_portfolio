import { blog } from "@/models/blogModel";

import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getBlog(req, res);
      break;
  }
};
const getBlog = async (req, res) => {
  try {
   
    const allBlogs = await blog.find().populate("user").sort("-likes");
    //blog.save()
    return res.status(200).json({ success: true, msg: "All Blogs", allBlogs });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.msg });
  }
};
