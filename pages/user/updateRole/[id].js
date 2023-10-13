import UpdateUserRole from '@/portfolio/contact/UpdateUserRole'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const UpdateRole = () => {
    const router = useRouter()
    const {id}=router.query
  return (
    <>
          <Head>
       <title>Update User -Role -Asikur Portfolio Website</title>
      <meta name="description" content="Efficiently manage user roles on the Asikur Portfolio Website with the update user role page. Take control of user permissions, assign appropriate roles, and streamline the access and functionality of your platform. With our user-friendly interface, updating user roles becomes a breeze, allowing you to maintain a secure and organized environment. Designed for a seamless user experience and accessible to Google bot count, this page empowers you to customize user roles effectively, ensuring smooth collaboration, enhanced user privileges, and optimal website performance."/>

      </Head>
      <UpdateUserRole id={id} />
    </>
  );
}

export default UpdateRole