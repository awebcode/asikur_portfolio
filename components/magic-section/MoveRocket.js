import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const MoveRocket = () => {
  const controls = useAnimation();

  useEffect(() => {
   const animateRocket = async () => {
     await controls.start({
       x: [0, 400, 400, 0, 0],
       y: [0, 0, 350, 350, 0],
       rotate: [0, 90, 180, 270, 360], // Adjust the rotation
       scale: [1, 1.5, 1.6, 1.8, 2, 2.1, 2],
    //    opacity: [1, 0.5, 1], // Animate opacity
    //    backgroundColor: [
    //      "#ff0000", // Red
    //      "#00ff00", // Green
    //      "#0000ff", // Blue
    //      "#ff00ff", // Magenta
    //      "#00ffff", // Cyan
    //      "#ffff00", // Yellow
    //    ], // Animate background color
       transition: {
         duration: 12,
         repeat: Infinity,
         ease: "linear",
       },
     });
   };


    animateRocket();
  }, [controls]);

  return (
    <motion.div
      className="Rocket"
      animate={controls}
      style={{
        fontSize: "2em",
        position: "absolute",
        zIndex: "",
       
      }}
    >
      🚀
    </motion.div>
  );
};

export default MoveRocket;
