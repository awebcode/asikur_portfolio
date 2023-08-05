import User from "@/models/userModel";
import db from "@/utils/db";
import sendToken from "@/utils/getJwtToken";

db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //  return next(new ErrorHandler("Please Enter Email & Password", 400));
      return res.status(500).json({ msg: "Please Enter Email & Password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }
    // const hashp = await bcrypt.compare(password,user.password);
    const hashp = await user.comparePassword(password);
    if (!hashp) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }
    console.log("login user",user)
    sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
    console.log("login err", error);
    return res.status(500).json({ msg: error.message });
  }
};