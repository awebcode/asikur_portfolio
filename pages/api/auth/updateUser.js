
import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";
import sendToken from "@/utils/getJwtToken";


db();
export default async (req, res) => {
  switch (req.method) {
   
    case "PATCH":
      await updateProfile(req, res);
      break;
  }
};


// update User Profile
const updateProfile = async (req, res, next) => {
  // const result = await isAuthenticatedUser(req, res);
  try {
    const { name, email, image,userId } = req.body;
    console.log(req.body);
     

      const user = await User.findByIdAndUpdate(userId,{ name,email,image}, {
        new: true,
        // runValidators: true,
        // useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        msg: "User Updated",
        user,
      });
  } catch (error) {
    console.log(error)
      res.status(500).json({msg:error.message})
     }
}
