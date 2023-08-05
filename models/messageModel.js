import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    seen: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Array
    }
  },
  { timestamps: true }
);

const Message = mongoose.models?.Clone || mongoose.model("Clone", messageSchema);

export default Message;
