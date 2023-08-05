import Message from "@/models/messageModel";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await seenChat(req, res);
      break;
  }
};
const seenChat = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("id", id);
    const seenmsg = await Message.findByIdAndUpdate(
      { _id: id },
      { seen: true },
      { new: true }
    );

    return res.status(200).json({ success: true, seenmsg });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
