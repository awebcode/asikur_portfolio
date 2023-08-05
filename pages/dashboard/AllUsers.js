import { getAllProducts, getAllUserProducts } from "@/actions/productAction";
import { getallUsersAction, loadUser } from "@/actions/userAction";
import AllProducts from "@/blog/dashboard/AllBlogss";
import AllUsers from "@/blog/dashboard/AllUsers";
import Head from "next/head";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = (props) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.allUsers);
  
  useEffect(() => {
    dispatch(loadUser());
    //  console.log(pro);
    const roleuser = localStorage.getItem("role");

    // console.log("role", roleuser==="admin");

    if (roleuser === "admin") {
      dispatch(getallUsersAction());
    }
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Dashboard/All-Users -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Explore the vibrant community of users on the Asikur Portfolio Website dashboard. Connect with fellow creatives, professionals, and enthusiasts from various fields, including web development, graphic design, and more. Discover their inspiring portfolios, read their insightful blog posts, and engage in meaningful conversations. Designed for a seamless user experience and accessible to Google bot count, our dashboard all users page enables you to expand your network, find collaboration opportunities, and be part of a thriving creative community."
        />

       
      </Head>
      <AllUsers users={users} />
    </>
  );
};

export default Users;
