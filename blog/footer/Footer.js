import React, { useEffect, useState } from "react";
// import "./footer.css";
import Facebook from "@material-ui/icons/Facebook";
import Whatsapp from "@material-ui/icons/WhatsApp";
import Twitter from "@material-ui/icons/Twitter";
import Instragram from "@material-ui/icons/Instagram";
import Youtube from "@material-ui/icons/YouTube";
import Mail from "@material-ui/icons/Mail";
import { Data } from "../data/Data";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getCategories } from "@/actions/categoryAction";
import { getTags } from "@/actions/tagAction";
import { GitHub } from "@material-ui/icons";

const FooterBlog = () => {
   const categories = useSelector((state) => state.category);
   const tags = useSelector((state) => state.tags);
  const { products } = useSelector((state) => state.allProducts);
  const dispatch=useDispatch()
 const [catC, setCat] = useState([]);
 const [tagC, setTag] = useState([]);

 useEffect(() => setTag(tags));
  useEffect(() => setCat(categories));
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
  }, [])
  
  return (
    <>
      <div className="">
        <div className="footer_side">
          <div>
            <h2>Popular Posts</h2>
            <ul className="popular">
              {products &&
                products
                  .sort((a, b) => {
                    return b.count - a.count;
                  })
                  .slice(0, 4)
                  .map((v, i) => {
                    return (
                      <li>
                        <Link href={`/blog/${v._id}`}>
                          <img src={v?.images[0]?.url} alt="" />

                          <p>{v.title.slice(0, 20) + "..."}</p>
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div>
            <h2>Categories.</h2>
            <ul>
              {catC &&
                catC.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link href={`/blog/category/${v.name}`} className="category-link">
                        {v.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h2>Tag</h2>
            <ul>
              {tagC &&
                tagC.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link href={`/blog/tag/${v.name}`} className="category-link">
                        #{v.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h2>Follow Me</h2>
            <ul className="social">
              <li>
                <Link href="https://www.facebook.com/md.asikur.9047506/">
                  <Facebook />{" "}
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Whatsapp />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Twitter />{" "}
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Instragram />{" "}
                </Link>
              </li>
              <li>
                <Link href="https://www.github.com/Md-Asikur/">
                  <GitHub />{" "}
                </Link>
              </li>
              <li>
                <Link href="#">
                  <Mail />{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="center">
          created by md asikur<span>2023</span>@all Right <span>Reserved..</span>
        </p>
      </div>
    </>
  );
};

export default FooterBlog;
