
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";

import db from "@/utils/db";
db()
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await allUsers(req, res);
      break;
  }
};
const allUsers = async (req, res) => {
       const result = await isAuthenticatedUser(req, res);
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: result._id } });
  res.send(users);
}
