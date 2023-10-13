import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Common from '../common/Common'
import Contact from '../portfolio/contact/Contact';
import About from './About/About';
import Blog from './Blogs/Blogs';
import Experience from './Experience/Experience';
import Navbar from './Navbar/Navbar'

import ThemeAction from "../actions/ThemeAction"
import Portfolio from './portfolio/Portfolio';
import Pricing from './pricing/Pricing';
import Footer from './footer/Footer';
import { LoginWithOtherMethod } from '@/portfolio/contact/LoginWithOtherMethod';
import FAQ from './faq';
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
    
   }, [dispatch]);
   useEffect(() => {
     setLoading(true);
     setTimeout(() => {
       setLoading(false);
     }, 4000);
   }, []);

    return (
      <>
        <div className={`${themeReducer.mode} ${themeReducer.color}`}>
          <Navbar />
          <Common
            ty="Html."
            ty1="Css."
            ty1_1="Bootstrap 5"
            ty2="Tailwind Css."
            ty3="Javascript."
            ty4="React Js."
            ty4_4="Next Js."
            ty5="Node Js."
            ty6="Mongo DB."
            title1="Hello There!"
            title2="Welcome To Asikur"
            span2="Web."
            title3={
              <>
                <span>Full-Stack</span> Dual Website
              </>
            }
            span3="MERN."
            title4="I Am A Full-Stact Web Application Developer."
            span4="In Three Years Of Experience."
            span5="Client satisfaction is my first priority, and let me claim that we are best at it."
            btntext="Blogs"
            btnloc="/blog/Home"
            img="/asik3.jpg"
          />

          <About />
          <Experience />
          <Portfolio />
          {/* <Blog /> */}
          {/* <FAQ/> */}
          <Pricing />
          <Contact />
          <LoginWithOtherMethod/>
          <Footer />
        </div>
      </>
    );
}

export default Home