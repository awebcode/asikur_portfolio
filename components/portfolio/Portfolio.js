import React, { useEffect, useRef, useState } from "react";
// import "./portfolio.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Data } from "../data/Data";
import Pagination from "../pagination/Pagination";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
const Portfolio = () => {
  const [data, setData] = useState(Data);

  const filter = (e) => {
    const updFilter = Data.filter((w) => {
      return w.cat === e;
    });
    setData(updFilter);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setBtn(true);
    }
  }, [btn]);
 

  //  const [buttonRefs, setButtonRefs] = useState([]);

  //  useEffect(() => {
  //    const buttons = document.querySelectorAll(".common-btn");
  //    setButtonRefs(Array.from(buttons));
  //  }, []);

  //  useEffect(() => {
  //    const handleMouseMove = (e) => {
  //      const rect = e.target.getBoundingClientRect();
  //      const x = e.clientX - rect.left;
  //      e.target.style.setProperty("--x", x + "deg");
  //    };
  //    buttonRefs.forEach((button) => {
  //      button?.addEventListener("mousemove", handleMouseMove);
  //      return () => button?.removeEventListener("mousemove", handleMouseMove);
  //    });
  //  }, []);

  return (
    <>
      {" "}
      <div className="portfolio">
        {" "}
        <div className="container">
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
            What <span>Includes</span> In My <span>Portfolios</span>
          </motion.h1>

          {btn ? (
            <div className="btn-container">
              <button
                // id="btn-port"

                className="common-btn"
                onClick={() => setData(Data)}
              >
                <i></i>
                <i></i>
                <a>All</a>
              </button>
              <button
                // id="btn-port"

                className="common-btn"
                onClick={() => filter("ecommerce")}
              >
                <i></i>
                <i></i>
                <a>E-Commerce</a>
              </button>
              <button
                // id="btn-port"

                className="common-btn"
                onClick={() => filter("portfolio")}
              >
                <i></i>
                <i></i>
                <a>Portfolio</a>
              </button>

              <button
                // id="btn-port"

                className="common-btn"
                onClick={() => filter("crypto")}
              >
                <i></i>
                <i></i>
                <a>Crypto</a>
              </button>

              <button
                // id="btn-port"

                className="common-btn"
                onClick={() => filter("college")}
              >
                <i></i>
                <i></i>
                <a>University</a>
              </button>
            </div>
          ) : (
            <div className="btn-container">
              <motion.button
                // id="btn-port"

                className="common-btn"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1 }}
                whileHover={{ scale: 1.08, transition: "none" }}
                onClick={() => setData(Data)}
              >
                <i></i>
                <i></i>
                <a>All</a>
              </motion.button>
              <motion.button
                // id="btn-port"

                className="common-btn"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1 }}
                whileHover={{ scale: 1.08, transition: "none" }}
                onClick={() => filter("ecommerce")}
              >
                <i></i>
                <i></i>
                <a>E-Commerce</a>
              </motion.button>
              <motion.button
                // id="btn-port"

                className="common-btn"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1 }}
                whileHover={{ scale: 1.08, transition: "none" }}
                onClick={() => filter("portfolio")}
              >
                <i></i>
                <i></i>
                <a>Portfolio</a>
              </motion.button>

              <motion.button
                // id="btn-port"

                className="common-btn"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1 }}
                whileHover={{ scale: 1.08, transition: "none" }}
                onClick={() => filter("college")}
              >
                <i></i>
                <i></i>
                <a>University Website</a>
              </motion.button>
              <motion.button
                // id="btn-port"

                className="common-btn"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                // animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  opacity: { duration: 1 },
                  x: { type: "spring", stiffness: 60 },
                  duration: 0.2,
                  ease: "easeOut",
                }}
                viewport={{ amount: 1 }}
                whileHover={{ scale: 1.08, transition: "none" }}
                onClick={() => filter("crypto")}
              >
                <i></i>
                <i></i>
                <a>Crypto Website</a>
              </motion.button>
            </div>
          )}
          <div className="ports-main">
            <div className="port-main">
              {currentPosts.map((data, index) => {
                return (
                  <>
                    {/* {btn ? ( */}
                    <Tilt key={index}>
                      <div className="port-box">
                        <div className="port-img">
                          <Link href={data?.onclick ? data?.onclick : "#"}>
                            {" "}
                            <Image
                              height={1000}
                              width={1000}
                              src={data?.image ? data.image : "/portfolio/home.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="port-content">
                          <span>
                            {data.date && data.cat
                              ? data.date + data.cat
                              : `18/05/2023/${data.cat}`}
                          </span>
                          <h2>
                            {" "}
                            <span>
                              {data.title ? data.title : " This Is Awesome Project."}
                            </span>
                          </h2>
                          <p>
                            {data.desc
                              ? data.desc.substring(0, 90) + "..." //150words
                              : "lorSunt aliqua officia voluptate excepteur nulla adipisicing aute nostrud exercitation nulla ipsum ea mollit. Nostrud fugiat eu sunt dolo aliqua deserunt eiusmod est consectetur deserunt esse mollit"}
                          </p>
                          <Link href={data?.onclick ? data?.onclick : "#"}>
                            See More &rarr;
                          </Link>
                        </div>
                      </div>
                    </Tilt>
                    {/* ) : (
                      <motion.div
                        className="port-box"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, -1.1, 1],
                        }}
                        // animate={{ x: 0, opacity: 1 }}

                        transition={{
                          delay: index + 0.1,
                          opacity: { duration: 1 },
                          x: { type: "spring", stiffness: 60 },
                          duration: index + 0.1,
                          ease: "easeOut",
                          bounce: 180,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05,transition:"none"}}
                      >
                        <div className="port-img">
                          <Link href={data?.onclick ? data?.onclick : "#"}>
                            <Image
                              height={1000}
                              width={1000}
                              src={data?.image ? data.image : "/portfolio/home.png"}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="port-content">
                          <span>
                            {data.date ? data.date : "18/05/2023/web development"}
                          </span>
                          <h2>
                            {" "}
                            <span>
                              {data.title ? data.title : " This Is Awesome Project."}
                            </span>
                          </h2>
                          <p>
                            {data.desc
                              ? data.desc.slice(0, 150)
                              : "lorSunt aliqua officia voluptate excepteur nulla adipisicing aute nostrud exercitation nulla ipsum ea mollit. Nostrud fugiat eu sunt dolo aliqua deserunt eiusmod est consectetur deserunt esse mollit"}
                          </p>
                          <Link href={`#`}>See More &rarr;</Link>
                        </div>
                      </motion.div>
                    )} */}
                  </>
                );
              })}
            </div>
          </div>
          <Link href={`/asikur/portfolios`} className="see_all_projects">
            See All Projects &rarr;
          </Link>
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
