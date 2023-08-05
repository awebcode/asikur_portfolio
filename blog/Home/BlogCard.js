
import { Comment, Delete, Edit, Facebook, FavoriteBorderOutlined, MailOutline, Share, YouTube } from '@material-ui/icons';
import { Visibility } from '@mui/icons-material';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { getComments } from '../../actions/commentAction';
import { deleteProduct, getAllProducts, productClearErrors } from '../../actions/productAction';
import Loading from '../../components/Loading/Loading';
import SideRight from '../sideright/SideRight';
import ShareModal from './ShareModal';
// import "./BlogCard.css"
const BlogCard = (props) => {
  const [openShare, setOpenShare] = useState(false);
  const Navigate=useRouter()
  const dispatch=useDispatch()
  const { user: currUser } = useSelector((s) => s.user)
  // console.log(currUser)
  const { loading, isDeleted } = useSelector((s) => s.updDelProduct);
   const { images, desc, category, title, profile, time, _id, user,likes, comments,createdAt,tag } = props.v;
  // const { image, desc, category, title, profile, time, _id, user, comments } = props.v;
  const deleteProductHandler = (id) => {
    if (window.confirm("Are You sure want to delete this blog?.😍😎")) {
      dispatch(deleteProduct(id));
       dispatch(getAllProducts());
    }
   
   
   
  };
  useEffect(() => {
    if (isDeleted) {
      toast.warning("Product Deleted");
      Navigate.push("/account")
      dispatch(productClearErrors())
   }
  }, [isDeleted])
  
  return (
    <>
      {" "}
      <div className="blog-card">
        <Link href={`/blog/${_id}`} className="card-main-link">
          <div className="blog-img">
            <img src={images[0]?.url} alt="" />
          </div>
        </Link>
        <div className="blog-content">
          <span>
            <Link href={`/blog/category/${category}`} className="category-link">
              {category}
            </Link>{" "}
            -{moment(createdAt).format("LLL")}
          </span>
          <h3>{title.substr(0, 43)}</h3>
          <p>{desc.slice(0, 150) + "  see more.."}</p>

          <p>
            {" "}
            <Link href={`/blog/tag/${tag}`} className="category-link">
              -{tag}
            </Link>
          </p>
          <p>
            <Link
              href={
                user?._id === currUser?._id ? "/account" : `/user/profile/${user?._id}`
              }
            >
              {" "}
              <img
                style={{ border: "3px solid  rgb(29 78 216)" }}
                src={user?.avatar ? user?.avatar : user?.image}
                alt=""
              />{" "}
              <span>{time}</span>{" "}
              {/* <img src={profile} alt="" /> <span>{time}</span>{" "} */}
            </Link>
            {/*  <Link href={`${user?._id === currUser?._id?'/account':`/user/profile/${user?._id}``} className="name">
                {user?.name}
              </Link>*/}
            <span>
              <Link
                href={
                  user?._id === currUser?._id ? "/account" : `/user/profile/${user?._id}`
                }
                className="name category-link"
              >
                {user?.name}
              </Link>
              <span style={{ fontSize: "12px", display: "block" }} className="name-title">
                {user?.details && user?.details?.job}
              </span>
            </span>
          </p>
          <p className="blog-card-social">
            {" "}
            <Facebook />
            <YouTube />
            <MailOutline />
            <Comment />
            <span>{comments}</span>
            <FavoriteBorderOutlined />
            <span>{likes}</span>
          </p>
          {currUser?.role === "admin" || user?._id === currUser?._id ? (
            <span className="blog-card-ed-del-btn">
              {/* <Link href={`/blog/update/${_id}`}>
                <Edit />
              </Link> */}
              <Link href={`/Create/${_id}`}>
                <Edit />
              </Link>
              <button disabled={loading} onClick={() => deleteProductHandler(_id)}>
                {" "}
                {loading ? "loading" : <Delete />}
              </button>
              <Link href={`/blog/${_id}`}>
                <Visibility />
              </Link>
              <a
                onClick={() => setOpenShare(!openShare)}
               
                style={{ padding: "0px 10px" }}
              >
                <Share />
              </a>
            </span>
          ) : (
            <span className="blog-card-ed-del-btn">
              <Link href={`/blog/${_id}`}>
                <Visibility />
              </Link>
              <a
                onClick={() => setOpenShare(!openShare)}
               
                style={{ padding: "0px 10px" }}
              >
                <Share />
              </a>
            </span>
          )}
        </div>
      </div>
      {openShare && <ShareModal shareUrl={`https://asikur.vercel.app/blog/${_id}` } setOpen={setOpenShare} />}
    </>
  );
}

export default BlogCard