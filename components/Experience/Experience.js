import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";


import { experiences } from "./utils/Data";
import  SectionWrapper  from "./utils/SectionWrapper";
import { textVariant } from "./utils/Motion";
// import "./experience.css"
import Tilt from "react-parallax-tilt";
const ExperienceCard = ({ experience }) => {
 
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#ccd6f6",
      }}
      contentArrowStyle={{ borderRight: "9px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div
          className="flex justify-center items-center w-full h-full"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            style={{
              height: "60%",
              width: "60%",
              objectFit: "contain",
              animation: "none",
            }}
          />
        </div>
      }
    >
      <Tilt>
        <div>
          <h3
            className="text-white text-[24px] font-bold"
            style={{ color: "#ccd6f6", fontSize: "24px", fontWeight: "600" }}
          >
            {experience.title}
          </h3>
          <p
            className="text-secondary text-[16px] font-semibold"
            style={{ color: "#ccd6f6", fontSize: "18px", fontWeight: "600" }}
          >
            {experience.company_name}
          </p>
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
              style={{ color: "#ccd6f6", fontSize: "14px", paddingLeft: "13px" }}
            >
              {point}
            </li>
          ))}
        </ul>
      </Tilt>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
   const [btn, setBtn] = useState(false);
   useEffect(() => {
     if (window.innerWidth <= 768) {
       setBtn(true);
     }
   }, [btn,setBtn]);
 
  return (
    <>
      <motion.div className="experience-1" variants={textVariant()}>
        <Tilt>
          {" "}
          <motion.h3
            className={`center`}
            initial={{ y: -100, opacity: 0 }}
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
            <span>What I</span> have done so far.
          </motion.h3>
          <motion.h1
            className={`main-title`}
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
            Work <span>Experience.</span>
          </motion.h1>
        </Tilt>
      </motion.div>

      <div
        className="experience mt-20 flex flex-col"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <VerticalTimeline animate={btn ? false : true}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
