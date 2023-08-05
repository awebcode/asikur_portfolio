// import "./topbar.css";
import { loadUser, logoutAction } from "@/actions/userAction";
import { Search, Person, Chat, Notifications, Settings, Close } from "@material-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { Palette } from "@mui/icons-material";
import ThemeToggleMain from "../Navbar/ThemeToggleMain";
import { signOut } from "next-auth/react";
import axios from "axios";
const style = {
  position: "absolute",
  top: "5%",
  right: "10%",
  // transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Topbar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useRouter()
  const dispatch=useDispatch()
  const [query, setQuery] = useState("")
  const { user } = useSelector((s) => s.user);
  useEffect(() => {
   dispatch(loadUser())
  }, [dispatch])
  const logoutHandler = async() => {
     await  signOut()
     dispatch(logoutAction());
     toast.success("Logged Out");
     navigate.push("/login");
     dispatch(clearHistoryAction());
  };
  const [notification, setUserNotification] = useState([]);
  const fetchUnSeenData = async () => {
    const { data } = await axios.get("/api/chat/notification/seen");
    //  console.log("dataUnseenNotifications", data);
    setUserNotification(data.newNoti);
  };

  useEffect(() => {
    fetchUnSeenData();
  }, []);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">
          <Link href="/">Home</Link>
        </span>
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="searchIcon" />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link href={`/message`}>
              <Chat />
              <span className="topbarIconBadge">{notification?.length}</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Link href={`/Notification`}>
              {" "}
              <Notifications />
              <span className="topbarIconBadge">{user?.notification?.length}</span>
            </Link>
          </div>
        </div>

        {/* <img
          onClick={handleOpen}
          src={user?.image ? user?.image : "/man.png"}
          alt=""
          className="topbarImg"
        />
        <>
          {" "}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box">
              <span style={{ float: "right", cursor: "pointer" }} onClick={handleClose}>
                <Close />
              </span>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <AccountCircleIcon />{" "}
                <Link
                  style={{
                    margin: "0px 5px",
                    padding: "6px 2px",
                    fontSize: "16px",
                    color: "white",
                  }}
                  href={"/account"}
                >
                  Profile
                </Link>
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <MessageIcon />{" "}
                <Link
                  style={{
                    margin: "0px 5px",
                    padding: "6px 2px",
                    fontSize: "16px",
                    color: "white",
                  }}
                  href={"/message"}
                >
                  Messages
                </Link>
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Settings />{" "}
                <Link
                  style={{
                    margin: "0px 5px",
                    padding: "6px 2px",
                    fontSize: "16px",
                    color: "white",
                  }}
                  href={"#"}
                >
                  Settings & Privacy
                </Link>
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginLeft: "-5px",
                }}
              >
                
                <ThemeToggleMain />
                <Link
                  style={{
                    margin: "0px 5px",
                    padding: "6px 2px",
                    fontSize: "16px",
                    color: "white",
                  }}
                  href={"#"}
                >
                  Choose Themes
                </Link>
              </Typography>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                  })
                }
              >
                <LogoutIcon />{" "}
                <Link
                  style={{
                    margin: "0px 5px",
                    padding: "6px 2px",
                    fontSize: "16px",
                    color: "white",
                  }}
                  href={"#"}
                >
                  Logout
                </Link>
              </Typography>
            </Box>
          </Modal>
        </> */}
      </div>
    </div>
  );
}
