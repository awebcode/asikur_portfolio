// Create Token and saving in cookie

import cookieParser from "cookie-parser";

 import cookie, { serialize } from "cookie";
// import Cookies from "js-cookie";
const sendToken = (user, statusCode, res) => {
   const token = user.getJWTToken();
  
  // options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite:'strict',
    //  path:'/api/token',
  };

    // serialize("nexttokenss", token,options)
     // res.setHeader("Set-Cookie", cookie.serialize("nexttoken", token, options));
  // cookieParser.signedCookie("nexttoken",token,options)
  //  console.log("getJwtPageUser",user)
    res.json({
      success: true,
      user,
      token,
    });
};

export default sendToken;
