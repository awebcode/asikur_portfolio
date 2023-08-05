import { useViewportScroll, motion, useTransform } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import "./common.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";
const Common = (props) => {
  const { scrollYProgress } = useViewportScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 2]);

  const [text] = useTypewriter({
    words: [props.type0, props.type, props.type1, props.type2, props.type3, props.type4],
    loop: true,
    typeSpeed: 200,
    deleteSpeed: 80,
  });
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setBtn(true);
    }
    // let btnmove = document.querySelector('.common-btn')
    // btnmove?.addEventListener("mousemove", (e) => {
    //   let rect = e.target?.getBoundingClientRect();
    //   let x = e.clientX - rect.left;
    //   btnmove.style.setProperty("--x",x+"deg")
    // })
  }, [btn]);
  return (
    <>
    
      {btn ? (
        <div className="common">
          <div className="container">
            <div className="common-main">
              <div className="common-content">
                <h4 className="type-title-1">{props.title1}</h4>
                <h3 className="common-title-name">
                  {props.title2} <span>{props.span2}</span>
                </h3>
                {props.type0 && (
                  <h1>
                    <span className="type-w">
                      <span className="type-w-1"> I'M A </span>
                      <span>
                        <Typewriter
                          options={{
                            strings: [
                              props.type0,
                              props.type,
                              props.type1,
                              props.type2,
                              props.type3,
                              props.type4,
                            ],
                            delay: 75,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </span>
                  </h1>
                )}
                {props.ty && (
                  <h1>
                    <span className="type-w">
                      <span className="type-w-1"> Expert </span>{" "}
                      <span>
                        {" "}
                        <Typewriter
                          options={{
                            strings: [
                              props.ty,

                              props.ty1,
                              props.ty1_1,
                              props.ty2,
                              props.ty3,
                              props.ty4,
                              props.ty4_4,
                              props.ty5,
                              props.ty6,
                            ],
                            delay: 75,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </span>
                  </h1>
                )}
                <h1 className="title-3">
                  {props.title3}
                  <span> {props.span3}</span>
                </h1>

                <p style={{ paddingTop: "6px" }}>
                  {props.title4} {props.span4}
                </p>
                <p>
                  {/* <br /> */}
                  {props.span5}
                </p>
                <button type="" className="common-btn">
                  <i></i>
                  <i></i>
                  {props.btncv ? (
                    <a href={props.btncv} download>
                      {props.btntext}
                    </a>
                  ) : (
                    <a href={props.btnloc}>{props.btntext}&rarr;</a>
                  )}
                </button>
              </div>
              <div className="common-img">
                <Tilt>
                  {" "}
                  <Image src={props.img} alt="" width={1000} height={1000} />
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div className="common">
          <div className="container">
            <div className="common-main">
              <div className="common-content">
                <motion.h4
                  className="type-title-1"
                  initial={{ x: 10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  // animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 60 },
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 1 }}
                >
                  {props.title1}
                </motion.h4>
                <motion.h3
                  className="common-title-name"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  // animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2,
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 100 },
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 1 }}
                >
                  {props.title2} <span>{props.span2}</span>
                </motion.h3>
                {props.type0 && (
                  <motion.h1
                    initial={{ x: 60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    // animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      opacity: { duration: 1 },
                      x: { type: "spring", stiffness: 60 },
                      duration: 0.6,
                      ease: "easeIn",
                    }}
                  >
                    <span className="type-w">
                      <motion.span className="type-w-1"> I'M A </motion.span>
                      <span>
                        <Typewriter
                          options={{
                            strings: [
                              props.type0,
                              props.type,
                              props.type1,
                              props.type2,
                              props.type3,
                              props.type4,
                            ],
                            delay: 75,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </span>
                  </motion.h1>
                )}
                {props.ty && (
                  <motion.h1
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    // animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      opacity: { duration: 1 },
                      x: { type: "spring", stiffness: 60 },
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    viewport={{ amount: 1 }}
                  >
                    <span className="type-w">
                      <span className="type-w-1"> Expert </span>{" "}
                      <span>
                        {" "}
                        <Typewriter
                          options={{
                            strings: [
                              props.ty,

                              props.ty1,
                              props.ty1_1,
                              props.ty2,
                              props.ty3,
                              props.ty4,
                              props.ty4_4,
                              props.ty5,
                              props.ty6,
                            ],
                            delay: 75,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </span>
                  </motion.h1>
                )}
                <motion.h1
                  className="title-3"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  // animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 60 },
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 1 }}
                >
                  {props.title3}
                  <span> {props.span3}</span>
                </motion.h1>

                <motion.p
                  style={{ paddingTop: "6px" }}
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  // animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.7,
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 60 },
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  viewport={{ amount: 1 }}
                >
                  {props.title4} {props.span4}
                </motion.p>
                <motion.p
                  initial={{ x: 10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  // animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.8,
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 60 },
                    duration: 0.2,
                    ease: "easeIn",
                  }}
                >
                  {/* <br /> */}
                  {props.span5}
                </motion.p>
                <button type="" className="common-btn">
                  <i></i>
                  <i></i>

                  {props.btncv ? (
                    <a href={props.btncv} download>
                      {props.btntext}&rarr;
                    </a>
                  ) : (
                    <a href={props.btnloc}>{props.btntext}&rarr;</a>
                  )}
                </button>
              </div>

              <motion.div
                className="common-img"
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.9,
                  opacity: { duration: 0 },
                  y: { type: "spring", stiffness: 60, bounce: 1 },
                  duration: 0.8,
                  ease: "linear",
                }}
                viewport={{ amount: 1, once: false }}
              >
                <Tilt>
                  {" "}
                  <Image src={props.img} alt="" width={1000} height={1000} />
                </Tilt>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Common;
