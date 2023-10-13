import Login from '@/portfolio/contact/Login'
import Head from 'next/head'
import React from 'react'

const login = () => {
  return (
    <>
      <Head>
        <title>Login | Sign In - Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Sign in to Asikur's captivating portfolio website. Explore the world of web development, design, coding, and technology. Access exclusive content, projects, and insights. Join the creative community behind the website. Optimized for seamless user experience."
        />
      </Head>
      <Login />
    </>
  );
}

export default login