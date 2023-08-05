import db from "@/utils/db";

import cookie from "cookie";
db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await logout(req, res);
      break;
  }
};
const logout = async (req, res, next) => {
 
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  
  res.setHeader("Set-Cookie", cookie.serialize("nexttoken", null, options));
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
