import User from "@/models/userModel";
import { isAuthenticatedUser } from "@/utils/auth";
import db from "@/utils/db";

db();
export default async (req, res) => {
    switch (req.method) {
      case "PUT":
        await updateDetails(req, res);
        break;
     
    };
}
    const updateDetails = async (req, res) => {
         const result = await isAuthenticatedUser(req, res)
        try {
            await db();
            const { infos,userId } = req.body;
            
    // console.log("userId",req.body)
            const updated = await User.findByIdAndUpdate(
              userId, // result._id,
              {
                details: infos,
              },
              {
                new: true,
              }
            );
            res.status(200).json(updated.details);
        } catch (error) {
            console.log("updateDetails error",error)
            res.status(500).json({ message: error.message });
        }
    }

 

