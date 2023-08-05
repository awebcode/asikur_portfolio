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

// delete notifications
const removerSingle = async (req, res) => {
  try {
    const { userId, notification } = req.body;
console.log("not",notification)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { notification: { _id: notification?._id } },
        $push: { seennotification: notification },
      },
      { new: true } // return the updated user object
    );

    console.log("updatedUser", updatedUser);

    res.status(200).json({
      success: true,
      message: "Notification Read successfully",
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
