import Contact from '@/portfolio/contact/Contact'
import { LoginWithOtherMethod } from '@/portfolio/contact/LoginWithOtherMethod';
import Head from 'next/head';
import React from 'react'

const register = () => {
  return (
    <>
      <Head>
        <title>Sign/Up -Asikur Portfolio Website</title>
       

      </Head>
      <Contact />
      <LoginWithOtherMethod />
    </>
  );
}

export default register