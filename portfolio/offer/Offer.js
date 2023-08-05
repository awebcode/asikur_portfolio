import React, { useEffect, useRef, useState } from "react";
import RightA from "@mui/icons-material/ArrowRightAlt";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
// import "./offer.css";

import { offerData } from "./OfferData";
import Modal from "./Modal";
import OfferCard from "./OfferCard";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
const Offer = () => {
  const [first, setfirst] = useState(false);
  const ref = useRef(null);
const [btn, setBtn] = useState(false);
useEffect(() => {
  if (window.innerWidth <= 768) {
    setBtn(true);
  }
}, [btn]);
  return (
    <>
      <div className="offer">
        <div className="container">
          <Tilt>
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
              {" "}
              <p style={{ textAlign: "center" }}>
                <span> My Featured</span> Services.
              </p>
              What I <span>Offer?.</span>
            </motion.h1>
          </Tilt>
          <div className="offer-main">
            {offerData?.map((v, i) => {
              return (
                <>
                  <OfferCard v={v} i={i} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
