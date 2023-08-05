import User from "@/models/userModel";
import db from "@/utils/db";
import sendToken from "@/utils/getJwtToken";
import { getToken } from "next-auth/jwt";

db()
export default async (req, res) => {
  
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
    case "POST":
      await login(req, res);
      break;
  }
};
