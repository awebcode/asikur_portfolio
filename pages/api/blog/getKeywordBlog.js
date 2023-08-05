import { blog } from "@/models/blogModel";

import db from "@/utils/db";
require("@/models/userModel");
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
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { desc: { $regex: req.query.keyword, $options: "i" } },
            { tag: { $regex: req.query.keyword, $options: "i" } },
            { category: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};
    const allBlogs = await blog.find(keyword).populate("user");
    //blog.save()
    return res.status(200).json({ success: true, msg: "All Blogs", allBlogs });
  } catch (error) {
    console.log("keywordBlog",error)
    return res.status(500).json({ success: false, msg: error.message});
  }
};
