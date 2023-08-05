import User from "@/models/userModel";
import db from "@/utils/db";

db();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await deleteAllNotificationController(req, res);
      break;
   
  }
};


// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    // user.notifcation = [];
    user.messageseennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};
