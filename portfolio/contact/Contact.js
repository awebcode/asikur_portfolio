import React, { useEffect, useRef, useState } from "react";
import { clearHistoryAction, loadUser, register } from "../../actions/userAction";
// import "./contact.css";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import { CLEAR_ERRORS } from "../../constants/userConstants";
import { useRouteLoaderData } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import { upload, uploadFile } from "@/utils/upload";
import { motion } from "framer-motion";
import { signIn, signOut } from "next-auth/react";

import Tilt from "react-parallax-tilt";
import Cookies from "js-cookie";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { LoginWithOtherMethod } from "./LoginWithOtherMethod";
const Contact = () => {
  const [ShowPassword, setShowPassword] = useState();
  const navigate=useRouter()
  const {user:currUser,created,error}=useSelector(s=>s.user)
  const dispatch=useDispatch()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
const [loading, setLoading] = useState(false);
   function handleRememberMeChange(e) {
     setRememberMe(e.target.checked);
   }
   const registerDataChange = (e) => {
     const { name, value } = e.target;
     setUser({ ...user, [name]: value });
     dispatch({ type: "NOTIFY", payload: {} });
  };
  
 
  const handleUploadInput = (e) => {
   if(e.target.files[0].size > 1024 * 1024)return toast.warning("File Size Bigger Than 1mb,Plese Upload Small File Less Than 1 MB")
    if (e.target.name === "avatar") {
      const reader = new FileReader();
 
      reader.onload = () => {
        if (reader.readyState === 2) {
         
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
     
    }
    dispatch({ type: "NOTIFY", payload: {} });
    
  };
 const registerSubmit = async (e) => {
   e.preventDefault();

   let media = [];
   

   if (avatar.length > 0) media = await upload(avatar);
   console.log(media.url)
   
  //   dispatch(register({ ...user, avatar: media.url }));
   const { name, email, password } = user;
   setLoading(true);
   try {
      
      const result = await signIn("credentials", {
        redirect: false,
        name,
        email,
        password: password,
        image:media.url
      });
       if (rememberMe) {
         const encryptedEmail = AES.encrypt(email, "mysecretKeyAsikur").toString();
         const encryptedPassword = AES.encrypt(password, "mysecretKeyAsikur").toString();

         Cookies.set("rememberedEmail", encryptedEmail, { expires: 365 }); // set a cookie that expires in 1year days
         Cookies.set("rememberedPassword", encryptedPassword, { expires: 365 }); // set a cookie that expires in 1year days
         
       } else {
         Cookies.remove("rememberedEmail");
         Cookies.remove("rememberedPassword");
       }
      if (result?.error) {
        toast.error(result.error);
      } else {
        navigate.push("/account"); // replace "/account" with your desired URL
     }
     setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
 };
  useEffect(() => {
    if (created === true) {
      // signOut();
     
      toast.success("Yea ☺ Account Created!")
      navigate.push("/account")
       dispatch({ type: CLEAR_ERRORS });
      dispatch(loadUser())
    }
    if (error) {
      toast.error(error)
      dispatch({ type: CLEAR_ERRORS });
    }
    
  }, [dispatch, created, error, navigate, toast])
  const btnRef = useRef(null);

  useEffect(() => {
    const btnmove = btnRef.current;
    btnmove.addEventListener("mousemove", handleMouseMove);
    return () => btnmove.removeEventListener("mousemove", handleMouseMove);
  }, [btnRef]);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    btnRef.current.style.setProperty("--x", x + "deg");
  };
   const handleUploadClick = () => {
    //  document.getElementById("upload-input").click();
   };
  return (
    <div className="contact" id="contact">
      <div className="container-under-contact">
        <Tilt>
          <motion.h1
            className="main-title"
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
            whileHover={{ scaleX: 1.2 }}
          >
            <span>Sign</span> Up
          </motion.h1>
        </Tilt>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                {/* <h2>Contact Me</h2> */}

                <form onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    required
                    placeholder="Your Name"
                    value={name}
                    name="name"
                    onChange={registerDataChange}
                  />
                  <input
                    type="email"
                    class="field"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={registerDataChange}
                    name="email"
                  />

                  <div style={{ position: "relative" }}>
                    <input
                      type={ShowPassword ? "text" : "password"}
                      class="field"
                      required
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                    <span
                      onClick={() => setShowPassword(!ShowPassword)}
                      style={{ position: "absolute", right: "10px", top: "40px" }}
                    >
                      {ShowPassword ? "hide" : "show"}
                    </span>
                  </div>
                  <input
                    type="file"
                    id="upload-input"
                    name="avatar"
                    style={{ display: "none" }}
                    onChange={handleUploadInput}
                  />
                  <label htmlFor="upload-input">
                    <IconButton
                      component="h1"
                      onClick={handleUploadClick}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        alignItems: "flex-start",
                        justifyContent: "center",
                      }}
                    >
                      <CloudUploadIcon
                        style={{ fontSize: 44, color: "yellow", marginBottom: "8px" }}
                      />
                      <span
                        style={{ fontSize: "16px", fontWeight: "bold", color: "yellow" }}
                      >
                        Profile Photo
                      </span>
                    </IconButton>
                  </label>

                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt=""
                      style={{
                        height: "70px",
                        width: "80px",
                        borderRadius: "50%",
                        display: "block",

                        animation: "none",
                      }}
                    />
                  )}
                  <br />
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      margin: "8px 0px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      style={{ marginRight: "5px", cursor: "pointer" }}
                    />
                    <span style={{ padding: "0px 5px", fontSize: "16px" }}>
                      Remember me
                    </span>
                  </label>

                  <p>
                    alreay have an account? <Link href="/login">login</Link>
                  </p>
                  {loading ? (
                    <button
                      ref={btnRef}
                      className="btn common-btn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      <i></i>
                      <i></i>
                      <a>Loading...</a>
                    </button>
                  ) : (
                    <button ref={btnRef} className="btn common-btn" type="submit">
                      <i></i>
                      <i></i>
                      <a>Signup</a>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <LoginWithOtherMethod />
        </div>
      </div>
    </div>
  );
};

export default Contact;
