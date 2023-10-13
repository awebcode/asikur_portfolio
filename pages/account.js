import React, { useEffect, useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarIconOut from "@mui/icons-material/StarOutline";
import Check from "@mui/icons-material/Check";
import { Instagram, Pinterest, Twitter, Visibility, WhatsApp } from "@material-ui/icons";
import Person from "@mui/icons-material/Person";
import Sms from "@mui/icons-material/Sms";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useDispatch, useSelector } from "react-redux";

import {
  clearHistoryAction,
  getUserDetails,
  loadUser,
  loadUserProfile,
  logoutAction,
} from "../actions/userAction";
import { toast } from "react-toastify";
import BlogCard from "../blog/Home/BlogCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import { Edit, GitHub } from "@mui/icons-material";
import Facebook from "@material-ui/icons/Facebook";

import Friendship from "@/pages/user/friendship/Friendship";
import IntroForAccount from "./user/profile/intro/OnlyAccount";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import AccountModal from "./modal";
import axios from "axios";
import { getAllUserProducts, getAllUserProductsForAccount } from "@/actions/productAction";
import Image from "next/image";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AccountUser = (props) => {
  const {data:session}=useSession()
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false)
    const [value, setValue] = useState("1");
  const { isAuthenticated } = useSelector((s) => s.user);
  const [user, setUser] = useState();
  const [userBlog, setUserBlog] = useState([]);
   const { products } = useSelector((state) => state.allProducts);
  const fetchUser = async () => {
    const { data } = await axios.get("/api/auth/userDetails");
    //  console.log("dataUnseenNotifications", data);
    setUser(data.user);
  };
  useEffect(() => {
   
    fetchUser();
  }, []);
  useEffect(() => {
   
    dispatch(getAllUserProducts());
  
    dispatch(loadUser());
    if (isAuthenticated === true) {
      navigate.push("/account");
    }
  }, [dispatch, userBlog]);

 
 
  return (
    <>
      <Head>
        <title>My Account -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Manage your Asikur Portfolio and Blog account: Update your profile, track your projects, and engage with the community. Access exclusive features, personalized recommendations, and stay connected with the latest web development, design, coding, and technology trends. Optimized for Googlebot indexing and ranking."
        />
        <meta
          name="description"
          content="Discover Asikur's Identity: Explore a captivating personal portfolio and blog showcasing the talent, expertise, and journey of Asikur. Dive into the world of web development, design, coding, and technology through engaging articles, projects, and insights. Get to know the creative mind behind the website. Optimized for Googlebot indexing and ranking."
        />
        <meta
          name="description"
          content="Asikur Personal Portfolio and Blog|Asikur Portfolio Website: Explore a comprehensive collection of web development, design, coding, and technology insights. Enhance your career growth with projects, tips, and personal branding strategies. Engage with Asikur's professional expertise and unlock your digital potential. Optimized for Googlebot indexing and ranking."
        />

      
      </Head>
      <div class="header__wrapper">
        <header>
          <button className="common-btn" onClick={() => navigate.push("/")}>
            <i></i>
            <i></i> <Link href={"/"}> &larr;Go?/Home</Link>
          </button>
          <button className="common-btn" onClick={() => navigate.push("/blog/Home")}>
            <i></i>
            <i></i> <Link href={"/blog/Home"}>See Blogs&rarr;</Link>
          </button>
        </header>
        <div class="cols__container">
          <div class="left__col">
            <div class="img__container">
              <img
                onClick={() => navigate("/user/profile/updateProfile")}
                src={user && user.image}
                alt="Anna Smith"
              />
              <span></span>
            </div>
            <h2>{user && user.name}</h2>
            <p>
              {user && user.details?.job ? (
                <> {user.details?.job}</>
              ) : (
                <>Full-Stack Developer.</>
              )}
            </p>
            <p>{user && user.email}</p>
            <div>
              <IntroForAccount
                detailss={user?.details}
                // visitor={visitor}
                setOthername={user?.othername}
                user={user}
              />
            </div>
            <ul class="about-profile">
              <li
                onClick={() => {
                  setOpen(true);
                  setValue("1");
                }}
                style={{ cursor: "pointer" }}
              >
                <span>
                  {user?.followers && user?.followers ? user?.followers?.length : 0}
                </span>
                Followers
              </li>
              <li
                onClick={() => {
                  setOpen(true);
                  setValue("2");
                }}
                style={{ cursor: "pointer" }}
              >
                <span>
                  {user?.following && user?.following ? user?.following?.length : 0}
                </span>
                Following
              </li>
              <li
                onClick={() => {
                  setOpen(true);
                  setValue("3");
                }}
                style={{ cursor: "pointer" }}
              >
                <span>{user?.friends && user?.friends ? user?.friends?.length : 0}</span>
                Friend
              </li>
            </ul>
            {open && (
              <AccountModal
                open={open}
                setOpen={setOpen}
                user={user}
                value={value}
                setValue={setValue}
              />
            )}
            <div class="content-profile">
              {/* <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat
                volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas
                nulla.
              </p> */}

              <ul>
                <Link href={"https://www.facebook.com/md.asikur.9047506/"}>
                  {" "}
                  <Facebook />
                </Link>

                <Instagram />
                <Link href={"https://www.github.com/Md-Asikur"}>
                  <GitHub />
                </Link>
                <Twitter />
                <WhatsApp />
              </ul>
              <Link href={`/user/profile/updatePassword`} style={{ display: "block" }}>
                Update Password.
              </Link>
              <Link href={`/user/profile/updateProfile`} style={{ display: "block" }}>
                Update Profile.
              </Link>
              <a
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                Logout.
              </a>
            </div>
          </div>
          <div class="right__col">
            <nav>
              <ul>
                <li>
                  <Link href="#">blogs</Link>
                </li>
                <li>
                  <Link href="#">galleries</Link>
                </li>
                <li>
                  <Link href="#">groups</Link>
                </li>
                <li>
                  <Link href="#">about</Link>
                </li>
              </ul>
              <button>
                <Link href={`/Create`}>Create New</Link>
              </button>
            </nav>

            <div className="photos">
              {products &&
                products.map((v, i) => {
                  return (
                    <div>
                      <Link href={`/blog/${v._id}`}>
                        {" "}
                        <Image
                          src={v.images[0].url ? v.images[0].url : ""}
                          height={1000}
                          width={1000}
                        />
                      </Link>
                    </div>
                  );
                })}
              {products?.length < 1 && (
                <h1 style={{ textAlign: "center" }}>
                  You Have No Any Blog,would you like to create a blog{" "}
                  <Link href={"/Create"}>Create Your Own Blog.</Link>
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// 
export default AccountUser;

