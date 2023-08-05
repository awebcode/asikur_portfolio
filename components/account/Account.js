import React, { useEffect } from 'react'

import StarIcon from "@mui/icons-material/Star";
import StarIconOut from "@mui/icons-material/StarOutline";
import Check from '@mui/icons-material/Check';
import { Instagram, Pinterest, Twitter, Visibility, WhatsApp } from '@material-ui/icons';
import Person from "@mui/icons-material/Person";
import Sms from "@mui/icons-material/Sms";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useDispatch, useSelector } from 'react-redux';

import { clearHistoryAction, getUserDetails, loadUser, loadUserProfile, logoutAction } from '../../actions/userAction';
import { toast } from 'react-toastify';
import BlogCard from '../../blog/Home/BlogCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar } from '@material-ui/core';
import { Edit } from '@mui/icons-material';
import Facebook from '@material-ui/icons/Facebook';
import Intro from '@/pages/user/profile/intro';
import Friendship from '@/pages/user/friendship/Friendship';
import Head from 'next/head';

const Account = (props) => {
   const navigate = useRouter();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.allProducts);
  const { user } = useSelector((s) => s.user);
 const { user: userProfile } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(loadUser())
    if (props.id) {
      dispatch(getUserDetails(props.id));
      dispatch(loadUserProfile(props.id))
    }
  }, [dispatch]);

  
  // useEffect(() => {
  //   if (user?._id === userDetails?._id) {
  //     return navigate.push("/account");
  //   }
  // }, [navigate]);
   //if (user?._id === userDetails?._id) return 
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
              <img  src={user && user.avatar} alt="Anna Smith" />
              <span></span>
            </div>
            <h2>{user && user.name}</h2>
            <p>
              {user && user.details?.job ? (
                <> {user.details?.job}</>
              ) : (
                <>default</>
              )}
            </p>
            <p>{user && user.email}</p>
            <div>
              <Intro
                detailss={user?.details}
                // visitor={visitor}
                setOthername={user?.othername}
                user={user}
                userDetails={userDetails}
              />
            </div>
            <ul class="about-profile">
              <li>
                <span>4,073</span>Followers
              </li>
              <li>
                <span>322</span>Following
              </li>
              <li>
                <span>200,543</span>Attraction
              </li>
            </ul>
            <div class="content-profile">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat
                volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas
                nulla.
              </p>

              <ul>
                <Facebook />

                <Instagram />
                <Pinterest />
                <Twitter />
                <WhatsApp />
              </ul>
              <Link href={`/user/profile/updatePassword`} style={{ display: "block" }}>
                Update Password.
              </Link>
              <Link href={`/user/profile/updateProfile`} style={{ display: "block" }}>
                Update Profile.
              </Link>
              <Link href={`#`} onClick={logoutHandler}>
                Logout
              </Link>
            </div>
          </div>
          <div class="right__col">
            <nav>
              <ul>
                <li>
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
                </li>
              </ul>
              {/* <button>
                <Link href={`/Create`}>Create New</Link>
              </button> */}
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
}

export default Account