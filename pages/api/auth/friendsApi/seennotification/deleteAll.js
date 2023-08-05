import User from "@/models/userModel";
import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await deleteAllSeenNotifications(req, res);
      break;
  }
};

const deleteAllSeenNotifications = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $set: { seennotification: [] } }
    );
    console.log("deleteAllSeenNotifications", updated);
    res.status(200).json({
      success: true,
      message: "All seen notifications deleted successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all seen notifications",
      error,
    });
  }
};
