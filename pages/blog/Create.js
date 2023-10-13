import { loadUser } from '@/actions/userAction'
import CreateBlog from '@/blog/AllBlog/CreateBlog'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Create = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  },[dispatch])
  return (
    <>
      <Head>
        <title>Create New Blog -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Discover a wealth of insightful and engaging blog content on the Asikur Portfolio Website. Explore the latest articles, industry trends, expert tips, and creative inspiration across a wide range of topics, including web development, design, marketing, and more. Designed for a seamless user experience and accessible to Google bot count, our main blog page offers a platform to expand your knowledge, gain valuable insights, and stay updated with the latest developments in the creative and technology field. Join our community of passionate writers, thought leaders, and enthusiasts, and embark on a journey of continuous learning and growth."
        />
      </Head>
      <CreateBlog />
    </>
  );
}

export default Create