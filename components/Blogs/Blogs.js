import React, { useState } from "react";
// import "./blog.css";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Data } from "../data/Data";
import Pagination from "../pagination/Pagination";
import Link from "next/link";
const Blog = () => {
    const [data, setData] = useState(Data)
    const filter = (e) => {
        const updFilter = Data.filter((w) => {
            return w.cat === e
           
        })
        setData(updFilter)
  }
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      {" "}
      <div className="blog">
        {" "}
        <div className="container">
          <h1 className="main-title">
            What <span>Includes</span> In My <span>Blogs?</span>
          </h1>
          <div className="btn-container">
            <button onClick={() => setData(Data)}>All</button>
            <button onClick={() => filter("ecommerce")}>E-Commerce</button>
            <button onClick={() => filter("portfolio")}>Portfolio</button>

            <button onClick={() => filter("3d")}>3d Website</button>
          </div>
          <div className="ports-main">
            <div className="port-main">
              {currentPosts.map((data, index) => {
                return (
                  <>
                  
                 
                      <div className="port-box">
                        <div className="port-img">
                          <Link href={data?.onclick ? data?.onclick : "#"}>
                            <img
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
                          <Link href={`#`}>See More &rarr</Link>
                        </div>
                      </div>
                   
                  </>
                );
              })}
            </div>
          </div>
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

export default Blog;
