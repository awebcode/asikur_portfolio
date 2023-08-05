

import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import { getSession } from "next-auth/react";
db()
export default async function setPassword(req, res) {
//   const session = await getSession({ req });
// //   const session = await isAuthenticatedUser( req,res );
//     console.log("sessionPass",session)
    const { email, Password,cPassword } = req.body;
    console.log("passapi",req.body)
  if (!email) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  
  if (!Password) {
    res.status(400).json({ error: "Password is required" });
    return;
  }
   if (Password!==cPassword) {
     res.status(400).json({ error: "Password is Not Match!" });
     return;
   }
  const saltRounds = 12;
   const hashedPassword = await bcrypt.hash(Password, saltRounds);
  try {
  
    const result = await User
      .updateOne({ email: email }, { $set: { password:hashedPassword } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}