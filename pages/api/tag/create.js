import TagModel from "@/models/TagModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createTag(req, res);
      break;
    case "GET":
      await getTag(req, res);
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
const getTag = async (req, res) => {
  try {
    const allTag = await TagModel.find().sort("-createdAt");
    res.json({ allTag });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};