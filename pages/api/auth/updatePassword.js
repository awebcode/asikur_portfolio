const { default: User } = require("@/models/userModel");
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import sendToken from "@/utils/getJwtToken";
import { compare } from "bcryptjs";

db();
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await updatePassword(req, res);
            break;
    }
};

// update User password
const updatePassword = async (req, res, next) => {
  // const result = await isAuthenticatedUser(req, res);
  const { id } = req.body;
  console.log("updpass",req.body)
  const user = await User.findById(id).select("+password");
  
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return res.status(400).json({ msg: "Old Password Is Incorrect." });
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({ msg: "password does not match." });
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};
