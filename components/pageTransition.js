import React from 'react'
import {motion} from "framer-motion"
const PageTransition = () => {
  return (
    <>
      {" "}
      <motion.div
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          right: "100%",
          height: "100%",
          width: "100%",
          zIndex: "100050",
          backgroundColor: "#6366f1",
        }}
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          right: "100%",
          height: "100%",
          width: "100%",
          zIndex: "100040",
          backgroundColor: "#eab308",
        }}
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        style={{
          position: "fixed",
          top: "0",
          bottom: "0",
          right: "100%",
          height: "100%",
          width: "100%",
          zIndex: "100030",
          backgroundColor: "#22c55e",
        }}
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
    </>
  );
}

export default PageTransition