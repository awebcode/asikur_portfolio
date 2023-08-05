import { blog } from "@/models/blogModel";
import Category from "@/models/CategorModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
  
    case "PATCH":
      await updateCategory(req, res);
      break;
    case "DELETE":
      await deleteCategory(req, res);
      break;
  }
};

const updateCategory = async (req, res) => {
      const result=await isAuthenticatedUser(req,res)
    if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role !== "admin")
    //   return res.status(400).json({ msg: "Invalid Authentication." });

    try {
        const { id } = req.query;
      const category = await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name: req.body.name.toLowerCase() }
      );

      res.json({ msg: "Update Success!",category });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
const deleteCategory = async (req, res) => {
      const result=await isAuthenticatedUser(req,res)
    if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role !== "admin")
    //   return res.status(400).json({ msg: "Invalid Authentication." });

    try {
        const { id } = req.query;
      const product = await blog.findOne({ category: id });
      if (product)
        return res.status(400).json({
          msg: "Can not delete! In this category also exist product.",
        });

      const category = await Category.findByIdAndDelete(id);
      if (!category) return res.status(400).json({ msg: "Category does not exists." });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
