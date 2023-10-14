import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const MobileRockt = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animateRocket = async () => {
      await controls.start({
        x: [0, 400, 450, 0, 0], // Adjusted x values for mobile
        y: [0, 0, 450, 450, 0], // Adjusted y values for mobile
        rotate: [0, 90, 180, 270, 360], // Adjust the rotation
        scale: [1, 1.2, 1.4, 1.6, 1.8, 2, 2.1, 2], // Adjusted scale values for mobile
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
        fontSize: "1em",
        position: "absolute",
        zIndex: "",
       
      }}
    >
      🚀
    </motion.div>
  );
};

export default MobileRockt;
