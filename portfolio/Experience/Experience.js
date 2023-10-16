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
        color: "#64748b",
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
            style={{ color: "#64748b", fontSize: "24px", fontWeight: "600" }}
          >
            <span> {experience.title}</span> <span>{experience.skill}</span>
            {experience.desc && <p>{experience.desc}</p>}
          </h3>
          {/* <p
          className="text-secondary text-[16px] font-semibold"
          style={{ color: "white", fontSize: "18px", fontWeight: "600" }}
        >
          {experience.company_name}
        </p> */}
        </div>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
              style={{ color: "#64748b", fontSize: "14px", paddingLeft: "13px" }}
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
  }, [btn, setBtn]);
  const skills = [
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "JavaScript",

    "Figma",
    "jQuery",
    "Ember.js",
    "Three.js",
    "React Spring",
    "Framer Motion",
    "Aos",
    "GSAP",
    "Anime.js",
    "React Transition Group",
    "React-Motion",

    "Lottie for React",
    "Material-UI",
    "Ant Design",
    "Styled Components",
    "Emotion",
    "Semantic UI",
    "Chakra UI",
    "ShadCN UI",
    "Tremor",
    "Swiper",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Next.js",

    "React",
    "Node.js",
    "Express.js",
    "Socket.Io",
    "ChatEngine.Io",
    "Sass",
    "Redux",
    "React-Query",
    "Rtk-Query",
    "Crypto",
    "Tron-Trc20",

    "Firebase",
    "Cloudinary",
    "Google Cloud",
    "Git",
    "Github",
    "TypeScript",
    "RESTful APIs",
    "Jest",
    "Webpack",
    "AWS",
    "Heroku",
    "Netlify",
    "Vercel",
    "Cyclic",
    "Render",
    "Cpanel",
    "Hostinger",
    "Vps",
    // Add more skills as needed
  ];
  
  const getDesktopAnimationStyles = (index) => {
    const delay = 0.1 * index; // Adjust the delay based on the index

    return {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 1.2 },
      initial: {
        opacity: 0,
        scale: 0,
        // y: btn ? 50 : 0, // Apply y: 50 if btn is true, otherwise y: 0
        y: 10, // Apply y: 50 if btn is true, otherwise y: 0
        x: 10, // Apply x: 0 if btn is true, otherwise x: 500
      },
      whileInView: {
        opacity: 1,
        scale: 1,
        y: btn ? 40 : 0,
        x: btn ? 0 : 100,
        transition: {
          delay, // Use the calculated delay
          duration: 0.5, // Added duration for whileInView transition
          type: "spring", // Added spring animation
          stiffness: 200, // Adjust spring stiffness
          damping: 10, // Adjust spring damping
        },
      },
      transition: {
        duration: 0.5, // Adjust duration for initial and whileTap transitions
        type: "spring", // Added spring animation
        stiffness: 200, // Adjust spring stiffness
        damping: 10, // Adjust spring damping
      },
    };
  };

  const getMobileAnimationStyles = (index, btn) => {
    const delay = 0.1 * index;

    return {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 1.2 },
      initial: {
        opacity: 0,
        scale: 0,
      },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          delay,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      },
    };
  };

  const getAnimationStyles = btn ? getMobileAnimationStyles : getDesktopAnimationStyles;
  return (
    <>
      <motion.div className="experience-1" variants={textVariant()} id="experience">
        <motion.h3
          className={`center`}
          whileHover={{ scaleX: 1.1 }}
          transition={{
            delay: 0.1,
            opacity: { duration: 1 },
            y: { type: "spring", stiffness: 60 },
            duration: 0.9,
            ease: "easeInOut",
          }}
        >
          <span>Let Me</span> Get You A Beautiful <span>Website.</span>
        </motion.h3>
        <Tilt>
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
            My <span>Skills.</span>
          </motion.h1>
        </Tilt>
      </motion.div>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <motion.div key={index} className="skillX" {...getAnimationStyles(index, btn)}>
            {skill}
          </motion.div>
        ))}
      </div>

      {/* <Tilt>
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
          What Is <span>It?</span>
        </motion.h1>
      </Tilt>
      <div
        className="experience mt-20 flex flex-col"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <VerticalTimeline animate={btn ? false : true}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div> */}
    </>
  );
};

export default SectionWrapper(Experience, "work");
