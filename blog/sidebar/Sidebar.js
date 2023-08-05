// import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  Menu,
  CloseOutlined,
  PlusOne,
  Dashboard,
  VerifiedUserOutlined,
} from "@material-ui/icons";
import { Users } from "./dummyData";
import CloseFriend from "./CloseFriend";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GroupIcon from "@mui/icons-material/Group";
import AppsIcon from "@mui/icons-material/Apps";
import Plus from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import PaletteIcon from "@mui/icons-material/Palette";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import CommentIcon from "@mui/icons-material/Comment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Logout from "@mui/icons-material/Logout";


import { useDispatch, useSelector } from "react-redux";
import { clearHistoryAction, logoutAction } from "../../actions/userAction";
import { toast } from "react-toastify";
import ThemeToggleMain from "../../portfolio/Navbar/ThemeToggleMain";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Tag";
import { useRouter } from "next/router";
import Link from "next/link";
import { CLEAR_ERRORS } from "@/constants/userConstants";
import { clearHistory } from "@/reducers/userReducer";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  const [toggle, setToggle] = useState(true)
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);
  const logoutHandler = async () => {
    await signOut()
    dispatch(logoutAction());
    toast.success("Logged Out");
    navigate.push("/login")
    dispatch(clearHistoryAction())
  };
  return (
    <div className={`${toggle ? "side-toggle" : "sidebar"}`}>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <span className="side-menu">
            {toggle ? (
              <ChevronRightIcon
                onClick={() => setToggle(!toggle)}
                style={{ fontSize: "30px" }}
              />
            ) : (
              <ChevronLeftIcon
                onClick={() => setToggle(!toggle)}
                style={{ fontSize: "30px" }}
              />
            )}
          </span>
          <li className="sidebarListItem">
            <Link href={"/Create"}>
              {" "}
              <Plus className="sidebarIcon" style={{ cursor: "pointer" }} />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"/Create"}>Create</Link>
            </span>
          </li>
          {user?.role === "admin" && (
            <li className="sidebarListItem">
              <Link href={"/dashboard"}>
                {" "}
                <Dashboard className="sidebarIcon" style={{ cursor: "pointer" }} />
              </Link>
              <span
                className={`${
                  toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                }`}
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </span>
            </li>
          )}
          {user?.role === "admin" ? (
            <>
              <li className="sidebarListItem">
                <Link href={"/dashboard/AllUsers"}>
                  {" "}
                  <Group className="sidebarIcon" style={{ cursor: "pointer" }} />
                </Link>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <Link href={"/dashboard/AllUsers"}>All Users</Link>
                </span>
              </li>
            </>
          ) : (
            <li className="sidebarListItem">
              <Link href={"/account"}>
                {" "}
                <VerifiedUserOutlined
                  className="sidebarIcon"
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <span
                className={`${
                  toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                }`}
              >
                <Link href={"/account"}>Account</Link>
              </span>
            </li>
          )}
          <li className="sidebarListItem">
            <Link href={"/dashboard/Blogs"}>
              {" "}
              <AppsIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"/dashboard/Blogs"}>All Blogs</Link>
            </span>
          </li>
          {user?.role === "admin" && (
            <>
              <li className="sidebarListItem">
                <Link href={"/dashboard/AllCategory"}>
                  {" "}
                  <CategoryIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
                </Link>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <Link href={"/dashboard/AllCategory"}>Create Category</Link>
                </span>
              </li>
              <li className="sidebarListItem">
                <Link href={"/dashboard/AllTag"}>
                  {" "}
                  <TagIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
                </Link>
                <span
                  className={`${
                    toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
                  }`}
                >
                  <Link href={"/dashboard/AllTag"}>Create Tag</Link>
                </span>
              </li>
            </>
          )}
          <li className="sidebarListItem">
            <Link href={"/dashboard/comment"}>
              {" "}
              <CommentIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"/dashboard/comment"}>Comment</Link>
            </span>
          </li>
          <li className="sidebarListItem">
            <Link href={"/Earnings"}>
              {" "}
              <MonetizationOnIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"/Earnings"}>Earnings</Link>
            </span>
          </li>
          <li className="sidebarListItem">
            <Link href={"#"}>
              {" "}
              {/* <PaletteIcon className="sidebarIcon" style={{ cursor: "pointer" }} /> */}
              <ThemeToggleMain />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"#"}>Themes</Link>
            </span>
          </li>
          <li className="sidebarListItem">
            <Link href={"/Settings"}>
              {" "}
              <SettingsIcon className="sidebarIcon" style={{ cursor: "pointer" }} />
            </Link>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
            >
              <Link href={"/Settings"}>Settings</Link>
            </span>
          </li>
          <li
            className="sidebarListItem"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <a>
              {" "}
              <Logout className="sidebarIcon" style={{ cursor: "pointer" }} />
            </a>
            <span
              className={`${
                toggle ? "sidebarListItemText-toggle" : "sidebarListItemText"
              }`}
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              <a
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                Logout
              </a>
            </span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
