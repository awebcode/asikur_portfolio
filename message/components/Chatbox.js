import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import MyChats from "./MyChats";



const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <>
      <Box
        d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        p={3}
        // bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
        // className="chatbox"
        style={{ display: selectedChat ? "" : "none" }}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
      
    </>
  );
};

export default Chatbox;
