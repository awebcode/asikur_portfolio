import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import "./testimoni.css";

// import required modules
import { EffectCoverflow, Pagination,Autoplay } from "swiper";
import TestimonialApi from "./TestimonialApi";
import { motion } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
export default function Testiminial() {
  return (
    <>
      <div className="testimonial" id="testimonial">
        <div className="container">
          <Tilt>
            {" "}
            <motion.h1
              className="main-title"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              // animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.1,
                opacity: { duration: 1 },
                y: { type: "spring", stiffness: 60 },
                duration: 0.9,
                ease: "easeInOut",
              }}
              whileHover={{ scaleX: 1.2 }}
            >
              What My <span>Client's Say?.</span>
            </motion.h1>
          </Tilt>
          <div className="testimonial-main">
            <Tilt>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={
                  (true,
                  {
                    clickable: true,
                  })
                }
                autoplay={true}
                onDurationChange={200}
                autoHeight={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
              >
                {TestimonialApi.map((v) => {
                  return (
                    <>
                      <SwiperSlide>
                        <Image
                          className="img"
                          src={v.image}
                          alt=""
                          height={1000}
                          width={1000}
                        />
                        <div className="swiper-content">
                          <h2>
                            <span>{v.name}</span>
                          </h2>
                          <h3>{v.offcer}</h3>
                          <span>{v.post}</span>
                          <h5>{v.design}</h5>
                          <p>{v.desc}</p>
                          <span>{v.date}</span>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
            </Tilt>
          </div>
        </div>
      </div>
    </>
  );
}
