import { Close } from "@material-ui/icons";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import ThemeToggleMain from "./ThemeToggleMain";

function Dropdown({ user, notification, messagenotification }) {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="">
      <div className="container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
          onMouseOver={() => {
            setOpen(true);
          }}
          //   onMouseLeave={() => {
          //     setOpen(false);
          //   }}
        >
          <img
            className="dropdown-trigger"
            src={user?.image ? user.image : "/dropdown/user.png"}
          />
          <div
            className={`dropdown-menu ${open ? "active" : "inactive"}`}
            onMouseOver={() => {
              setOpen(true);
            }}
          >
            <span style={{ float: "right", cursor: "pointer" }}>
              {" "}
              <Close onClick={() => setOpen(false)} />
            </span>

            <h3>
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  height={50}
                  width={50}
                  style={{ animation: "none" }}
                ></Image>
              </Link>
              <br />
              <span style={{ textAlign: "center" }}>
                {user?.name ? user?.name : "Your Website"}
              </span>
            </h3>
            <span style={{ display: "flex" }}>
              <ThemeToggleMain />
              <span style={{ padding: "6px 6px 0px 6px" }}>Themes</span>
            </span>
            <ul>
              {user ? (
                <>
                  <DropdownItem
                    img="/dropdown/add1.png"
                    text={"create a blog"}
                    path="/Create"
                  />
                  <DropdownItem
                    img="/dropdown/user.png"
                    text={"My Profile"}
                    path="/account"
                  />
                  <DropdownItem
                    img="/dropdown/edit.png"
                    text={"Edit Profile"}
                    path="/user/profile/updateProfile"
                  />

                  <DropdownItem
                    img="/dropdown/envelope.png"
                    text={`Inbox (${messagenotification && messagenotification.length})`}
                    path="/message"
                  />
                  <DropdownItem
                    img="/dropdown/bell.png"
                    text={`Notifications(${
                      user?.notification && user.notification?.length
                    })`}
                    path="/Notification"
                  />
                  <DropdownItem
                    img="/dropdown/port.png"
                    text={`Portfolio`}
                    path="/portfolio/Home"
                  />
                  <DropdownItem
                    img="/dropdown/blog.png"
                    text={`Blogs`}
                    path="/blog/Home"
                  />
                  {/* <DropdownItem
                    img="/dropdown/settings.png"
                    text={"Settings"}
                    path="/settings"
                  /> */}
                  <DropdownItem img="/dropdown/question.png" text={"Q & A"} path="/faq" />
                  <DropdownItem img="/dropdown/help.png" text={"Help"} path="/help" />
                  <DropdownItem
                    img="/dropdown/log-out.png"
                    text={"Logout"}
                    path="#"
                    logout={signOut}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <DropdownItem img="/dropdown/user.png" text={"Sign In"} path="/login" />
                  <DropdownItem
                    img="/dropdown/addfr.png"
                    text={"Create Account"}
                    path="/register"
                  />
                  <DropdownItem
                    img="/dropdown/port.png"
                    text={`Portfolio`}
                    path="/portfolio/Home"
                  />
                  <DropdownItem
                    img="/dropdown/blog.png"
                    text={`Blogs`}
                    path="/blog/Home"
                  />
                  <DropdownItem
                    img="/dropdown/settings.png"
                    text={"Settings"}
                    path="/settings"
                  />
                  <DropdownItem
                    img="/dropdown/question.png"
                    text={"Questions"}
                    path="/faq"
                  />
                  <DropdownItem img="/dropdown/help.png" text={"Help"} path="/help" />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem(props) {
      const navigate = useRouter();
  return (
    <li className="dropdownItem" onClick={() => navigate.push(props.path)}>
     
      <img src={props.img} alt="icon" />
      
      {props.logout ? (
        <a onClick={() => props.logout({ callbackUrl:"/login" })}> {props.text} </a>
      ) : (
        <Link href={props.path}> {props.text} </Link>
      )}
    </li>
  );
}

export default Dropdown;
