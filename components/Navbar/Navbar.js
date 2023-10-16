import  { useEffect, useState, useRef } from "react";
// import "./navbar.module.css";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import ThemeToggleMain from "./ThemeToggleMain";
import { useSelector } from "react-redux";
import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { motion } from "framer-motion";
import { BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { user,isAuthenticated } = useSelector((s) => s.user);
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [notification, setUserNotification]=useState([])
  const ref = useRef(null);
   const [isMobile, setIsMobile] = useState();

   useEffect(() => {
     const handleResize = () => {
       setIsMobile(window.innerWidth >= 768);
     };

     window.addEventListener("resize", handleResize);

     return () => {
       window.removeEventListener("resize", handleResize);
     };
   }, []);
  useEffect(() => {
    let handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMediaIcons(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, [ref]);
 const fetchUnSeenData = async () => {
   const { data } = await axios.get("/api/chat/notification/seen");
  
   setUserNotification(data.newNoti);
 };
 
 useEffect(() => {
   
   fetchUnSeenData();
  
 }, []);
  //active clsaa
  const [active, setActive] = useState("");
  return (
    <>
      <nav className="main-nav" ref={ref}>
        <div className="logo" style={{ marginLeft: isMobile ? "-50px" : "0px" }}>
          <Link href={"/"}>
            <img
              style={{
                height: isMobile ? "60px" : "120px",
                width: isMobile ? "60px" : "120px",
              }}
              className="animate-none"
              src="/logo/logo.png"
              alt=""
            />
          </Link>
        </div>
        {/* 2nd menu part  */}
        <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
          <ul>
            <motion.li whileHover={{ scaleX: 1.1 }}>
              <Link
                href="/"
                className={active === "#home" ? "activeNav" : ""}
                onClick={() => setActive("#home")}
              >
                Home
              </Link>{" "}
            </motion.li>
            <motion.li whileHover={{ scaleX: 1.1 }}>
              <Link
                href="/portfolio/Home"
                className={active === "#portfolio" ? "activeNav" : ""}
                onClick={() => setActive("#portfolio")}
              >
                Portfolio
              </Link>{" "}
            </motion.li>
            <motion.li whileHover={{ scaleX: 1.1 }}>
              <Link
                href="/blog/Home"
                className={active === "#blog" ? "activeNav" : ""}
                onClick={() => setActive("#blog")}
              >
                Blogs
              </Link>{" "}
            </motion.li>
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
            )}*/}
            {user ? (
              <li>
                <Link href="/Notification">
                  <Tooltip title="Notifications">
                    <Badge
                      badgeContent={user?.notification && user.notification.length}
                      color="secondary"
                    >
                      <BellIcon color="action" />
                    </Badge>
                  </Tooltip>
                </Link>{" "}
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <Tooltip title="plese login or create a account and continue!🥰">
                    <Badge badgeContent={4} color="secondary">
                      <BellIcon color="action" />
                    </Badge>
                  </Tooltip>
                </Link>{" "}
              </li>
            )}

            <li>
              <ThemeToggleMain />
            </li>
          </ul>
        </div>
        {/* <Dropdown user={user} notification={notification} /> */}
        <div className="social-media">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? (
                <CloseIcon className="mobile-btn" />
              ) : (
                <MenuIcon className="mobile-btn" />
              )}
            </a>
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
