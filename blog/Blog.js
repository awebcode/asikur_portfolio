import React, { useEffect, useState } from 'react'
import { Data } from './data/Data'
import BlogCard from './Home/BlogCard'
import Navbar from './Navbar/Navbar'

import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
// import "./blog.css"
import SideRight from './sideright/SideRight'
import Pagination from '../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../actions/productAction'
import Loading from '../components/Loading/Loading'
import { getComments } from '../actions/commentAction'
import { getCategories } from '../actions/categoryAction'
import { loadUser } from '../actions/userAction'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'react-toastify'
import Error from './Error'

const Blog = () => {
  const dispatch=useDispatch()
   const { products,loading } = useSelector((state) => state.allProducts);
  const [data, setData] = useState([])
  const [serachdata, setSearchData] = useState([]);
   const [query, setQuery] = useState("");
  // console.log("DAta",data)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts = products
     && products?.slice(firstPostIndex, lastPostIndex)
     const  searchPosts = serachdata && serachdata?.slice(firstPostIndex, lastPostIndex);
  //  console.log("currData",currentPosts)
  // const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  const [showComments, setShowComments] = useState([]);
  const comments = useSelector((state) => state.comments);
  useEffect(() => {
    const id=data.map(c=>c._id)
    dispatch(getComments(id,1));
    setShowComments(comments?.data);
  }, [dispatch, comments?.data]);
  const getKeyData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/getKeywordBlog?keyword=${query}`);
      setSearchData(data.allBlogs);
      // console.log("keydata", serachdata);
    } catch (error) {
      toast.error(error.msg)
    }
  }
  useEffect(() => {
    // getKeyData()
   dispatch(getAllProducts())
  //  dispatch(getCategories());
    dispatch(loadUser());
    setData(products)
  //  setData(Data)
 }, [dispatch])
 
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="blog">
            <Sidebar />
            <div className="blog-container">
              <div className="topbarCenter">
                <div className="searchbar">
                  <input
                    placeholder="Search for friend, post or video"
                    className="searchInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={getKeyData}
                  />
                  <Search className="searchIcon" onClick={getKeyData} />
                </div>
              </div>
              {/* <Topbar/> */}
              <div className="blog-main">
                {searchPosts.length > 0 ? (
                  searchPosts?.map((v, i) => {
                    return (
                      <>
                        <BlogCard v={v} key={v.id} showComments={showComments} />
                      </>
                    );
                  })
                ) : query && searchPosts && searchPosts.length < 1 ? (
                  <Error statusCode={404} />
                ) : (
                  currentPosts?.map((v, i) => {
                    return (
                      <>
                        <BlogCard v={v} key={v.id} showComments={showComments} />
                      </>
                    );
                  })
                )}
              </div>
              <Pagination
                totalPosts={products && products?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            
               
              
            </div>
            <SideRight />
          </div>
        </>
      )}
    </>
  );
}

export default Blog