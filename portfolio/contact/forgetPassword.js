import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [msg,setmsg]=useState(null)
 const [loading,setLoading]=useState(false)
  const [user, setUser] = useState({
   
    email: "",
    
  });
  const { email } = user;

  const registerSubmit = async (e) => {
    e.preventDefault();

    const { email } = user;
    if (!email) {
   return setmsg("Plese Enter Your Email.");
      
    }
    try {
      setmsg("")
   setLoading(true)
   await axios.post("/api/forget-password", { email });
      toast.success("Password reset email sent!Plese Check Your Email.");
       setLoading(false);
 } catch (error) {
  //  console.log(error);
      
      toast.error("Something went wrong!");
      setLoading(false)
 }
    
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <h1 className="main-title">
            <span>Send Email?Reset </span> Password.
          </h1>
          <div className="contact-main">
            <div class="container-under-contact">
              <div class="contact-box">
                <div class="left"></div>
                <div class="right">
                  <h2>Send Email And Reset Password.</h2>
                  {msg && <p style={{ color: "red" }}>{msg}</p>}
                  <form onSubmit={registerSubmit}>
                    <input
                      type="email"
                      class="field"
                      placeholder="Your Email"
                      value={email}
                      onChange={registerDataChange}
                      name="email"
                      // required
                    />

                    <p>
                      don,t have an account? <a href="/register">Register.</a>
                    </p>
                    <p>
                      Remember Password? <a href="/login">Login</a>
                    </p>
                    <button
                      class="btn common-btn"
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      <i></i>
                      <i></i>
                      {loading ? <a>Sending...</a> : <a>Send Email</a>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
