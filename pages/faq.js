import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./FAQ.module.css";
import Footer from "@/components/footer/Footer";
import Head from "next/head";

const questions = [
  {
    id: 60,
    question: "What is a MERN stack?",
    answer:
      "MERN stack is a popular set of technologies for building full-stack web applications. It consists of MongoDB (database), Express (back-end web framework), React (front-end library), and Node.js (JavaScript runtime).",
  },
  {
    id: 2,
    question: "What is Next.js?",
    answer:
      "Next.js is a React-based framework for building server-side rendered and statically generated web applications. It offers features like automatic code splitting, server-side rendering, and static site generation, along with a simple and intuitive API for building modern web apps.",
  },
  {
    id: 3,
    question: "What kind of projects can you build with MERN and Next.js?",
    answer:
      "You can build a wide range of web applications with MERN and Next.js, including e-commerce platforms, social networks, content management systems, and more. The combination of MongoDB, Express, React, Node.js, and Next.js provides a flexible and scalable foundation for building modern, high-performance web apps.",
  },
  {
    id: 4,
    question: "What is your experience with MERN and Next.js?",
    answer:
      "I have several years of experience building web applications with the MERN stack and Next.js. I have worked on projects ranging from small MVPs to large-scale enterprise applications, and I am comfortable with a wide range of front-end and back-end technologies and frameworks.",
  },
  {
    id: 103,
    question: "What is NodeJS?",
    answer:
      "NodeJS is an open-source, cross-platform JavaScript runtime environment that allows developers to build server-side applications using JavaScript. It is built on the V8 engine and provides an event-driven, non-blocking I/O model that makes it lightweight and efficient.",
  },
  {
    id: 104,
    question: "What is Redux?",
    answer:
      "Redux is a predictable state container for JavaScript applications. It helps manage the state of your application in a single location, making it easier to debug, test, and maintain. Redux is commonly used with ReactJS, but can be used with any JavaScript framework.",
  },
  {
    id: 105,
    question: "What is server-side rendering (SSR)?",
    answer:
      "Server-side rendering (SSR) is a technique that renders the initial HTML of a web page on the server before sending it to the client. This can improve performance and search engine optimization (SEO), as well as provide a better user experience for users with slower internet connections or older devices.",
  },
  {
    id: 5,
    question: "What is a REST API?",
    answer:
      "REST (Representational State Transfer) is a software architectural style that defines a set of constraints to be used for creating Web services. A RESTful API is a type of web service that adheres to the REST architecture and uses HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on data.",
  },
  {
    id: 6,
    question: "What is GraphQL?",
    answer:
      "GraphQL is a query language for APIs that was developed by Facebook. It provides a more efficient, powerful and flexible alternative to REST APIs by allowing clients to specify exactly what data they need, and only receiving that data in response.",
  },
  {
    id: 7,
    question: "What is version control?",
    answer:
      "Version control is the process of managing changes to code or other documents. It allows multiple developers to work on the same codebase simultaneously without interfering with each other’s work. Version control systems like Git provide tools to manage code changes, track file history, and collaborate effectively.",
  },
  {
    id: 8,
    question: "What is cloud computing?",
    answer:
      "Cloud computing refers to the delivery of computing services over the Internet. It allows businesses and individuals to access powerful computing resources on demand without having to invest in expensive hardware or software. Common cloud services include hosting, storage, and software-as-a-service (SaaS) applications.",
  },
  {
    id: 9,
    question: "What is Docker?",
    answer:
      "Docker is a containerization platform that allows developers to package their applications and dependencies into a portable, self-contained unit called a container. Containers make it easier to deploy and run applications consistently across different environments, such as development, testing, and production.",
  },
  {
    id: 262661,
    question: "What is a web developer?",
    answer:
      "A web developer is a programmer who specializes in developing websites and web applications. They use coding languages such as HTML, CSS, and JavaScript to create and maintain web pages and web-based software.",
  },
  {
    id: 2622,
    question: "What skills are required to become a web developer?",
    answer:
      "To become a web developer, you need to have a solid understanding of HTML, CSS, and JavaScript, as well as other programming languages and technologies such as React, Node.js, and databases. Good problem-solving skills, attention to detail, and the ability to work collaboratively with other developers and designers are also important.",
  },
  {
    id: 26563,
    question: "What is responsive design?",
    answer:
      "Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It involves designing and coding web pages to automatically adjust their layout and content to fit the screen size of the device the user is using, whether it's a desktop computer, tablet, or smartphone.",
  },
  {
    id: 2524,
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
    id: -21,
    question: "I'm ready to purchase your Service! What do I need to get started?",
    answer:
      "Send me your requirements in detail and your domain & hosting access (if you have)",
  },
  {
    id: -1250,
    question: "Will you host my website?",
    answer: "Yes. I will, but you have to pay an extra hosting fee for your website.",
  },
  {
    id: -1251,
    question: "Do I need to discuss before order Purchase?",
    answer: "Yes, You must need to discuss before purchase order.",
  },
  {
    id: -3512,
    question: "Is your communication is good?",
    answer:
      "Yes, I have the ability to communicate well in English. Basically, Communication is one of the keys to success!",
  },
  {
    id: -22,
    question: "Can I see some your work samples?",
    answer: "You can drop me a inbox to see work samples.",
  },
  {
    id: -53,
    question: "Do you provide a Satisfaction Guarantee?",
    answer:
      "Yeah! – I provide a 100% Satisfaction Guarantee.And <span>Note this client Saticfiction is my first priority!</span>",
  },
  {
    id: -34,
    question: "Will My website be SEO And USER Friendly?",
    answer: "Yes, The basic structure of your website will be SEO And USER Friendly.",
  },
  {
    id: -35,
    question: "Will you setup/configure domain and install/migrate?",
    answer:
      "Yes, i can also setup/configure the domain on your hosting (Cpanel, VPS) and install/migrate wordpress without an extra charges.",
  },
  {
    id: 541,
    question: "Will I be able to edit my website easily?",
    answer:
      "Yeah! Your website will be fully editable/dynamic & you will be able to do modify very easily.You No Needs Programming skills!",
  },
  {
    id: 542,
    question: "Do you provide support after completing the order?",
    answer: "Yeah, I provide free support for anytime",
  },

  {
    id: 5450,
    question: "I already hired someone and he broke my website!",
    answer:
      "Most sellers won't bother to resolve the conflicts that arise during an optimization. I wouldn't either if I was so underpaid! But I'm being paid fairly enough to go the extra mile and resolve pretty much every possible conflict. And have the required experience to do that.",
  },
  {
    id: 545,
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
    id: -1,
    question: "How can I find the right freelancer for my project?",
    answer:
      "Fiverr offers a search function that allows you to filter freelancers based on their skills, expertise, location, and other criteria. You can also browse through the different categories to find freelancers who specialize in the services you need. Once you find a freelancer who looks promising, you can review their profile, portfolio, and ratings before contacting them to discuss your project.",
  },
  {
    id: -2,
    question: "How much should I expect to pay for a freelancer?",
    answer:
      "The cost of a freelancer varies depending on a number of factors, including their level of experience, the complexity of the project, and the time required to complete it. Fiverr freelancers set their own prices, so you can compare prices and select a freelancer who offers a rate that fits your budget.",
  },
  {
    id: -3,
    question: "What kind of services can I get from a Fiverr freelancer?",
    answer:
      "Fiverr offers a wide range of services, including graphic design, web development, writing and translation, video and animation, music and audio, programming and tech, business, and lifestyle services. You can browse through the different categories to find freelancers who offer the services you need.",
  },
  {
    id: -4,
    question: "How do I communicate with my freelancer?",
    answer:
      "Fiverr provides a messaging system that allows you to communicate directly with your freelancer. You can use this system to discuss your project, provide feedback, and ask questions throughout the project.",
  },
  {
    id: -5,
    question: "What happens if I'm not satisfied with the work done by my freelancer?",
    answer:
      "If you're not satisfied with the work done by your freelancer, you can request revisions to the work or contact Fiverr customer support for assistance. If the issue cannot be resolved, you may be eligible for a refund.",
  },
  {
    id: 51,
    question: "How do I sign up for Fiverr?",
    answer:
      "To sign up for Fiverr, go to the Fiverr homepage and click on the Join button in the top right corner. You can then sign up using your email address or your Google or Facebook account.",
  },
  {
    id: 52,
    question: "How do I find a freelancer on Fiverr?",
    answer:
      "To find a freelancer on Fiverr, use the search bar on the homepage to enter keywords related to the type of service you need. You can also browse through categories and subcategories to find freelancers that match your needs.",
  },
  {
    id: 53,
    question: "How do I contact a freelancer on Fiverr?",
    answer:
      "To contact a freelancer on Fiverr, go to their gig page and click on the Contact button. You can then send them a message to ask any questions or discuss your project in more detail.",
  },
  {
    id: 54,
    question: "How do I pay for a service on Fiverr?",
    answer:
      "To pay for a service on Fiverr, you can use a credit or debit card, PayPal, or Apple Pay. Simply select your preferred payment method during the checkout process.",
  },
  {
    id: 55,
    question: "How do I cancel an order on Fiverr?",
    answer:
      "To cancel an order on Fiverr, go to the order page and click on the Resolution Center button. From there, you can request a cancellation and explain your reason for doing so. The seller can then approve or decline your request.",
  },
  {
    id: 56,
    question: "What is the Fiverr service fee?",
    answer:
      "The Fiverr service fee is the fee charged by Fiverr for using their platform to find and hire freelancers. The fee is typically 20% of the total order amount.",
  },
  {
    id: 57,
    question: "What if I'm not satisfied with the work done by a freelancer on Fiverr?",
    answer:
      "If you're not satisfied with the work done by a freelancer on Fiverr, you can request a revision or ask for a refund. If you can't come to an agreement with the seller, you can contact Fiverr's customer support for assistance.",
  },
  {
    id: 58,
    question: "Can I hire a freelancer for an ongoing project on Fiverr?",
    answer:
      "Yes, you can hire a freelancer for an ongoing project on Fiverr by setting up a custom offer or ordering multiple gigs from the same freelancer.",
  },
  {
    id: 59,
    question: "How do I leave a review for a freelancer on Fiverr?",
    answer:
      "To leave a review for a freelancer on Fiverr, go to the order page and click on the Leave a Review button. You can then rate the freelancer and leave a written review of their services.",
  },

  {
    id: 10,
    question: "What is GraphQL and how is it used in full-stack development?",
    answer:
      "GraphQL is a query language for APIs that was developed by Facebook. It allows developers to define the structure of data they require from an API, and receive exactly that data. In full-stack development, GraphQL can be used as an alternative to traditional REST APIs, allowing for more efficient data fetching and reducing the amount of network requests made by clients.",
  },
  {
    id: 11,
    question: "What is Redux and why is it useful in full-stack development?",
    answer:
      "Redux is a predictable state container for JavaScript apps. It helps manage state in complex applications by providing a centralized store for all application data, allowing for easy state management and updating. In full-stack development, Redux can be used to manage state in both the front-end and back-end, simplifying the development process and improving overall application performance.",
  },
  {
    id: 12,
    question: "What is Docker and how is it used in full-stack development?",
    answer:
      "Docker is a containerization platform that allows developers to package their applications and dependencies into containers that can run on any platform. In full-stack development, Docker can be used to create portable, scalable, and consistent environments for development, testing, and deployment, improving the reliability and speed of the development process.",
  },
  {
    id: 13,
    question: "What is AWS and how is it used in full-stack development?",
    answer:
      "AWS (Amazon Web Services) is a cloud computing platform that provides a range of services and tools for building and managing applications in the cloud. In full-stack development, AWS can be used for hosting, storage, databases, networking, security, and more, making it a valuable tool for building scalable and resilient full-stack applications.",
  },
  {
    id: 14,
    question: "What is Agile development and how is it used in full-stack development?",
    answer:
      "Agile development is an iterative approach to software development that emphasizes collaboration, flexibility, and customer satisfaction. In full-stack development, Agile methodologies can be used to improve communication and productivity among developers, testers, and stakeholders, ensuring that applications are delivered on time and to the satisfaction of all parties involved.",
  },
  {
    id: 15,
    question: "What is DevOps and how is it used in full-stack development?",
    answer:
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to improve the overall application development and deployment process. In full-stack development, DevOps can be used to automate the building, testing, and deployment of applications, reducing the time and resources required for these tasks and improving the quality and reliability of the application.",
  },
  {
    id: 16,
    question:
      "What is continuous integration and how is it used in full-stack development?",
    answer:
      "Continuous integration is a development practice that involves merging code changes into a central repository multiple times per day, with each change automatically tested and built. In full-stack development, continuous integration can be used to catch and resolve issues early in the development process, reducing the risk of errors and ensuring that applications are delivered on time and to the satisfaction of stakeholders.",
  },
  {
    id: 21,
    question: "What is the difference between front-end and back-end development?",
    answer:
      "Front-end development is the practice of creating the user interface of a web application. It involves the use of languages like HTML, CSS, and JavaScript to create the look and feel of the application. Back-end development, on the other hand, is the practice of creating the server-side logic that powers the application. It involves the use of languages like PHP, Python, and Ruby, as well as frameworks like Node.js and Django.",
  },
  {
    id: 22,
    question: "What is responsive web design?",
    answer:
      "Responsive web design is an approach to web design that aims to provide an optimal viewing experience for users across a range of devices, from desktops to smartphones. It involves using flexible layouts and grids, fluid images, and media queries to adapt the layout and design of a website to fit the screen size of the device being used to view it.",
  },
  {
    id: 23,
    question: "What is version control?",
    answer:
      "Version control is a system for managing changes to code or other files over time. It allows developers to keep track of changes made to a project, collaborate with others on the same project, and revert to earlier versions if necessary. Popular version control systems include Git and Subversion.",
  },
  {
    id: 24,
    question: "What is a RESTful API?",
    answer:
      "A RESTful API is a type of web service that uses HTTP methods like GET, POST, PUT, and DELETE to interact with resources on a server. It adheres to the principles of Representational State Transfer (REST), which emphasizes the use of URLs and standardized data formats like JSON and XML to create a uniform interface for accessing resources.",
  },
  {
    id: 25,
    question: "What is cloud computing?",
    answer:
      "Cloud computing is the delivery of computing services over the internet, including servers, storage, databases, networking, software, analytics, and intelligence. Cloud computing allows businesses to access a range of services on-demand, without the need to invest in and manage their own computing infrastructure. Popular cloud computing providers include Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).",
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
      "There are many great front-end frameworks to choose from, including Bootstrap, Foundation, Materialize, and Semantic UI. All of these frameworks offer responsive design features that make it easy to create beautiful, mobile-friendly websites. The best one for your project will depend on your specific needs and preferences.",
  },
  {
    id: 230,
    question: "What is the best way to test my web application?",
    answer:
      "There are several different types of testing you can use to ensure your web application is working correctly, including unit testing, integration testing, and end-to-end testing. You can use testing frameworks like Mocha, Jest, and Selenium to help automate your tests and ensure that your application is working as expected. It's also a good idea to test your application on different devices and browsers to ensure compatibility.",
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
      <Head>
        <title> FAQ | Questions | Answers - Asikur Portfolio Website</title>
        <meta
          name="description"
          content=" FAQ | Questions | Answers - Asikur Portfolio Website . Explore the frequently asked questions and get answers on Asikur's captivating portfolio website. Find information on web development, design, coding, and technology. Gain insights into the creative mind behind the website. Optimized for easy navigation and user satisfaction."
        />
      </Head>
      <div className={styles.faq}>
        <h2 className="main-title">Quick Questions</h2>
        <div className={styles.questions}>
          {questions.map((q) => (
            <div key={q.id} className={styles.question}>
              <div className={styles.questionHeader} onClick={() => toggleQuestion(q.id)}>
                <div className={styles.questionTitle}>{q.question}</div>
                {activeQuestion === q.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {activeQuestion === q.id && (
                <div className={styles.questionAnswer}>{q.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FAQ;
