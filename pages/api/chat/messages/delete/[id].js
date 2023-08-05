import Message from "@/models/messageModel";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteMessage(req, res);
      break;
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.query;

    await Message.findByIdAndDelete(id);

    return res.status(200).json({ success: true,message:"Message Removed Successfully🤨😎"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
