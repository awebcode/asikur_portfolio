import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your Notification"],
    },
    receiverId: {
      type: String,
      required:true
      },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    status: {
      type: String,
      default:"unseen"
    }
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
