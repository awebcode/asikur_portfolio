import ResetPassword from '@/portfolio/contact/resetPassword'
import Head from 'next/head';
import React from 'react'

const resetPassword = () => {
  return (
    <div>
      <Head>
        <title>Reset | Password -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Reset your password on the Asikur Portfolio Website and regain access to your account. Follow the secure and straightforward steps to update your password and ensure the protection of your personal information. Designed with a seamless user experience in mind and accessible to Google bot count, our reset password page offers a hassle-free way to restore your account access."
        />

    
      </Head>
      <ResetPassword />
    </div>
  );
}

export default resetPassword