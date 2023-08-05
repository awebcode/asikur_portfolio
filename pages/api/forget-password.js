import User from "@/models/userModel";
import db from "@/utils/db";
import nodemailer from "nodemailer";

const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT =process.env.EMAIL_PORT
const EMAIL_SECURE =process.env.EMAIL_SECURE
const EMAIL_USERNAME = process.env.EMAIL_USERNAME
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_FROM = process.env.EMAIL_FROM
const CLIENT_URL =process.env.CLIENT_URL // or your client URL // "http://localhost:3000" || 
db();
export default async function handler(req, res) {
  const { email } = req.body;

  try {
    // Create a new transporter to send the email
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      service:"gmail",
     secure: EMAIL_SECURE,
      
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    // Create a password reset token
    const token = Math.random().toString(36).substr(2, 25);

    // Send the password reset email
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: "Reset Your Password By Asikur Porftfolio Website.",
      text: `Click the following link to reset your password: ${CLIENT_URL}/resetPassword?token=${token}`,
      html: `
        <p>Click the following link to reset your password:</p>
        <p><a href="${CLIENT_URL}/resetPassword?token=${token}">${CLIENT_URL}/resetPassword?token=${token}</a></p>
      `,
    });
      const user = await User.findOneAndUpdate(
        { email: email },
        { $set: { passwordResetToken: token } },
        { new: true }
      );
      await user.save();
     
    // Return a success response
    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.log(error);
    // Return an error response
    res.status(500).json({ message: "Something went wrong!" });
  }
}
