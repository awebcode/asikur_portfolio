import { getCategories } from '@/actions/categoryAction';
import { loadUser } from '@/actions/userAction';
import Category from '@/blog/category/Category'
import Head from 'next/head';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AllCategory = () => {
   const categories = useSelector((state) => state.category);
   const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(loadUser());
    dispatch(getCategories())
  },[dispatch])

  return (
    <>
      <Head>
        <title>Dashboard/All-Categories -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Explore the comprehensive collection of tags and categories on the Asikur Portfolio Website dashboard. Navigate through a diverse range of topics, from web development to graphic design, and discover the content that resonates with your interests. Our well-organized tags and categories provide easy access to relevant articles and projects. Designed for a seamless user experience and accessible to Google bot count, our dashboard all tag or category page allows you to dive deep into the content that matters to you most, ensuring an enriching browsing experience."
        />

       
      </Head>
      <Category />
    </>
  );
}

export default AllCategory