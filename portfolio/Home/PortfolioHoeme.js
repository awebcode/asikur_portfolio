import React from "react";
import Common from "../../common/Common";

import About from "../About/About";
import Contact from "../contact/Contact";
import Experience from "../Experience/Experience";

import Navbar from "../Navbar/Navbar";
import { offerData } from "../Services/OfferData";
import Portfolio from "../Portfolio/Portfolio";
import App from "../testimonial/Swiper";
import Testiminial from "../testimonial/Testiminial";
import Footer from "@/components/footer/Footer";
import PageTransition from "@/components/pageTransition";
import Head from "next/head";
import { LoginWithOtherMethod } from "../contact/LoginWithOtherMethod";
import Service from "../Services/Service";

const PortfolioHoeme = () => {
  return (
    <div>
      <Navbar />
      <PageTransition />
      <Common
        type0="Full Stack."
        type="Web Developer."
        type1="Web Designer."
        type2="Freelancer."
        type3="Seo Optimizer."
        type4="Problem Solver."
        type7="Database Administrator."
        type8="Backend Developer."
        type9="Cloud Manager."
        title1="Hello,It's Me."
        title2="Md Asikur "
        span2="Rahman."
        title3="Full-Stack Developer"
        span3="MERN | NEXT.JS."
        title4="I Am A Full-Stack Web Application Developer."
        span4="with 4 Years Of Experience."
        span5="I
        will
        be
        your
        mern
        stack
        developer.just send me a message."
        btntext="Download Cv"
        btncv="/cv.pdf"
        img="/about3.png"
      />
      <About />
      <Portfolio />
      <Service />
      <Experience />

      <Testiminial />
      <Contact />
      {/* <LoginWithOtherMethod /> */}
      <Footer />
    </div>
  );
};

export default PortfolioHoeme;
