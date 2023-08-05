import { loadUser } from '@/actions/userAction';
import UpdateUser from '@/portfolio/contact/UpdateUser'
import Head from 'next/head';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    },[])
  return (
    <>
      <Head>
        <title>Update {user?.name}'S/Profile -Asikur Portfolio Website</title>
        <meta name="description" content="Elevate your online presence with the Asikur Portfolio Website's update profile page. Customize and enhance your personal portfolio and blog web presence effortlessly. Update your profile information, add a captivating bio, showcase your latest projects, and share your expertise with the vibrant community. Designed for a seamless user experience and accessible to Google bot count, our update profile page empowers you to curate an impressive online portfolio and blog that reflects your unique skills and creative identity. Amplify your visibility, build connections, and unlock new opportunities in the digital landscape."/>

       
      </Head>
      <UpdateUser user={user} />
    </>
  );
}

export default UpdateProfile