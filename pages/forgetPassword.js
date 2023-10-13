import ForgetPassword from '@/portfolio/contact/forgetPassword'
import Head from 'next/head';
import React from 'react'

const ForgetPass = () => {
  return (
    <>
      <Head>
        <title>Forget | Password -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Recover your account password on the Asikur Portfolio Website. Follow the steps to securely reset your password and regain access to your account. We understand the importance of protecting your personal information and ensuring a seamless experience."
        />

       
      </Head>
      <ForgetPassword />
    </>
  );
}

export default ForgetPass