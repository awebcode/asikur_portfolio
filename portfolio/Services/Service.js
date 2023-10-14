import { Card, Subtitle, Metric, Text, Divider } from "@tremor/react";
import { offerData } from "./OfferData";
import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion"
export default () => {
  const [selectedData, setSelectedData] = useState(null);

  const handleCardClick = (data) => {
    setSelectedData(data);
  };
    return (
      <>
        {" "}
        <Tilt className="my-2" id="services">
          <motion.h1
            className="main-title"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            // animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              opacity: { duration: 0.6 },
              y: { type: "spring", stiffness: 60 },
              duration: 0.4,
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
        <div className="flex flex-wrap justify-center  p-2 md:p-20">
          {offerData.map((s, i) => (
            <Card
              className="flex-[40%] max-w-sm mx-auto cursor-pointer"
              decoration="left"
              decorationColor="emerald"
              onClick={() => handleCardClick(s)}
            >
              <Divider style={{ borderColor: "blue" }}>Sales</Divider>
              <Metric>$ {s.sell}</Metric>
              <Divider>Service</Divider>
              <Metric>{s.company_name}</Metric>
              <Divider>Description</Divider>
              <Text className="text-[10px] md:text-lg">
                {s.points[0] + s.points[1]}{" "}
                <span className="text-emerald-400 lowercase">more...</span>
              </Text>
            </Card>
          ))}

          {selectedData && <Modal v={selectedData} setfirst={setSelectedData} />}
        </div>
      </>
    );
};
