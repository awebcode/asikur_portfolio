import { Data } from "@/components/data/DataAll";
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <>
      <Head>
        <title>All Works|Portfolio -Asikur Portfolio Website</title>
       

       
      </Head>
      <div className="container">
        <div className="ports-main">
          <h1 className="main-title">
            All My <span>Works.</span>
          </h1>
          <div className="port-main">
            {Data.map((data) => {
              return (
                <>
                  <div className="port-box">
                    <div className="port-img">
                      <Link href={data?.onclick ? data?.onclick : "#"}>
                        <Image
                          src={data?.image ? data.image : "/portfolio/home.png"}
                          alt=""
                          height={1000}
                          width={1000}
                        />
                      </Link>
                    </div>
                    <div className="port-content">
                      <span>
                        {data.date ? data.date + data.cat : "18/05/2023/" + data.cat}
                      </span>
                      <h2>
                        {" "}
                        <span>
                          {data.title ? data.title : " This Is Awesome Project."}
                        </span>
                      </h2>
                      <p>
                        {data.desc
                          ? data.desc.slice(0, 80) + "..."
                          : "lorSunt aliqua officia voluptate excepteur nulla adipisicing aute nostrud exercitation nulla ipsum ea mollit. Nostrud fugiat eu sunt dolo aliqua deserunt eiusmod est consectetur deserunt esse mollit"}
                      </p>
                      <Link href={data?.onclick ? data?.onclick : "#"}>
                        See More &rarr;
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
