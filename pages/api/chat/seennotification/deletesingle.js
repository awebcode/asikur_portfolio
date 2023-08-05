import User from "@/models/userModel";
import db from "@/utils/db";

db();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await deleteSingle(req, res);
      break;
  }
};

// delete notifications
const deleteSingle = async (req, res) => {
  try {
    const { userId, messagenotification } = req.body;
    console.log("not",req.body);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { messageseennotification: { _id: messagenotification } },
      },
      {
        new: true,
      }
      // return the updated user object
    );

    console.log("updatedUser", updatedUser);

    res.status(200).json({
      success: true,
      message: "Notification Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete notification",
      error,
    });
  }
};
