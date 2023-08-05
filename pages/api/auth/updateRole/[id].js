import User from "@/models/userModel";
import db from "@/utils/db";


db();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await singleUser(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
    case "PUT":
      await updateUserRole(req, res);
      break;
  }
};
const singleUser = async (req, res, next) => {
  try {
    const { id } = req.query;
    
    const user = await User.findById(id).populate("friends followers following");
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
   
    res.json({msg:"Single User Get Success",user})
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Delete User --Admin
const deleteUser = async (req, res, next) => {
   const {id}=req.query
 try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ msg: `User does not exist with Id: ${id}` });
    }

    await user.deleteOne()

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
 } catch (error) {
  
  return res.status(500).json({ msg: error.message });
 }
};
// update User Role -- Admin
 const updateUserRole = async (req, res, next) => {
   try {
    const { id } = req.query;
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
