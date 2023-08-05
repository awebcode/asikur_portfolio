import Chat from "@/models/chatModel";


import User from "@/models/userModel";
import db from "@/utils/db";
import sendToken from "@/utils/getJwtToken";

db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  
  }
};
const register = async (req, res) => {
  try {
    db()
    const { name, email, password, avatar } = req.body;
    const Exists = await User.findOne({ email });
    if (Exists) {
      return res.status(500).json({ msg: "User Already Exists" });
    }
    //const hashp=await bcrypt.hash(password,14)
    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [user._id, "642a0a448e99684e92b84cf9"], //642a0a448e99684e92b84cf9 /admin id
      };
     await Chat.create(chatData);
    // console.log("chat created",chat)
      sendToken(user, 201, res);
    // return res.status(201).json({ msg: "User Created",user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error.message });
  }
};