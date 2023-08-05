import React, { useEffect, useState } from "react";
import { clearHistoryAction, loadUser, register, updateProfile, updateProfilePic } from "../../actions/userAction";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { upload } from "@/utils/upload";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
const UpdateUser = ({user}) => {
     const navigate = useRouter();
    //  const { user } = useSelector((state) => state.user);
     const { isUpdated, isUpdatedPic, loading,msg } = useSelector(
       (state) => state.updateUser
  );
  const [imgUploading, setImageUploading] = useState(false);
  // console.log("user",user)
  const dispatch = useDispatch();
    const [name, setName] = useState(user && user.name);
     const [email, setEmail] = useState();
   const [us, setus] = useState();
 
  const [Avatar, setAvatar] = useState("");
  const [showAvatar, setShowAvatar] = useState("");
   const handleUploadInput = (e) => {
     if (e.target.files[0].size > 1024 * 1024)
       return toast.warning(
         "File Size Bigger Than 1mb,Plese Upload Small File Less Than 1 MB"
       );
     if (e.target.name === "avatar") {
       const reader = new FileReader();

       reader.onload = () => {
         if (reader.readyState === 2) {
            setAvatar(reader.result);
           setShowAvatar(reader.result);
         }
       };

       reader.readAsDataURL(e.target.files[0]);
     }
     dispatch({ type: "NOTIFY", payload: {} });
   };
  const registerSubmit =async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.set("name", name);
    // formData.set("email", email);
    let media = [];
   setImageUploading(true)
 
   if (Avatar.length > 0) media = await upload(Avatar);
   
  
    setImageUploading(false)
    dispatch(updateProfile(name, email, media.url, user?._id));
  
     
  };
  // console.log("u1",user)
  
  //  console.log("use",us)
  useEffect(() => {
  //   const hi = async () => {
  //     const { data } = await axios.get("/api/auth/userDetails");
  //     // setcurruser(data.user);
  //      if (data?.user && data?.user) {
  //        setShowAvatar(data?.user.image);
  //        setName(data?.user.name);
  //        setEmail(data?.user.email);
  //      } else {
  //        toast.warning("Plese Login And Access This Resource!🤗😀");
  //        navigate.push("/");
  //      }
  //  }
  //   hi();
    if (user && user) {
             setShowAvatar(user.image);
             setName(user.name);
             setEmail(user.email);
    }
    if (isUpdated) {
      navigate.push("/account"); 
      toast.success(msg)
      dispatch(loadUser());
      dispatch(clearHistoryAction());
    }
  }, [isUpdated, isUpdatedPic, dispatch,msg,user?.name]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Update Profile.</span>
        </h1>
        <div className="contact-main">
          <div class="container-under-contact">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    placeholder="Your Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    class="field"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />

                  <input
                    type="file"
                    class="field"
                    name="avatar"
                    onChange={handleUploadInput}
                  />
                  <img
                    src={showAvatar}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />

                  <p>
                    do you want to go account? <Link href="/account">Account</Link>
                  </p>
                  <button
                    class="btn"
                    type="submit"
                    disabled={loading ? true : imgUploading ? true : false}
                  >
                    {loading ? "Updating..." : imgUploading ? "Imgae Uploading..." : "Update"}
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

export default UpdateUser;
