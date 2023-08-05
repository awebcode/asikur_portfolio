import React, { useEffect, useState } from 'react'
// import "./sider.css"
import Facebook from "@material-ui/icons/Facebook"
import Whatsapp from "@material-ui/icons/WhatsApp";
import Twitter from "@material-ui/icons/Twitter"
import Instragram from "@material-ui/icons/Instagram";
import Youtube from "@material-ui/icons/YouTube";
import Mail from "@material-ui/icons/Mail";
import{ Data} from "../data/Data"
import { useDispatch, useSelechrefr, useSelector } from 'react-redux';
import { getUserDetails, loadUser } from '../../actions/userAction';
import { getAllProducts, getProductDetails } from '../../actions/productAction';

import { getTags } from '../../actions/tagAction';
import { getCategories } from '../../actions/categoryAction';
import Link from 'next/link';
import { GitHub } from '@material-ui/icons';

const SideRight = () => {
 
 const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  const [catC, setCat] = useState([])
  const [tagC, setTag] = useState([]);
   const [data, setData] = useState([]);
  
  const categories = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tags);

 useEffect(() => setTag(tags));
 useEffect(() => setCat(categories));
 useEffect(() => {
   dispatch(getCategories());
   dispatch(getTags());
 }, []);
  
 
  return (
    <div className="side-r">
      <div>
        <h2>Popular Posts</h2>
        <ul className="popular">
          {products
            .sort((a, b) => {
              return b.count - a.count;
            })
            .slice(0, 4)
            .map((v, i) => {
              return (
                <li>
                  <Link href={`/blog/${v._id}`}>
                    <Link href="#">
                      <img src={v?.images[0]?.url} alt="" />
                    </Link>
                    <p>{v.title.slice(0, 20)}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <h2>Categories</h2>
        <ul>
          {catC &&
            catC.map((v, i) => {
              return (
                <li key={v?._id}>
                  <Link href={`/blog/category/${v?.name}`} className="category-link">
                    {v?.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <h2>Tags</h2>
        <ul>
          {tagC &&
            tagC.map((v, i) => {
              return (
                <li key={v?._id}>
                  <Link href={`/blog/tag/${v?.name}`} className="category-link">
                    #{v?.name}
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
              <Whatsapp />{" "}
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
            <Link href="https://www.github.com/md-asikur">
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
  );
}

export default SideRight