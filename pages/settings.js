import Head from 'next/head';
import React from 'react'
const myHeading = '<h1>"Comming Soon..."</h1>';
const settings = () => {
  return (
    <div>
      <Head>
        <title>Asikur | Settings -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Customize your account settings on the Asikur Portfolio Website to tailor your experience to your preferences. Access a range of options to personalize your profile, privacy settings, notifications, and more. Designed for a seamless user experience and accessible to Google bot count, our settings page empowers you to have full control over your account and optimize your engagement with our platform."
        />

      </Head>
      <h1 className="main-title">{myHeading}</h1>
    </div>
  );
}

export default settings