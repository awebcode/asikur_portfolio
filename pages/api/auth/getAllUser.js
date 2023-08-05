

import User from "@/models/userModel";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
  }
};
const getUsers = async (req, res) => {
  try {
      const allUsers = await User.find();
    //blog.save()
    return res.status(200).json({ success: true, msg: "All Users", allUsers });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.msg });
  }
};
