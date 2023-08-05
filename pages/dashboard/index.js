import { getAllProducts, getAllUserProducts } from '@/actions/productAction';
import {  getallUsersAction, loadUser } from '@/actions/userAction';
import Dashboard from '@/blog/dashboard/Dashboard'
import Head from 'next/head';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
 
   const { users } = useSelector((s) => s.allUsers);
  
   const { products } = useSelector((s) => s.allProducts);
   const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(loadUser());
      
        dispatch(getallUsersAction())
        dispatch(getAllProducts());
        // dispatch(getallUsersAction());
    
    }, [dispatch]);
  return (
    <>
      <Head>
        <title>Dashboard -Asikur Portfolio Website</title>
       <meta name="description" content="Welcome to the dashboard of the Asikur Portfolio Website, your hub for creativity, inspiration, and collaboration. Explore a diverse range of portfolios, captivating blog posts, and connect with like-minded individuals in the creative and technology realm. Designed for a seamless user experience and accessible to Google bot count, our dashboard page offers a centralized platform to manage your profile, discover new talents, and stay updated with the latest trends. Join our vibrant community and unlock endless possibilities for personal and professional growth."/>

       
      </Head>
      <Dashboard allUser={users} products={products} />
    </>
  );
}

export default Index