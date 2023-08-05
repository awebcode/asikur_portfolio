import User from "@/models/userModel";
import db from "@/utils/db";
import bcrypt from "bcryptjs";

db()

export default async function handler(req, res) {
  const { token, confirmPassword } = req.body;
console.log(req.body)
  try {
    // Connect to the database
   

    // Find the user with the confirmPassword reset token
    const user = await User.findOne({ passwordResetToken: token });
console.log(user)
    if (!user) {
      // Return an error response if the token is invalid
      return res.status(400).json({ message: "Invalid token!" });
    }

    // Hash the new confirmPassword
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    // Update the user's confirmPassword and reset the confirmPassword reset token
    await User
      .updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword, passwordResetToken: null } }
      );

    // Return a success response
    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.log(error);
    // Return an error response
    res.status(500).json({ message: "Something went wrong!" });
  }
}
