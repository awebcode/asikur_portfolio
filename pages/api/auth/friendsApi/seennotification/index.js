import User from "@/models/userModel";
import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await removerSingle(req, res);
      break;
  }
};

const removerSingle = async (req, res) => {
  try {
    const userId = req.body.userId;
    const notifications = await User.findById(userId, "notification");
    const removedNotifications = notifications.notification;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { notification: {} } },
      { multi: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $push: { seennotification: { $each: removedNotifications } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Notifications Mark As Read successfully",
      data: removedNotifications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete notifications",
      error,
    });
  }
};
