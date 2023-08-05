import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Button, ButtonGroup } from "@chakra-ui/react";
import Chatpage from '@/message/Pages/Chatpage';
import { useDispatch } from 'react-redux';
import { loadUser } from '@/actions/userAction';
import ChatProvider from '@/message/Context/ChatProvider';
import Head from 'next/head';

const Messages = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  },[dispatch])
  return (
    <ChakraProvider>
      <Head>
        <title>Messages -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Stay connected and engage in meaningful conversations on the Asikur Portfolio Website messages page. Connect with fellow creatives, professionals, and enthusiasts to share ideas, collaborate on projects, and foster connections. Designed for seamless communication and accessible to Google bot count, our messages page provides a secure and interactive platform to connect and exchange messages with the community. Discover new opportunities, build relationships, and fuel your creative journey through engaging discussions and collaborations."
        />

       
        
      </Head>
      <ChatProvider>
        <Chatpage />
      </ChatProvider>
    </ChakraProvider>
  );
}

export default Messages