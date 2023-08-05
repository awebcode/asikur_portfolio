import { blog } from "@/models/blogModel";

import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
 
    case "GET":
      try {
        const { id } = req.query;
        const blogDetails = await blog.findById(id).populate("user");

        if (!blogDetails) {
          return next(new ErrorHandler("Product not found", 404));
        }

        res.status(200).json({
          success: true,
          blogDetails,
        });
      } catch (error) {
        console.log(error.msg);
        return res.status(500).json({ success: false, msg: error.msg });
      }
  }
};
