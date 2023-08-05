import React, { useEffect, useState, useRef } from "react";
// import "./navbar.css";


import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeToggleMain from "./ThemeToggleMain";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userAction";
import { useRouter } from "next/router";
import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { motion } from "framer-motion";
import Dropdown from "@/components/Navbar/Dropdown";

const Navbar = () => {
   const { user,isAuthenticated } = useSelector((s) => s.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [notification, setUserNotification] = useState([]);
  const ref = useRef(null)
  useEffect(() => {
    let handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMediaIcons(false);
      }
    };
    document.addEventListener("mousedown", handler);
   
  }, [ref])
   const navigate = useRouter();
   const dispatch = useDispatch();
 
   const logout = () => {
     dispatch(logoutAction());
     navigate.push("/login");
  };
   const fetchUnSeenData = async () => {
     const { data } = await axios.get("/api/chat/notification/seen");
    //  console.log("dataUnseenNotifications", data);
     setUserNotification(data.newNoti);
   };

   useEffect(() => {
     fetchUnSeenData();
   }, []);
  //active class
  const [active, setActive] = useState("");
 
  return (
    <>
      <nav className="main-nav" ref={ref}>
        {/* 1st logo part  */}
        <div className="logo">
          <Link href={"/"}>
            {" "}
            {/* <span>Asikur</span> */}
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        {/* 2nd menu part  */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <motion.li
              whileHover={{ scaleX: 1.2, color: "red" }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Link
                href={"/"}
                className={active === "#home" ? "activeNav" : ""}
                onClick={() => setActive("#home")}
              >
                Home
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scaleX: 1.2, color: "red" }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Link
                href="#portfolio"
                className={active === "#portfolio" ? "activeNav" : ""}
                onClick={() => setActive("#portfolio")}
              >
                Portfolio
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scaleX: 1.2, color: "red" }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Link
                href="#experience"
                className={active === "#experience" ? "activeNav" : ""}
                onClick={() => setActive("#experience")}
              >
                Experience
              </Link>
            </motion.li>

            <motion.li
              whileHover={{ scaleX: 1.2, color: "red" }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Link
                href="#contact"
                className={active === "#contact" ? "activeNav" : ""}
                onClick={() => setActive("#contact")}
              >
                Contact
              </Link>
            </motion.li>
            {/* {isAuthenticated === false ? (
              <motion.li
                whileHover={{ scaleX: 1.2, color: "red" }}
                transition={{
                  delay: 0.1,
                  opacity: { duration: 1 },
                  y: { type: "spring", stiffness: 60 },
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                <Link href="/login">login</Link>
              </motion.li>
            ) : (
              ""
            )} */}
            <motion.li
              whileHover={{ scaleX: 1.2 }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Link
                href="/blog/Home"
                className={active === "#blog" ? "activeNav" : ""}
                onClick={() => setActive("#blog")}
              >
                Blogs
              </Link>
            </motion.li>
            {/* {user && (
              <motion.li
                whileHover={{ scaleX: 1.2, color: "red" }}
                transition={{
                  delay: 0.1,
                  opacity: { duration: 1 },
                  y: { type: "spring", stiffness: 60 },
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                <Link
                  href={"/account"}
                  className={active === "#account" ? "activeNav" : ""}
                  onClick={() => setActive("#account")}
                >
                  Account
                </Link>
              </motion.li>
            )} */}
            {/* {user ? (
              <li>
                <Link href="/message">
                  <Tooltip title="Messages">
                    <Badge
                      badgeContent={notification && notification.length}
                      color="secondary"
                    >
                      <MailIcon color="action" />
                    </Badge>
                  </Tooltip>
                </Link>{" "}
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <Tooltip title="plese login or create a account and continue!🥰">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon color="action" />
                    </Badge>
                  </Tooltip>
                </Link>{" "}
              </li>
            )} */}
            <li>
              <ThemeToggleMain />
            </li>
          </ul>
        </div>
        {/* <Dropdown user={user} notification={notification} /> */}
        <div className="social-media">
          <div className="hamburger-menu">
            <Link href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? (
                <CloseIcon className="mobile-btn" />
              ) : (
                <MenuIcon className="mobile-btn" />
              )}
            </Link>
            <span>
              <ThemeToggleMain className="mobile-btn" />
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
