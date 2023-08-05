import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import AES from "crypto-js/aes";
const ResetPassword = () => {
 
  const [ShowNewPassword, setShowNewPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useRouter();
  
  const [Password, setPassword] = useState({
    
    newPassword: "",
    confirmPassword: "",
  });
  const {  newPassword, confirmPassword } = Password;

  const registerSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match!");
      return;
    }

    try {
      const { token } = navigate.query;

      await axios.post("/api/reset-password", { token, confirmPassword });
      toast.success("Password reset successful!");
      
    
       const encryptedPassword = await AES.encrypt(
         confirmPassword,
         "mysecretKeyAsikur"
       ).toString();
        Cookies.set("rememberedPassword", encryptedPassword, { expires: 365 });
        navigate.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Send The Reset Token Again or Plese Hit the correct Token Url!");
      navigate.push("/forgetPassword");
    }

   
  };
  const registerDataChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          Reset<span>Your Password. </span>
        </h1>
        <div className="contact-main">
          <div class="container-under-contact">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form onSubmit={registerSubmit}>
                  <div style={{ position: "relative" }}>
                    <input
                      type={ShowNewPassword ? "text" : "password"}
                      class="field"
                      placeholder="New Password"
                      name="newPassword"
                      value={newPassword}
                      onChange={registerDataChange}
                    />
                    <span
                      onClick={() => setShowNewPassword(!ShowNewPassword)}
                      style={{ position: "absolute", right: "10px", top: "10px" }}
                    >
                      {ShowNewPassword ? "hide" : "show"}
                    </span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={ShowConfirmPassword ? "text" : "password"}
                      class="field"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={registerDataChange}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}
                      style={{ position: "absolute", right: "10px", top: "10px" }}
                    >
                      {ShowConfirmPassword ? "hide" : "show"}
                    </span>
                  </div>
                  <p>
                    don,t have an account? <a href="/register">Register</a>
                  </p>
                  <p>
                    Remember Password? <a href="/login">Login</a>
                  </p>
                  <button class="btn" type="submit">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
