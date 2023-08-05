import { getAllProducts } from "@/actions/productAction";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import { createComment, getComments } from "@/actions/commentAction";
import { loadUser } from "@/actions/userAction";
import Input from "@/blog/comments/Input";
import Comments from "../comments/Comments";
import Paginations from "../comments/Pagination";
import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { getPostReacts, getPostReactsUnauth, reactPost } from "@/actions/reactActions";
import { Table } from "react-bootstrap";

const DetailsNext = (props) => {
  const { slug } = props;

  const dispatch = useDispatch();
   const { user } = useSelector((state) => state.user);

  const comments = useSelector((state) => state.comments);
  const navigate = useRouter();
  const [showComments, setShowComments] = useState([]);
  const [socketData, setSocketData] = useState();
  const [loadings, setLoading] = useState(false);

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);
  // const [user, setUser] = useState();

  // const fetchUser = async () => {
  //   const { data } = await axios.get("/api/auth/userDetails");
  //   //  console.log("dataUnseenNotifications", data);
  //   setUser(data.user);
  // };
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  //
  const handleCommentClick = (id) => {
    // Redirect to the login page with the blog post ID as a query parameter
    //  navigate.push(`/login?blog/${id}`);
    toast.warn("Plese Login And Comment This.");
    navigate.push({
      pathname: "/login",
      query: { name: "blog", id: `${id}` },
    });
  };
const handleLikeClick = (id) => {
  // Redirect to the login page with the blog post ID as a query parameter
  //  navigate.push(`/login?blog/${id}`);
  toast.warn("Plese Login And Like This.");
  navigate.push({
    pathname: "/login",
    query: { name: "blog", id: `${id}` },
  });
};
  //react part end
  const handleComment = (body, file) => {
    if (!user) return;

    const data = {
      content: body,
      image: file,
      user: user,
      blog_id: props.data?._id,
      blog_user_id: props.data?.user,

      replyCM: [],
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, props.data?._id));
    // dispatch(getComments(props.data?._id, 1));
  };

  useEffect(() => {
    //if (comments?.data?.length === 0) return;
    // socket.on("message recieved", (sockData) => {
    //   setSocketData(sockData);
    // });

    setShowComments(comments?.data);
  }, [comments?.data]);
  //  const id1 = props.data?._id;
  const fetchComments = async (id, num) =>
  {
      setLoading(true);

      dispatch(getComments(id, num));
      setLoading(false)

}
  
  
  // const fetchComments = useCallback(
  //   async (id, num = 1) => {
  //     setLoading(true);

  //     dispatch(getComments(id, num));
  //     setLoading(false);
  //   },
  //   [dispatch]
  // );

  useEffect(() => {
    if (!props.data?._id) return;
    const num = navigate?.location?.search.slice(6) || 1;
    fetchComments(props.data?._id, num);
  }, [dispatch,props.data?._id, navigate]);

  const handlePagination = (num) => {
    // if (!filter?._id) return;
    if (props.data?._id) {
      fetchComments(props.data?._id, num);
    }
  };
  //
  //react post

  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [allNameR, setAllNameR] = useState();
  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth();
    }
  }, [dispatch, props.data, user, props.data?._id,reacts]);

  const getReactsPost = async () => {
    const res = await getPostReacts(props.data?._id); //products?._id
    //console.log("reacsst", res.all);
    setAllNameR(res?.all);
    setReacts(res?.reacts);
    setCheck(res?.check);
    setTotal(res?.total);
    setCheckSaved(res?.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getPostReactsUnauth(props.data?._id);
    setAllNameR(res?.all);
    setReacts(res?.reacts);

    setTotal(res?.total);
  };
  const reactHandler = async (type) => {
    if (!user) {
      return navigate.push({
        pathname: "/login",
        query: { name: "blog", id: `${props.data?._id}` },
      });
    }
    reactPost(
      props.data?._id,
      type,
      user?._id,
      user?.name,
      props.data?.user?._id,
      user?.token
    );
    // if (check == type) {
    //   setCheck();
    //   let index = reacts?.findIndex((x) => x.react == check);
    //   if (index !== -1) {
    //     setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
    //     setTotal((prev) => --prev);
    //   }
    // } else {
    //   setCheck(type);
    //   let index = reacts?.findIndex((x) => x.react == type);
    //   let index1 = reacts?.findIndex((x) => x.react == check);
    //   if (index !== -1) {
    //     setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
    //     setTotal((prev) => ++prev);
    //     // console.log("reacts", reacts);
    //   }
    //   if (index1 !== -1) {
    //     setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
    //     setTotal((prev) => --prev);
    //     // console.log(reacts);
    //   }
    // }
    if (check == type) {
      setCheck();
      let index = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        const updatedReacts = [...reacts];
        updatedReacts[index] = {
          ...updatedReacts[index],
          count: updatedReacts[index].count - 1,
        };
        setReacts(updatedReacts);
        setTotal((prev) => prev - 1);
      }
    } else {
      setCheck(type);
      let index = reacts?.findIndex((x) => x.react == type);
      let index1 = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        const updatedReacts = [...reacts];
        updatedReacts[index] = {
          ...updatedReacts[index],
          count: updatedReacts[index].count + 1,
        };
        setReacts(updatedReacts);
        setTotal((prev) => prev + 1);
      }
      if (index1 !== -1) {
        const updatedReacts = [...reacts];
        updatedReacts[index1] = {
          ...updatedReacts[index1],
          count: updatedReacts[index1].count - 1,
        };
        setReacts(updatedReacts);
        setTotal((prev) => prev - 1);
      }
    }
  };
  //react part end
  //reactions menus
  const onClose = (e) => {
    setShowMenu(false);
  };
  const menuref = useRef();
  const reactRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (reactRef.current && !reactRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  //converstaions create
  //converstaions create

  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const handleContact = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const currUserId = user._id;
      const { data } = await axios.post(
        `/api/chat/createChat`,
        { userId, currUserId },
        config
      );
      // console.log("chatData", data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);

      //  onClose();
    } catch (error) {
      toast.error({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    navigate.push("/message");
  };
  return (
    <>
      <div className="details">
        <div className="container">
          <button className="common-btn" onClick={() => navigate.push("/blog/Home")}>
            <i></i>
            <i></i> <Link href={"/blog/Home"}> &larr;Blog/Home</Link>
          </button>
          {props.data?.user?.role === "admin" ||
            (props.data?.user?._id === user?._id && (
              // <Link href={`/Create/${props.data?._id}`}>Update Blog</Link>
              <button
                className="common-btn"
                onClick={() => navigate.push(`/Create/${props.data?._id}`)}
              >
                <i></i>
                <i></i> <Link href={`/Create/${props.data?._id}`}>Update Blog</Link>
              </button>
            ))}

          <h1 className="main-title">
            <span>Blog</span> Details.
          </h1>

          <div className="details-main">
            <div className="details-img">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={
                  (true,
                  {
                    clickable: true,
                  })
                }
                autoplay={true}
                onDurationChange={200}
                autoHeight={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
              >
                {props.data?.images?.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={img.url} alt="" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="details-content">
              <h3>{props.data?.title}</h3>
              <p>{moment(props.data?.createdAt).format("LLLL")}</p>
              <span>{props.data?.desc}</span>
              <p>
                <b>Category: </b>
                <Link href={`/blog/category/${props.data?.category}`}>
                  #{props.data?.category}
                </Link>
              </p>
              <p>
                {" "}
                <b>Tag: </b>
                <Link href={`/blog/tag/${props.data?.tag}`}>#{props.data?.tag}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        <>
          {" "}
          {/* React */}
          <div
            ref={menuref}
            className="post_infos"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="reacts_count">
              <div className="reacts_count_imgs">
                {reacts &&
                  reacts
                    .sort((a, b) => {
                      return b.count - a.count;
                    })
                    .slice(0, 3)
                    .map(
                      (react, i) =>
                        react.count > 0 && (
                          <img
                            onClick={() => {
                              setShowMenu(!showMenu);
                            }}
                            src={`../../reacts/${react.react}.svg`}
                            alt=""
                            key={i}
                            style={{ animation: "none" }}
                          />
                        )
                    )}
                <span style={{ margin: "0px 0px 0px 0px" }}>{total > 0 && total}</span>
                {showMenu && (
                  <div className="rc_dropdown">
                    <Button
                      onClick={onClose}
                      variant="outlined"
                      color="error"
                      style={{ float: "right", margin: "2px 15px" }}
                    >
                      {" "}
                      <CloseIcon />
                    </Button>

                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Reactions(7)</th>

                          <th>Send Messages</th>
                        </tr>
                      </thead>

                      {allNameR?.map((re, i) => {
                        return (
                          <>
                            {/* <img src={re?.reactBy?.avatar?.url} />
                              <p>{re?.reactBy?.name}</p>
                              <img src={`../../reacts/${re.react}.svg`} alt="" key={i} /> */}
                            <tbody>
                              <tr key={i}>
                                <td>
                                  {/* /user/profile/${re?.reactBy?._id} */}
                                  {/* href={user?._id === currUser?._id?'/account':`/user/profile/${user?._id}`} */}
                                  <Link
                                    href={
                                      user?._id === re?.reactBy?._id
                                        ? "/account"
                                        : `/user/profile/${re?.reactBy?._id}`
                                    }
                                  >
                                    <img
                                      className="tdimg"
                                      src={
                                        re?.reactBy?.avatar
                                          ? re?.reactBy?.avatar
                                          : re?.reactBy?.image
                                      }
                                      style={{
                                        height: "30px",
                                        width: "30px",
                                        animation: "none",
                                      }}
                                    />
                                  </Link>
                                </td>
                                <td>{re?.reactBy?.name}</td>
                                <td>
                                  {" "}
                                  <img
                                    src={`../../reacts/${re.react}.svg`}
                                    alt=""
                                    key={i}
                                    style={{
                                      animation: "none",
                                      height: "30px",
                                      width: "30px",
                                    }}
                                  />
                                </td>
                                <td>
                                  {user && user._id === re?.reactBy?._id ? (
                                    <Button
                                      variant="outlined"
                                      onClick={() => navigate.push(`/account`)}
                                    >
                                      Profile
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      onClick={() => handleContact(re?.reactBy?._id)}
                                    >
                                      Message
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </>
                        );
                      })}
                    </Table>
                  </div>
                )}
              </div>
              {/* <div className="reacts_count_num">{total > 0 && total}</div> */}
              <div className="post_actions" ref={reactRef}>
                <ReactsPopup
                  visible={visible}
                  setVisible={setVisible}
                  reactHandler={reactHandler}
                />
                <div
                  className="post_action hover1"
                  onMouseOver={() => {
                    setTimeout(() => {
                      setVisible(true);
                    }, 200);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setVisible(false);
                    }, 100);
                  }}
                  onClick={() => reactHandler(check ? check : "like")}
                >
                  {check ? (
                    <img
                      src={`../../reacts/${check}.svg`}
                      alt=""
                      className="small_react"
                    />
                  ) : user ? (
                    <ThumbUpOffAltIcon style={{ display: "block" }} />
                  ) : (
                    <ThumbUpOffAltIcon
                      style={{ display: "block" }}
                      onClick={() => handleLikeClick(props?.data?._id)}
                    />
                  )}
                  <span
                    style={{
                      color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
                    }}
                  >
                    {check ? check : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
        <div style={{ padding: "13px" }}>
          {user ? (
            <Input callback={handleComment} />
          ) : (
            <h5 onClick={() => handleCommentClick(props?.data?._id)}>
              Please <a>login</a> to comment.
            </h5>
          )}

          {loadings ? (
            <h1>Loading...</h1>
          ) : (
            showComments &&
            showComments.map((comment, index) => (
              <Comments key={index} comment={comment} props={props} />
            ))
          )}
          {/* Socket Part */}
          {/* socketData && socketData ? (
            <Comments key={socketData._id} comment={socketData} />
          ) : (
            showComments?.map((comment, index) => (
              <Comments key={index} comment={comment} />
            ))
          )} */}

          {comments?.total > 1 && (
            <Paginations
              total={comments?.total}
              callback={handlePagination}
              slug={slug}
            />
          )}
        </div>
      </>
    </>
  );
};

export default DetailsNext;
