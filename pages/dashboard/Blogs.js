import { getAllProducts, getAllUserProducts } from '@/actions/productAction';
import { loadUser } from '@/actions/userAction';
import AllProducts from '@/blog/dashboard/AllBlogss'
import axios from 'axios';
import Head from 'next/head';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Blog = (props) => {
  const {user} = useSelector((state) => state.user);
 
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  const [role, setRole] = useState(false)
  
  useEffect(() => {
    dispatch(loadUser());
    //  console.log(pro);
    // const roleuser = (localStorage.getItem("role"));
   
    // console.log("role", roleuser==="admin");
   
    
    
    if (role === "admin") {
      dispatch(getAllProducts());
    } else {
      dispatch(getAllUserProducts());
    }
    userDetails()
  }, [dispatch,role]);
  const userDetails = async () => {
    const { data } = await axios.get(`/api/auth/userDetails`);
    setRole(data.user && data.user?.role);
  }
  return (
    <>
      <Head>
        <title>Dashboard/All-Blogs -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Explore a rich collection of captivating and informative blogs on the Asikur Portfolio Website dashboard. Immerse yourself in a wide range of topics, including web development, design trends, industry insights, and more. Discover thought-provoking articles, expert perspectives, and inspiration to fuel your creative journey. Designed for a seamless user experience and accessible to Google bot count, our dashboard all blogs page offers a hub of knowledge, ideas, and inspiration from talented individuals in the creative and technology realm."
        />

       
      </Head>
      <AllProducts products={products} />
    </>
  );
}

export default Blog
