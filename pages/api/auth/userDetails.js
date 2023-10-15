import { blog } from "@/models/blogModel";
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

import sendToken from "@/utils/getJwtToken";


db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await userDetails(req, res);
      break;
  }
};
const userDetails = async (req, res, next) => {
  let user;
  try {
    await db();
    const result = await isAuthenticatedUser(req, res);
    // console.log("detailsUser",result)
    //  console.log("resultLoadUser",result)
    // user = await User.findById(result?._id).populate("friends followers following");
    // user.avatar = user?.image;
    // if (!result) { //!user
    //   return res.status(400).json({ msg: "Plese login to access this resource!!" });
    // }
     
    sendToken(result, 200, res); //result=user
    
   
  } catch (error) {
     console.log("details error")
     res.json();
  }
};
