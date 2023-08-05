import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearHistoryAction, loadUser, updatePassword } from "../../actions/userAction";
import axios from "axios";
import Link from "next/link";
const UpdatePassword = () => {
  const [ShowOldPassword, setShowOldPassword] = useState(false);
  const [ShowNewPassword, setShowNewPassword] = useState(false);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useRouter();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, isUpdatedPic, loading, error } = useSelector(
    (state) => state.updateUser
  );
  const dispatch = useDispatch();
  const [Password, setPassword] = useState({
    oldpassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldpassword, newPassword, confirmPassword } = Password;

  const registerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { data } = await axios.get("/api/auth/userDetails");
    const currentUser = data.user;
    formData.set("id", currentUser && currentUser?._id);
    formData.set("oldPassword", oldpassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(formData));
  };
  const registerDataChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isUpdated === true) {
      navigate.push("/account");
      dispatch(loadUser());
      dispatch(clearHistoryAction());
    }
    if (error) {
      alert(error);
    }
  }, [user, isUpdated, error]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          Update<span> Password. </span>
        </h1>
        <div className="contact-main">
          <div class="container-under-contact">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form onSubmit={registerSubmit}>
                  <div style={{ position: "relative" }}>
                    <input
                      type={ShowOldPassword ? "text" : "password"}
                      class="field"
                      placeholder="Old Password"
                      name="oldpassword"
                      value={oldpassword}
                      onChange={registerDataChange}
                    />
                    <span
                      onClick={() => setShowOldPassword(!ShowOldPassword)}
                      style={{ position: "absolute", right: "10px", top: "10px" }}
                    >
                      {ShowOldPassword ? "hide" : "show"}
                    </span>
                  </div>
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
                    do you want to go account? <a href="/account">Account</a>
                  </p>
                  <p>
                    forget password? <Link href="/forgetPassword">Forget Password</Link>
                  </p>
                  <button class="btn" type="submit">
                    Update
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

export default UpdatePassword;
