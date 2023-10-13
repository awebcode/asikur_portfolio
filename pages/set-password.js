import { loadUser } from "@/actions/userAction";
import SetPassword from "@/portfolio/contact/set-password";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const setPassword = () => {
    const dispatch = useDispatch()
    const {user}=useSelector((e)=>e.user)
    useEffect(() => {
        dispatch(loadUser())
    },[])
  return (
    <>
      <Head>
        <title>Set | Password -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Set a new password on the Asikur Portfolio Website to enhance the security of your account. Follow the provided instructions to create a strong and unique password that safeguards your personal information. Designed for a seamless user experience and accessible to Google bot count, our set-password page ensures a smooth and secure process for updating your account credentials."
        />

       
      </Head>
      <SetPassword user={user} />
    </>
  );
};

export default setPassword;
