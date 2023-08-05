import Loading from "@/components/Loading/Loading";
import { ViewIcon } from "@chakra-ui/icons";
import { Hide } from "@chakra-ui/react";
import { PanoramaFishEyeOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Await } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import AES from "crypto-js/aes";
import axios from "axios";
const SetPassword = ({user}) => {
  const navigate = useRouter();
//   const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [Password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  
    const [ShowPassword, setShowPassword] = useState();
   const [ShowcPassword, setShowCPassword] = useState();
    console.log("user",user?.email)
  const registerSubmit = async(e) => {
      e.preventDefault();
    if (user?.email) {
         setLoading1(true);
         const { email } = user;
          const response = await fetch("/api/auth/set-password", {
            method: "POST",
            body: JSON.stringify({ email, Password,cPassword }),
            headers: {
              "Content-Type": "application/json",
            },
          });
         var chatData = {
           
           userId: user._id,
           currUserId: "642a0a448e99684e92b84cf9",
           
         };
          const {data:chat}=await axios.post("/api/chat/createChat",chatData)
          var newMessage = {
            currUserId: "642a0a448e99684e92b84cf9",
            content: `Subject: Important Announcement from Admin:<br>Dear valued user,<br>We hope this message finds you in good health and high spirits. As the administrator of this platform, we would like to convey an important announcement that concerns all of our users.Firstly,we would like to express our heartfelt appreciation for your continued support and trust in our platform. Your active participation and engagement have been the driving force behind the success of our community.We are excited to share with you that we have been working diligently to enhance your user experience and take our platform to new heights. Our dedicated team has been listening attentively to your feedback and suggestions, and we are now ready to introduce a series of significant updates and improvements.In the coming weeks, you can expect to see a range of enhancements aimed at providing you with a smoother, more intuitive, and enjoyable experience. We have focused on improving the overall performance, speed, and responsiveness of the platform. Additionally, we have implemented advanced security measures to ensure the utmost protection of your personal information.We understand that change can sometimes be challenging, but we firmly believe that these updates will elevate your user experience to new levels of satisfaction. Our goal is to create a platform that caters to your needs and aspirations, and we are confident that these changes will bring us closer to that vision.We value your trust and partnership, and we are committed to maintaining open lines of communication. Your feedback and suggestions are always welcomed and highly valued. We encourage you to share your thoughts and ideas with us as we continue to evolve and improve.Thank you for being a part of our vibrant community. We are immensely grateful for your support and look forward to serving you even better in the future.If you have any immediate concerns or require assistance, please do not hesitate to contact our dedicated support team. They are ready to address any questions or issues you may have.Warm regards,[Contact:<span>Email:asikurrahaman997@gmail.com</span>,Whatsapp:01893585782<span>[Admin Asikur Rahman][Asikur Personal Portfolio & Blog Website NextJs.]</span>`,
            chatId: chat._id,
            userId: user._id,
          };
          await axios.post("/api/chat/messages/create",newMessage)
          const data = await response.json();
          if (data.success) {
           const encryptedPassword = await AES.encrypt(
             Password,
             "mysecretKeyAsikur"
           ).toString();
              Cookies.set("rememberedPassword", encryptedPassword, { expires: 365 });
              toast.success("Password saved!");
              navigate.push("/account")
          } else {
            alert("Error: " + data.error);
        }
       setLoading1(false);
       }
  
  };
  useEffect(() => {
   
    if (user && user.password) {
      setLoading(true);
      const x = async () => {
        const encryptedEmail =await AES.encrypt(user?.email, "mysecretKeyAsikur").toString();
       

        Cookies.set("rememberedEmail", encryptedEmail, { expires: 365 }); // set a cookie that expires in 1year days
         // set a cookie that expires in 1year days
      }
      navigate.push("/account");
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      x();
    }
   
  }, [navigate,user])
  
  
  return (
    <>
      {loading ? (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "#10b981",
            fontSize: "45px",
          }}
        >
          You Are Redirecting To {user?.name}'s Account.🥰😊
        </h1>
      ) : (
        <div className="contact" id="contact">
          <div className="container">
            <h1 className="main-title">
              Set New<span> Password. </span>
            </h1>
            <div className="contact-main">
              <div class="container-under-contact">
                <div class="contact-box">
                  <div class="left"></div>
                  <div class="right">
                    <form onSubmit={registerSubmit}>
                      <div style={{ position: "relative" }}>
                        <input
                          type={ShowPassword ? "text" : "password"}
                          class="field"
                          placeholder="New Password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                          onClick={() => setShowPassword(!ShowPassword)}
                          style={{ position: "absolute", right: "10px", top: "10px" }}
                        >
                          {ShowPassword ? "hide" : "show"}
                        </span>
                      </div>
                      <div style={{ position: "relative" }}>
                        <input
                          type={ShowcPassword ? "text" : "password"}
                          class="field"
                          placeholder="Confirm Password"
                          value={cPassword}
                          onChange={(e) => setCPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowCPassword(!ShowcPassword)}
                          style={{ position: "absolute", right: "10px", top: "10px" }}
                        >
                          {ShowcPassword ? "hide" : "show"}
                        </span>
                      </div>
                      <p>
                        do you want to go account? <a href="/account">Account</a>
                      </p>
                      <button
                        class="btn"
                        type="submit"
                        disabled={loading1 ? true : false}
                      >
                        {loading1 ? "wait saving..." : "Save Password"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetPassword;
