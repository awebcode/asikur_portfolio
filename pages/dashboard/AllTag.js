import { getTags } from '@/actions/tagAction';
import { loadUser } from '@/actions/userAction';
import Tag from '@/blog/category/Tag'
import Head from 'next/head';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AllTag = () => {
   const tags = useSelector((state) => state.tag);
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch();
  useEffect(() => {
     dispatch(loadUser())
     dispatch(getTags());
   }, [dispatch]);
  return (
    <>
      <Head>
        <title>Dashboard/All-Tags -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Explore the comprehensive collection of tags and categories on the Asikur Portfolio Website dashboard. Navigate through a diverse range of topics, from web development to graphic design, and discover the content that resonates with your interests. Our well-organized tags and categories provide easy access to relevant articles and projects. Designed for a seamless user experience and accessible to Google bot count, our dashboard all tag or category page allows you to dive deep into the content that matters to you most, ensuring an enriching browsing experience."
        />

        
      </Head>
      <Tag />
    </>
  );
}

export default AllTag