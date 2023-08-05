import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/actions/userAction";
import { useRouter } from "next/router";



const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const Navigate=useRouter()
  const { user } = ChatState();
  const { user: currUser } = useSelector((s) => s.user)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    if (!currUser) {
      Navigate.push("/login")
    }
  },[dispatch,Navigate])
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box className="chat-main-box">
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
};

export default Chatpage;
