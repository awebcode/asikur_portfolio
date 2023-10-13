

import User from "@/models/userModel";

import { getSession } from "next-auth/react";

export const isAuthenticatedUser = async (req, res) => {
  const { nexttoken } = req.cookies;
  // console.log("nexttoken",nexttoken)
  //  const token1 = req.cookies["next-auth.session-token"];
  // const token = await getToken({ req: req, secret:secret, encryption: true,raw:true });
  // console.log("token1", token1);
  // const nexttoken = req.headers.authorization;
  let user;
  
  const session = await getSession({ req });
  //  console.log("token1AuthFile",session, session &&session.user);
  // if (!nexttoken || !session) {
  //   return res.status(401).json({ msg: "Please Login to access this resource" });
  // }
//   if (nexttoken) {
//     decodedData = jwt.verify(nexttoken, process.env.JWT_SECRET);
//      user = await User.findById(decodedData.id).populate("friends followers following details");
// }
  if (session) {
     user = await User.findById(session.user.id).populate(
       "friends followers following details notification.user seennotification.user messagenotification.user messagenotification.chat messageseennotification.user messageseennotification.chat"
     );
    // user.avatar = session.user.image;
    
  }
  
  //  console.log("authuser", user);
  
  return user;
};

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };

//************************************************************

///if i use it don't show api stolled request err in next js project
// In your auth middleware file (e.g., authMiddleware.js)
// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     // Get the token from the request headers or cookies
//      console.log(req.cookies.nexttoken);
//     const token = req.headers.authorization || req.cookies.nexttoken;

//     if (!token) {
//       res.status(401).json({ message: "Unauthorized" });
//       reject();
//     }

//     try {
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.SECRET); // Change with your secret key
//       req.user = decoded;
//       resolve();
//     } catch (error) {
//       res.status(401).json({ message: "Invalid token" });
//       reject();
//     }
//   });
// };

