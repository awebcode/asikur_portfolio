import { blog } from "@/models/blogModel";
import TagModel from "@/models/TagModel"
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
   
  
    case "PATCH":
      await updateTag(req, res);
      break;
    case "DELETE":
      await deleteTag(req, res);
      break;
  }
};
const createTag = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

  // if (req.user.role !== "admin")
  //   return res.status(400).json({ msg: "Invalid Authentication." });

  try {
    const name = req.body.name.toLowerCase();

      const newTag = new TagModel({ name });
    await newTag.save();

    res.json({ newTag });
  } catch (err) {
    let errMsg;

    if (err.code === 11000) {
      errMsg = Object.values(err.keyValue)[0] + " already exists.";
    } else {
      let name = Object.keys(err.errors)[0];
      errMsg = err.errors[`${name}`].message;
    }

    return res.status(500).json({ msg: errMsg });
  }
};

const updateTag = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

  // if (req.user.role !== "admin")
  //   return res.status(400).json({ msg: "Invalid Authentication." });

  try {
    const { id } = req.query;
    const tag = await TagModel.findOneAndUpdate(
      {
        _id: id,
      },
      { name: req.body.name.toLowerCase() }
    );

    res.json({ msg: "Update Success!", tag });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const deleteTag = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

  // if (req.user.role !== "admin")
  //   return res.status(400).json({ msg: "Invalid Authentication." });

  try {
    const { id } = req.query;
    const product = await blog.findOne({ category: id });
    if (product)
      return res.status(400).json({
        msg: "Can not delete! In this category also exist blog.",
      });

    const tag = await TagModel.findByIdAndDelete(id);
    if (!tag) return res.status(400).json({ msg: "Category does not exists." });

    res.json({ msg: "Delete Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
