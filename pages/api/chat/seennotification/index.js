import User from "@/models/userModel";
import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await removerAllSingle(req, res);
      break;
  }
};

const removerAllSingle = async (req, res) => {
  try {
    const userId = req.body.userId;
    const notifications = await User.findById(userId, "messagenotification");
    const removedNotifications = notifications.messagenotification;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { messagenotification: {} } },
      { multi: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $push: { messageseennotification: { $each: removedNotifications } } },
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
