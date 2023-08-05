import React from 'react'
import Common from '../../common/Common';


import About from '../About/About';
import Contact from '../contact/Contact';
import Experience from '../Experience/Experience';

import Navbar from '../Navbar/Navbar'
import Offer from '../offer/Offer';
import { offerData } from '../offer/OfferData';
import Portfolio from '../Portfolio/Portfolio';
import App from '../testimonial/Swiper';
import Testiminial from '../testimonial/Testiminial';
import Footer from '@/components/footer/Footer';
import PageTransition from '@/components/pageTransition';
import Head from 'next/head';
import { LoginWithOtherMethod } from '../contact/LoginWithOtherMethod';



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
        type3="Good Teacher."
        type4="Problem Solver."
        title1="Hello,It's Me."
        title2="Md Asikur "
        span2="Rahman."
        title3="Full-Stack Developer"
        span3="MERN."
        title4="I Am A Full-Stack Web Application Developer."
        span4="In Three Years Of Experience."
        span5="I
        will
        be
        your
        mern
        stack
        developer.just send me a message to contact friendly."
        btntext="Download Cv"
        btncv="/resume.docx"
        img="/about3.png"
      />
      <About />
      <Portfolio />
      <Experience />
      <Offer />
      <Testiminial />
      <Contact />
      <LoginWithOtherMethod />
      <Footer />
    </div>
  );
}

export default PortfolioHoeme