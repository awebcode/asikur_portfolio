import { Card, Title, AreaChart, BarChart } from "@tremor/react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
const chartdata = [
  {
    date: "22 -2016",
    gpa: 5, // Change gpa to whatever you're tracking
    examName: "Secondary School Certificate",
    degree: "GPA 5",
  },
  {
    date: "2016-2020",
    gpa: 4, // Change gpa to whatever you're tracking
    examName: "Diploma In Computer Engineering",
    degree: "CGPA 4 OUT OF 4",
  },
  {
    date: "2020-2023",
    gpa: 4, // Change gpa to whatever you're tracking
    examName: "B.sc In Computer Engineering",
    degree: "CGPA 4 OUT OF 4",
  },
  {
    date: "2018 -2020",
    gpa: 2, // Change gpa to whatever you're tracking
    examName: "Web Development Internship",
    degree: "Web Development",
  },
  {
    date: "2020 -2021",
    gpa: 3, // Change gpa to whatever you're tracking
    examName: "Back End Development Remote",
    degree: "Junior Developer",
  },
  {
    date: "2021 -2024",
    gpa: 5, // Change gpa to whatever you're tracking
    examName: "Full-Stack Development Remote",
    degree: "Leadership",
  },
];
const options = {
    tooltips: {
      position:"average",
      callbacks: {
      label: function(context) {
        const data = chartdata[context.dataIndex];
        return `Date: ${data.date}, Value: ${data.value}, Exam: ${data.examName}, Degree: ${data.degree}`;
      }
    }
  }
};



const ChartComponent = () => (
  <>
    <Tilt className="my-2">
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
                // style={{textTransform:"uppercase"}}
      >
        Edu<span>cation.</span>
      </motion.h1>
    </Tilt>
    <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 p-4 py-14 md:p-10">
      <Card className="flex-1">
        <Title>Education Achievements</Title>
        <div className="h-72 md:h-96 mt-4 mx-auto w-full">
          <AreaChart
            {...options}
            className="w-full h-full"
            data={chartdata}
            index="date"
            categories={["degree", "examName", "gpa"]}
            colors={["indigo", "cyan", "green"]}
          />
        </div>
      </Card>
      <Card className="flex-1">
        <Title>Education Achievements (Bar Chart)</Title>
        <div className="h-72 md:h-96 mt-4 mx-auto w-full">
          <BarChart
            {...options}
            className="w-full h-full"
            data={chartdata}
            index="date"
            categories={["degree", "examName", "gpa"]}
            colors={["indigo", "cyan", "green"]}
          />
        </div>
      </Card>
    </div>
  </>
);

export default ChartComponent;
