

import User from "@/models/userModel";

import { getSession } from "next-auth/react";

export const isAuthenticatedUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { nexttoken } = req.cookies;
      let user;

      const session = await getSession({ req });

      if (session) {
        user = await User.findById(session.user.id).populate(
          "friends followers following details notification.user seennotification.user messagenotification.user messagenotification.chat messageseennotification.user messageseennotification.chat"
        );
      }

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
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

