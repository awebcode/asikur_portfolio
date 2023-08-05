import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./FAQ.module.css";

import Tilt from "react-parallax-tilt";
const questions = [
  {
    id: 1,
    question: "What is a web developer?",
    answer:
      "A web developer is a programmer who specializes in developing websites and web applications. They use coding languages such as HTML, CSS, and JavaScript to create and maintain web pages and web-based software.",
  },
  {
    id: 2,
    question: "What skills are required to become a web developer?",
    answer:
      "To become a web developer, you need to have a solid understanding of HTML, CSS, and JavaScript, as well as other programming languages and technologies such as React, Node.js, and databases. Good problem-solving skills, attention to detail, and the ability to work collaboratively with other developers and designers are also important.",
  },
  {
    id: 3,
    question: "What is responsive design?",
    answer:
      "Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It involves designing and coding web pages to automatically adjust their layout and content to fit the screen size of the device the user is using, whether it's a desktop computer, tablet, or smartphone.",
  },
  {
    id: 4,
    question: "What is a full-stack developer?",
    answer:
      "A full-stack developer is a web developer who has expertise in both front-end and back-end development. This means they are skilled in both client-side technologies such as HTML, CSS, and JavaScript, as well as server-side technologies such as Node.js and databases. They can build complete web applications from start to finish.",
  },
  {
    id: 22525,
    question: "Do you know Next Js Or React Js?",
    answer:
      "Yes, I know. Please message me for more info. contact me in https://www.facebook.com/md.asikur.9047506/",
  },
  {
    id: 2252523,
    question: "Can You Do Create or Customize Any Website Or Fix Issue or Error ?",
    answer:
      "Yes,As a full-stack web developer, I am capable of creating, customizing, and fixing issues or errors in a wide range of websites. My expertise in front-end and back-end technologies, as well as my experience in working with various CMS platforms, allows me to build, modify, and troubleshoot web applications efficiently and effectively.Whether it's building a website from scratch, customizing an existing website, or fixing issues and errors in a website, I have the skills and knowledge to provide reliable and high-quality solutions. I am dedicated to delivering exceptional results that meet the needs of my clients and end-users, and I am committed to staying up-to-date with the latest trends and technologies in the industry to ensure the best possible outcomes. Ultimately, my goal as a full-stack web developer is to create web applications that are user-friendly, efficient, and visually appealing, while also meeting the functional requirements of the project at hand. ",
  },
  {
    id: 225252,
    question: "Do you know MERN stack OR Next Js Web development?",
    answer:
      "Yes, I am familiar with MERN stack development as well as Next.js development. The MERN stack is a popular open-source stack used for building web applications, which consists of four main technologies: MongoDB, Express, React, and Node.js. Next.js, on the other hand, is a framework built on top of React that allows for server-side rendering, static site generation, and other advanced features.If you are a full-stack MERN and Next.js developer, it means you have experience in developing web applications using the MERN stack along with the Next.js framework. This implies that you have knowledge of MongoDB, Express, React, and Node.js for backend development, as well as the front-end development using React and Next.js. This experience allows you to create dynamic web applications with a scalable and maintainable architecture while utilizing the benefits of server-side rendering, static site generation, and other advanced features provided by Next.js.In terms of Fiverr, if a buyer asks you if you are familiar with MERN stack and Next.js development, you can confidently answer 'Yes'. Additionally, you can mention that you are a full-stack MERN and Next.js developer, which shows that you have expertise in both front-end and back-end web development using these technologies along with the benefits provided by the Next.js framework.",
  },
  {
    id: 225253,
    question:
      "Do You Know How To Use/Can you use HTML, CSS,Sass,Bootstrap,Tailwind CSS, JavaScript, Material UI, Font Awesome, Chakra UI, Express.js, Node.js, Cloudinary, Firebase, Next-Auth, MongoDB, MySQL, or other technologies?",
    answer:
      "'Yes',As a full-stack web developer, I am proficient in using a wide range of technologies, including HTML, CSS,Sass,Bootstrap,Tailwind CSS, JavaScript, Material UI, Font Awesome, Chakra UI, Express.js, Node.js, Cloudinary, Firebase, Next-Auth, MongoDB, MySQL, and many others. My knowledge of both front-end and back-end technologies allows me to develop and maintain robust web applications that are capable of handling complex tasks and user interactions.However, it's important to note that the specific technology stack I use depends on the requirements of the project at hand. Different projects have different needs, and it's my job as a full-stack web developer to select the most appropriate technologies to ensure the best possible outcome. My proficiency in both front-end and back-end technologies allows me to build web applications that are scalable, secure, and efficient, while also providing a great user experience. Ultimately, my aim is to create web applications that meet or exceed the expectations of my clients and end-users.",
  },
  {
    id: -1,
    question: "I'm ready to purchase your Service! What do I need to get started?",
    answer:
      "Send me your requirements in detail and your domain & hosting access (if you have),facebook:https://www.facebook.com/md.asikur.9047506/,gmail:asikurrahaman997@gmail.com,whatsapp:01893585782",
  },
  {
    id: -10,
    question: "Will you host my website?",
    answer: "Yes. I will, but you have to pay an extra hosting fee for your website.",
  },
  {
    id: -11,
    question: "Do I need to discuss before order Purchase?",
    answer: "Yes, You must need to discuss before purchase order.",
  },
  {
    id: -12,
    question: "Is your communication is good?",
    answer:
      "Yes, I have the ability to communicate well in English. Basically, Communication is one of the keys to success!",
  },
  {
    id: -2,
    question: "Can I see some your work samples?",
    answer: "You can drop me a inbox to see work samples.",
  },
  {
    id: -3,
    question: "Do you provide a Satisfaction Guarantee?",
    answer:
      "Yeah! – I provide a 100% Satisfaction Guarantee.And <span>Note this client Saticfiction is my first priority!</span>",
  },
  {
    id: -4,
    question: "Will My website be SEO And USER Friendly?",
    answer: "Yes, The basic structure of your website will be SEO And USER Friendly.",
  },
  {
    id: -5,
    question: "Will you setup/configure domain and install/migrate?",
    answer:
      "Yes, i can also setup/configure the domain on your hosting (Cpanel, VPS) and install/migrate wordpress without an extra charges.",
  },
  {
    id: 51,
    question: "Will I be able to edit my website easily?",
    answer:
      "Yeah! Your website will be fully editable/dynamic & you will be able to do modify very easily.You No Needs Programming skills!",
  },
  {
    id: 52,
    question: "Do you provide support after completing the order?",
    answer: "Yeah, I provide free support for anytime",
  },

  {
    id: 550,
    question: "I already hired someone and he broke my website!",
    answer:
      "Most sellers won't bother to resolve the conflicts that arise during an optimization. I wouldn't either if I was so underpaid! But I'm being paid fairly enough to go the extra mile and resolve pretty much every possible conflict. And have the required experience to do that.",
  },
  {
    id: 55,
    question: "Will I get (A) in GTmetrix and 90+ on Pagespeed Insights?",
    answer:
      "Your grades will be improved for sure but this is not where you should focus your efforts and time. Grades only matter in school. In real-web-world, ACTUAL performance of web is what matters and this can be assessed by timings. That's where I focus my optimization to make your site ACTUALLY fast.",
  },
  {
    id: "x",
    question: "Will I get a code of the web Application ?",
    answer: "Yes you'll get a code of your web application.",
  },
  {
    id: 53,
    question: "How do I contact a freelancer on Fiverr?",
    answer:
      "To contact a freelancer on Fiverr, go to their gig page and click on the Contact button. You can then send them a message to ask any questions or discuss your project in more detail.",
  },
  {
    id: 56,
    question: "What is the Fiverr service fee?",
    answer:
      "The Fiverr service fee is the fee charged by Fiverr for using their platform to find and hire freelancers. The fee is typically 20% of the total order amount.",
  },

  {
    id: 210,
    question: "What kind of database do you recommend for my web application?",
    answer:
      "The type of database you should use depends on the specific needs of your web application. Some popular options include MySQL, PostgreSQL, MongoDB, and SQLite. Factors to consider when choosing a database include scalability, performance, data structure, and ease of use.",
  },
  {
    id: 220,
    question:
      "What front-end framework do you recommend for building responsive web designs?",
    answer:
      "There are many great front-end frameworks to choose from, including Bootstrap,Reac Js,Next Js, Foundation, Materialize, and Semantic UI. All of these frameworks offer responsive design features that make it easy to create beautiful, mobile-friendly websites. The best one for your project will depend on your specific needs and preferences.",
  },

  {
    id: 243,
    question: "What are some common security threats to web applications?",
    answer:
      "Web applications are vulnerable to a variety of security threats, including cross-site scripting (XSS), cross-site request forgery (CSRF), SQL injection, and session hijacking. To protect your web application, it's important to implement security best practices like input validation, parameterized queries, and encryption. You can also use security frameworks like Helmet and Passport to help secure your application.",
  },
  {
    id: 253,
    question: "What is the best way to optimize the performance of my web application?",
    answer:
      "There are many strategies you can use to optimize the performance of your web application, including minimizing HTTP requests, compressing files, using caching, and minimizing code. You can also use performance testing tools like Google Lighthouse and WebPageTest to identify performance bottlenecks and make improvements. It's important to continuously monitor and optimize the performance of your web application to ensure a great user experience.",
  },
];

function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(id);
    }
  };

  return (
    <>
      
      <div className={styles.faq}>
        <Tilt>
          {" "}
          <h2 className="main-title">Quick Questions</h2>
        </Tilt>

        <div className={styles.questions}>
          {questions.map((q) => (
            <Tilt>
              <div key={q.id} className={styles.question}>
                <div
                  className={styles.questionHeader}
                  onClick={() => toggleQuestion(q.id)}
                >
                  <div className={styles.questionTitle}>{q.question}</div>
                  {activeQuestion === q.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {activeQuestion === q.id && (
                  <div className={styles.questionAnswer}>{q.answer}</div>
                )}
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </>
  );
}

export default FAQ;
