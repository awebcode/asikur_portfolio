
import Link from "next/link";
import React from "react";

const Card = ({data}) => {
  return (
    <>
     
        <div className="ports-main">
        
          <div className="port-main">
           
                      <div className="port-box">
                          
                          <div className="port-img">
                               <Link href={data?.onClick?data?.onClick:"#"}>
                                  <img src={data?.image ? data.image : "/portfolio/home.png"} alt="" />
                                  </Link>
                </div>
                <div className="port-content">
                  <span>{data.date ? data.date : "18/05/2023/web development"}</span>
                  <h2>
                    {" "}
                    <span>{data.title ? data.title : " This Is Awesome Project."}</span>
                  </h2>
                  <p>
                    {data.desc
                      ? data.desc.slice(0, 150)
                      : "lorSunt aliqua officia voluptate excepteur nulla adipisicing aute nostrud exercitation nulla ipsum ea mollit. Nostrud fugiat eu sunt dolo aliqua deserunt eiusmod est consectetur deserunt esse mollit"}
                  </p>
                  <Link href={`#`}>See More &rarr</Link>
                </div>
              </div>
            
          </div>
        </div>
      
    </>
  );
};

export default Card;
