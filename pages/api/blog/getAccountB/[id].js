import { blog } from "@/models/blogModel";

import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getBlogUserForAccount(req, res);
      break;
    
  }
};

const getBlogUserForAccount = async (req, res) => {
  

  try {
    const { id } = req.query;
    // console.log("idofgetaccoutnblob",id)
    const allBlogs = await blog.find({ user: id }).populate("user");

    return res.status(200).json({ success: true, msg: "All Blogs", allBlogs });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, msg: error.message });
  }
};
