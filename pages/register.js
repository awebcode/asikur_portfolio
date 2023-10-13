import Contact from '@/portfolio/contact/Contact'
import { LoginWithOtherMethod } from '@/portfolio/contact/LoginWithOtherMethod';
import Head from 'next/head';
import React from 'react'

const register = () => {
  return (
    <>
      <Head>
        <title>SignUp | Register |Join With Me -Asikur Portfolio Website</title>

        <meta
          name="description"
          content="Register and join the creative journey with Asikur on his captivating portfolio website. Explore web development, design, coding, and technology. Access exclusive content, projects, and insights. Be part of the vibrant community behind the website. Optimized for seamless user experience."
        />
      </Head>
      <Contact />
      <LoginWithOtherMethod />
    </>
  );
}

export default register