import { loadUser } from '@/actions/userAction';
import PortfolioHoeme from '@/portfolio/Home/PortfolioHoeme'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
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
        <title>Portfolio -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Asikur Portfolio Website::Explore the impressive portfolio collection on the Asikur Portfolio Website. Immerse yourself in a showcase of creative works spanning various domains, including web development, graphic design, photography, and more. Discover the talent, skill, and passion behind each project as talented individuals present their best work. Designed for a seamless user experience and accessible to Google bot count, our main portfolio page provides a curated selection of inspiring projects to ignite your creativity and find inspiration for your own endeavors."
        />

       
      </Head>
      <div className={`${themeReducer.mode} ${themeReducer.color}`}>
        <PortfolioHoeme />
      </div>
    </>
  );
}

export default Home