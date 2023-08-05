import mongoose from "mongoose";

const chatModel =  mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clone",
    },
   
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Chat= mongoose.models?.Chat || mongoose.model("Chat", chatModel);


export default Chat;