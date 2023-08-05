import React, { useEffect, useState } from "react";


import StarIcon from "@mui/icons-material/Star";
import StarIconOut from "@mui/icons-material/StarOutline";
import Check from "@mui/icons-material/Check";
import { Edit, Facebook, Instagram, Pinterest, Twitter, Visibility, WhatsApp } from "@material-ui/icons";
import Person from "@mui/icons-material/Person";
import Sms from "@mui/icons-material/Sms";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearHistoryAction, getUserDetails, loadUserProfile, logoutAction } from "../../actions/userAction";
import moment from "moment"
import BlogCard from "../../blog/Home/BlogCard";
import { useRouter } from "next/router";
import Link from "next/link";
import Intro from "@/pages/user/profile/intro";
import { getAllUserProductsForAccount } from "@/actions/productAction";
import Friendship from "@/pages/user/friendship/Friendship";
import { toast } from "react-toastify";
import axios from "axios";
import AccountModal from "@/pages/modal";
import Head from "next/head";
const OtherInfo = (props) => {
  // console.log(props)
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { user: userProfile } = useSelector((state) => state.userProfile);
  const { userDetails } = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.allProducts);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  

  useEffect(() => {
    if (props.id) {
      dispatch(getUserDetails(props.id));
      dispatch(getAllUserProductsForAccount(props.id));
      dispatch(loadUserProfile(props.id));
    }
  }, [dispatch, props.id]);
  //  useEffect(() => {
  //    if (user?._id === userDetails?._id) {
  //    return  navigate.push("/account");
  //    }
  //  }, [navigate, user?._id, userDetails?._id]);
  const logoutHandler = () => {
    dispatch(logoutAction());
    toast.success("Logged Out");
    navigate.push("/login");
    dispatch(clearHistoryAction());
  };
  
  return (
    <>
      {/* <Head>
        <title>Account {user?.name} -Asikur</title>
      </Head> */}
      <div class="header__wrapper">
        <header></header>
        <div class="cols__container">
          <div class="left__col">
            <div class="img__container">
              <img
                src={userDetails && userDetails.image}
                alt={userDetails && userDetails.name}
              />
              <span></span>
            </div>
            <h2>
              {userDetails && userDetails.name}
              {userDetails && userDetails._id === user?._id && (
                <span>
                  <Edit />
                </span>
              )}
            </h2>
            <p>
              UX/UI Designer
              {userDetails && userDetails._id === user?._id && (
                <span>
                  <Edit />
                </span>
              )}
            </p>
            <p>
              {userDetails && userDetails.email}
              {userDetails && userDetails._id === user?._id && (
                <span>
                  <Edit />
                </span>
              )}
            </p>
            <Intro
              detailss={userDetails?.details}
              // visitor={visitor}
              setOthername={userDetails?.othername}
              user={user}
              userDetails={userDetails}
            />
            <ul class="about-profile">
              <li
                onClick={() => {
                  setOpen(true);
                  setValue("1");
                }}
                style={{ cursor: "pointer" }}
              >
                <span>
                  {userDetails?.followers && userDetails.followers
                    ? userDetails.followers?.length
                    : 0}
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
                  {userDetails?.following && userDetails.following
                    ? userDetails.following?.length
                    : 0}
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
                <span>
                  {userDetails?.friends && userDetails.friends
                    ? userDetails.friends?.length
                    : 0}
                </span>
                Friends
              </li>
            </ul>
            {open && (
              <AccountModal
                open={open}
                setOpen={setOpen}
                user={userDetails}
                value={value}
                setValue={setValue}
              />
            )}
            <div class="content-profile">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat
                volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas
                {userDetails && userDetails._id === user?._id && (
                  <span>
                    <Edit />
                  </span>
                )}
              </p>

              <ul>
                <Facebook />

                <Instagram />
                <Pinterest />
                <Twitter />
                <WhatsApp />
              </ul>
              {userDetails && userDetails._id === user?._id && (
                <Link href={`#`} onClick={logoutHandler}>
                  Logout
                </Link>
              )}
            </div>
          </div>
          <div class="right__col">
            <nav>
              <ul>
                {/* <li>
                  <Link href="#">photos</Link>
                </li>
                <li>
                  <Link href="#">galleries</Link>
                </li>
                <li>
                  <Link href="#">groups</Link>
                </li>
                <li>
                  <Link href="#">about</Link>
                </li> */}
              </ul>
              {userDetails && userDetails._id === user?._id ? (
                <button>
                  <Link href={`/Create`}>Create New</Link>
                </button>
              ) : (
                ""
              )}
              {console.log("user", userProfile)}
              <Friendship
                friendshipp={userProfile && userProfile.friendship}
                profileid={userProfile && userProfile._id}
              />
            </nav>

            <div class="photos">
              {props.products &&
                props.products.map((v) => {
                  return (
                    <>
                      <Link href={`/blog/${v._id}`}>
                        <img src={v.images[0]?.url} />
                      </Link>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherInfo;
