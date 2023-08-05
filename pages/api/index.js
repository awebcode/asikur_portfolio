const { default: User } = require("@/models/userModel");
const { isAuthenticatedUser } = require("@/utils/auth");
const { default: sendToken } = require("@/utils/getJwtToken");

const userDetails = async (req, res, next) => {
  try {
    const result=await isAuthenticatedUser(req,res)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
// Logout User
 const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};