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
import { Divider, Text } from "@tremor/react";
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
                      <SwiperSlide className="flex items-center justify-center">
                        <Image
                          className="img rounded-full"
                          src={v.image}
                          alt=""
                          height={1000}
                          width={1000}
                          style={{ display: "block", margin: "auto", animation: "none" }}
                        />
                        <div className="swiper-content text-center">
                          <Divider>
                            {" "}
                            <h2 className="text-3xl md:text-5xl font-bold mb-2">
                              <span>{v.name}</span>
                            </h2>
                          </Divider>
                          <Divider>
                            {" "}
                            <h3 className="text-xl font-semibold mb-2">{v.offcer}</h3>
                          </Divider>
                          <Divider>
                            <span className="text-lg mb-2">{v.post}</span>
                          </Divider>
                          <Divider>
                            {" "}
                            <h5 className="text-lg font-medium mb-2">{v.design}</h5>{" "}
                          </Divider>
                          <Text className="text-gray-700 mb-2">{v.desc}</Text>
                          <span className="text-gray-500">{v.date}</span>
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
