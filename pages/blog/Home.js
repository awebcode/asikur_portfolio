import { getAllProducts } from "@/actions/productAction";
import { loadUser } from "@/actions/userAction";
import BlogHome from "@/blog/Home/BlogHome";
import PortfolioHoeme from "@/portfolio/Home/PortfolioHoeme";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeAction from "../../actions/ThemeAction";
const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const themeReducer = useSelector((s) => s.Theme);
  const { user } = useSelector((s) => s.user);
  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
   
    dispatch(getAllProducts());
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <Head>
        <title>My Blogs -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="My Blogs -Asikur Portfolio Website.Discover a wealth of insightful and engaging blog content on the Asikur Portfolio Website. Explore the latest articles, industry trends, expert tips, and creative inspiration across a wide range of topics, including web development, design, marketing, and more. Designed for a seamless user experience and accessible to Google bot count, our main blog page offers a platform to expand your knowledge, gain valuable insights, and stay updated with the latest developments in the creative and technology field. Join our community of passionate writers, thought leaders, and enthusiasts, and embark on a journey of continuous learning and growth."
        />
      </Head>
      <div className={`${themeReducer.mode} ${themeReducer.color}`}>
        <BlogHome />
      </div>
    </>
  );
};

export default Home;
