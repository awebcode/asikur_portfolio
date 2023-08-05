
import Category from "@/models/CategorModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createCategory(req, res);
      break;
    case "GET":
      await getCategory(req, res);
      break;
  }
  
};
const createCategory = async (req, res) => {
  const result = await isAuthenticatedUser(req, res);
  if (!result) return res.status(400).json({ msg: "Invalid Authentication." });

  // if (req.user.role !== "admin")
  //   return res.status(400).json({ msg: "Invalid Authentication." });

  try {
    const name = req.body.name.toLowerCase();

    const newCategory = new Category({ name });
    await newCategory.save();

    res.json({ newCategory });
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
 const getCategory = async (req, res) => {
   try {
     const allCategory = await Category.find().sort("-createdAt");
     res.json({ allCategory });
   } catch (err) {
     console.log(err);
     return res.status(500).json({ msg: err.message });
   }
 };