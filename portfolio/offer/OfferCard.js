import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { offerData } from "./OfferData";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
const OfferCard = (props) => {
  const [first, setfirst] = useState(false);
  // console.log(first)
  const ref = useRef(null);
  useEffect(() => {
    let handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setfirst(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setBtn(true);
    }
  }, [btn]);
  return (
    <>
      {btn ? (
        <Tilt className="offer-con-main" onClick={() => setfirst(!first)}>
          <motion.div
            ref={ref}
            onClick={() => setfirst(!first)}
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            // whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: props.i,
              opacity: { duration: 1 },
              y: { type: "spring", stiffness: 60 },
              duration: 0.4,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="offer-content"
          >
            <Image
              src={props.v.icon}
              alt="ahh"
              height={1080}
              width={1920}
              style={{
                height: "50px",
                width: "50px",
                animation: "none",
                display: "block",
                margin: "0 auto",
              }}
            />
            <h3>{props.v.company_name}</h3>
            <p>
              See More &rarr;
              {/* <span>
            <ArrowRightAlt />
          </span> */}
            </p>
          </motion.div>
        </Tilt>
      ) : (
        <Tilt className="offer-con-main" onClick={() => setfirst(!first)}>
          <motion.div
            className="offer-content"
            ref={ref}
            onClick={() => setfirst(!first)}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            // whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              opacity: { duration: 1 },
              x: { type: "spring", stiffness: 60 },
              duration: 0.4,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
          >
            <div
              style={{
                height: "150px",
                width: "220px",
                animation: "none",
                display: "block",
                margin: "0 auto",
              }}
            >
              <Image
                src={props.v.icon}
                alt="ahh"
                height={1080}
                width={1920}
                style={{
                  height: "100%",
                  width: "100%",
                  animation: "none",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>

            <h3>{props.v.company_name}</h3>
            <p>
              See More &rarr;
              {/* <span>
            <ArrowRightAlt />
          </span> */}
            </p>
          </motion.div>
        </Tilt>
      )}
      {first && (
        <>
          <Modal setfirst={setfirst} v={props.v} />
        </>
      )}
    </>
  );
};

export default OfferCard;
