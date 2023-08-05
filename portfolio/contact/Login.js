import React, { useEffect, useState } from "react";
import { clearHistoryAction, loadUser, login} from "../../actions/userAction";
// import "./contact.css";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

import { signIn, signOut } from "next-auth/react";
import { LoginWithOtherMethod } from "./LoginWithOtherMethod";
import Cookies from "js-cookie";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const Login = () => {
  const navigate = useRouter();
  const [Err,setErr]=useState(null)
  const { query } = navigate;

  // Extract the blog post ID from the query parameter
  const blogPostName = query?.name;
  const blogPostId = query?.id;
  
  // const cleanBlogpostId = blogPostId.toString().replace(": ''", "");
  // console.log("cleatblogpostId", cleanBlogpostId);
  // const cl = JSON.stringify(blogPostId);
  // console.log(blogPostId)
  const { user: currUser, created, error, isAuthenticated } = useSelector((s) => s.user);
  const [ShowPassword, setShowPassword] = useState();
 const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading,setLoading]=useState(false)
  //  console.log("user",user)
  const [rememberMe, setRememberMe] = useState(false);

  function handleRememberMeChange(e) {
    setRememberMe(e.target.checked);
  }
  const { name, email, password } = user;
  
 const registerSubmit = async (e) => {
   e.preventDefault();

   const { name, email, password } = user;

   try {
     setLoading(true);
     const result = await signIn("credentials", {
       redirect: false,
       name,
       email,
       password:password,
     });
      if (rememberMe) {
        const encryptedEmail =await AES.encrypt(email, "mysecretKeyAsikur").toString();
        const encryptedPassword =await AES.encrypt(password, "mysecretKeyAsikur").toString();

        Cookies.set("rememberedEmail", encryptedEmail, { expires: 365 }); // set a cookie that expires in 1year days
        Cookies.set("rememberedPassword", encryptedPassword, { expires: 365 }); // set a cookie that expires in 1year days
      } else {
        Cookies.remove("rememberedEmail");
        Cookies.remove("rememberedPassword");
      }
     if (result?.error) {
       toast.error(result.error);
     } else {
       if (blogPostName) {
         navigate.push(`/${blogPostName}/${blogPostId}`);
        
       } else {
         navigate.push("/account");
         
       }
     }
      setLoading(false);
   } catch (error) {
    //  console.error(error);
     toast.error("An error occurred during registration.");
   }
 };

  const registerDataChange = (e) => {
    
      setUser({ ...user, [e.target.name]: e.target.value });
    
  };
  useEffect(() => {
    dispatch(loadUser())
    if (isAuthenticated === true) {
       if (blogPostName) {
         navigate.push(`/${blogPostName}/${blogPostId}`);
       } else {
         navigate.push("/account");
       }
    }
    if (created === true) {
      toast.success("Yea! Successfully LoggedIn!🥰");
       signOut();
       Cookies.remove("next-auth.session-token");
      // signOut();

      if (blogPostName) {
        navigate.push(`/${blogPostName}/${blogPostId}`);
      } else {
        navigate.push("/account");
      }
      dispatch({ type: CLEAR_ERRORS });
      dispatch(loadUser());
      dispatch(clearHistoryAction());
    }
    if (error) {
      toast.error(error);
      // dispatch({ type: CLEAR_ERRORS });
       dispatch(clearHistoryAction());
    }
    
  }, [dispatch, created, navigate, isAuthenticated, toast]);
 useEffect(() => {
   const { email, password } = user;
   const encryptedEmail = Cookies.get("rememberedEmail");
   const encryptedPassword = Cookies.get("rememberedPassword");

   if (encryptedEmail && encryptedPassword) {
     const decryptedEmail = AES.decrypt(encryptedEmail, "mysecretKeyAsikur").toString(
       Utf8
     );
     const decryptedPassword = AES.decrypt(
       encryptedPassword,
       "mysecretKeyAsikur"
     ).toString(Utf8);
     setUser({
       email: decryptedEmail,
       password: decryptedPassword,
     });
     //  console.log("dec", decryptedEmail,decryptedPassword);
     setRememberMe(true);
   }
 }, []);
  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <motion.h1
            className="main-title"
            whileHover={{ scaleX: 1.2 }}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            // animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              opacity: { duration: 1 },
              y: { type: "spring", stiffness: 60 },
              duration: 0.9,
              ease: "easeInOut",
            }}
          >
            <span>Login To Your </span> Account.
          </motion.h1>
          <div className="contact-main">
            <div class="container-under-contact">
              <div class="contact-box">
                <div class="left"></div>
                <div class="right">
                  <h2>Contact Me</h2>
                  <form onSubmit={registerSubmit}>
                    <input
                      type="email"
                      class="field"
                      placeholder="Your Email"
                      value={email}
                      onChange={registerDataChange}
                      name="email"
                    />
                    <div style={{ position: "relative" }}>
                      <input
                        type={ShowPassword ? "text" : "password"}
                        class="field"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                      />
                      <span
                        onClick={() => setShowPassword(!ShowPassword)}
                        style={{ position: "absolute", right: "10px", top: "10px" }}
                      >
                        {ShowPassword ? "hide" : "show"}
                      </span>
                    </div>

                    <label>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                      />
                      <span style={{ color: "tomato", padding: "0px 5px" }}>
                        Remember me
                      </span>
                    </label>
                    <p>
                      don't have an account? <Link href="/register">register</Link>
                    </p>
                    <p>
                      forget password? <Link href="/forgetPassword">Forget Password</Link>
                    </p>
                    {loading ? (
                      <button
                        class="btn common-btn"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        <i></i>
                        <i></i>
                        <a>Loading...</a>
                      </button>
                    ) : (
                      <button
                        class="btn common-btn"
                        type="submit"
                        disabled={loading ? true : false}
                      >
                        <i></i>
                        <i></i>
                        <a>Send</a>
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginWithOtherMethod />
    </>
  );
};

export default Login;
