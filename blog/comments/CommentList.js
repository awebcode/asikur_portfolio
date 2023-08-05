import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentReacts, getCommentReactsUnAuth, reactComment } from "../../actions/reactActions";
import {
  replyComment,
  updateComment,
  deleteComment,
} from "../../actions/commentAction";
import Input from "./Input";

import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Table from "react-bootstrap/Table";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import ModalToggle from "./ModalToggle";
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const CommentList = ({ children, comment, showReply, setShowReply, match,props }) => {
    // console.log("commentListPage", comment);
  const navigate = useRouter();
  const [onReply, setOnReply] = useState(false);
  //const { auth } = useSelector((state: RootStore) => state)
   const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const params = useParams();
  const [edit, setEdit] = useState();
  //react post
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState(null);
  const [check, setCheck] = useState(null);
   const [Modals, setModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [allNameR, setAllNameR] = useState(null);
   const handleCommentClick = (id) => {
     // Redirect to the login page with the blog post ID as a query parameter
     //  navigate.push(`/login?blog/${id}`);
     toast.warn("Plese Login And Like This.")
     navigate.push({
       pathname: "/login",
       query: { name: "blog", id: `${id}` },
     });
  };
  // const [user, setUser] = useState();

  // const fetchUser = async () => {
  //   const { data } = await axios.get("/api/auth/userDetails");
  //   //  console.log("dataUnseenNotifications", data);
  //   setUser(data.user);
  // };
  //  useEffect(() => {
  //   fetchUser();
  // }, []);
   //console.log("cmre", allNameR);
  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth();
    }
  }, [allNameR,comment,reacts]); // dependence reacts for timely update

  const getReactsPost = async () => {
    const res = await getCommentReacts(comment?._id);
   
    setAllNameR(res?.all)
    setReacts(res?.reacts);
    setCheck(res?.check);
    setTotal(res?.total);
    setCheckSaved(res?.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getCommentReactsUnAuth(comment?._id);
    
    setReacts(res?.reacts);
    //setCheck(res?.check);
    setAllNameR(res?.all);
    setTotal(res?.total)
   
  };

  const reactHandler = async (type) => {
    if (!user) {
      return navigate.push({
        pathname: "/login",
        query: { name: "blog", id: `${comment.blog_id}` },
      });
    }
    reactComment(comment?._id, type,user?._id,user?.name,comment?.user?._id);
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
    //     //console.log("reacts", reacts);
    //   }
    //   if (index1 !== -1) {
    //     setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
    //     setTotal((prev) => --prev);
    //     //console.log(reacts);
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
  const handleReply = (body,file) => {
    if (!user) return;

    const data = {
      user: user,
      blog_id: comment.blog_id,
      image:file,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment?._id,
      createdAt: new Date().toISOString(),
    };

    setShowReply([data, ...showReply]);
    // dispatch(replyComment(data, auth.access_token))
    dispatch(replyComment(data));
    setOnReply(false);
  };

  const handleUpdate = (body) => {
    if (!user || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    // dispatch(updateComment(newComment, auth.access_token))
    dispatch(updateComment(newComment));
    setEdit(undefined);
  };

  const handleDelete = (comment) => {
    if (!user) return;
    //dispatch(deleteComment(comment, auth.access_token));
    if (window.confirm("are you sure delete this comment?")) {
       dispatch(deleteComment(comment));
     }
    
  };
//reactions menus
  const onClose = (e) => {
    setShowMenu(false)
  }
  const menuref = useRef();
  

  useEffect(() => {
    let handler = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //converstaions create
  
  const [loadingChat, setLoadingChat] = useState(false)
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
   const handleContact = async (userId) => {
    //  console.log(userId);

     try {
       setLoadingChat(true);
       const config = {
         headers: {
           "Content-type": "application/json",
           
         },
       };
       const currUserId = user._id;
       const { data } = await axios.post(`/api/chat/createChat`, { userId,currUserId }, config);
      // console.log("chatData",data)
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
  const ref = React.useRef();
  const reactRef = React.useRef();
  React.useEffect(() => {
    let handler = (e) => {
      if (ref.current&&!ref.current.contains(e.target)) {
        setModal(false);
      }
       if (reactRef.current&&!reactRef.current.contains(e.target)) {
         setVisible(false);
       }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const Nav = (comment) => {
    return (
      <div style={{ float: "right", position: "relative", right: "0", bottom: "0" }}>
        <Delete
          className="fa fa-trash-o"
          aria-hidden="true"
          onClick={() => handleDelete(comment)}
          style={{ color: "#475569", fontSize: "16px" }}
        />
        <Edit
          className="fa fa-pencil-square-o"
          aria-hidden="true"
          onClick={() => setEdit(comment)}
          style={{ color: "#475569", fontSize: "16px" }}
        />
      </div>
    );
  };

  return (
    <div className="w-100">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
        <div className="comment_box" ref={ref}>
          <div
            className="p-2"
            dangerouslySetInnerHTML={{
              __html: comment?.content,
            }}
            style={{ display: "flex" }}
          />
          {comment?.image && (
            <div style={{ height: "200px", width: "200px" }}>
              <img
                onClick={() => setModal(!Modals)}
                src={comment?.image}
                alt=""
                style={{ width: "100%", height: "100%", animation: "none" }}
              />
            </div>
          )}
          {Modals && <ModalToggle comment={comment} setModal={setModal} />}
          <div className="d-flex justify-content-between p-2">
            <small className="d-flex">
              <div className="comment_nav">
                {comment?.blog_user_id === user?._id || user?.role === "admin" ? (
                  comment?.user?._id === user?._id || user?.role === "admin" ? (
                    Nav(comment)
                  ) : (
                    <>
                      <div>
                        <i
                          className="fa fa-trash-o"
                          aria-hidden="true"
                          onClick={() => handleDelete(comment)}
                          style={{ color: "red" }}
                        />
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                          onClick={() => setEdit(comment)}
                        />
                      </div>
                    </>
                  )
                ) : (
                  (comment?.user?._id === user?._id && Nav(comment)) ||
                  (comment?.user === user?._id && Nav(comment))
                )}
              </div>

              <div style={{ color: "white", fontSize: "10px" }}>
                {new Date(comment?.createdAt).toLocaleString()}
              </div>
            </small>
          </div>

          {/* <LikeDislikes
            comment
            // productId={productId}
            commentId={comment?._id}
            userId={user?._id}
            allComment={comment}
          /> */}
          <div className="post_infos" ref={menuref}>
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
                          <>
                            <img
                              onClick={() => {
                                setShowMenu(!showMenu);
                              }}
                              src={`../../reacts/${react.react}.svg`}
                              alt=""
                              key={i}
                              style={{ animation: "none" }}
                            />
                          </>
                        )
                    )}
                <span style={{ padding: "5", position: "relative" }}>
                  {total > 0 && total}
                </span>
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

                          <th>Message</th>
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
                    }, 50);
                  }}
                  onClick={() => reactHandler(check ? check : "like")}
                >
                  {check ? (
                    <img
                      src={`../../reacts/${check}.svg`}
                      alt=""
                      className="small_react"
                    />
                  ) : // user && (
                  //   <ThumbUpOffAltIcon
                  //     style={{
                  //       display: "block",
                  //       color: "whitesmoke",
                  //       fontSize: "18px",
                  //     }}
                  //   />
                  // )
                  user ? (
                    <ThumbUpOffAltIcon
                      style={{
                        display: "block",
                        color: "whitesmoke",
                        fontSize: "18px",
                      }}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      style={{
                        display: "block",
                        color: "whitesmoke",
                        fontSize: "18px",
                      }}
                      onClick={() => handleCommentClick(comment.blog_id)}
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
                      fontSize: "16px",
                    }}
                  >
                    {check ? check : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <small
            style={{ cursor: "pointer", color: "whitesmoke", fontSize: "12px" }}
            onClick={() => setOnReply(!onReply)}
          >
            {onReply ? "- Cancel -" : "- Reply -"}
          </small>
        </div>
      )}

      {onReply && <Input callback={handleReply} />}

      {children}
    </div>
  );
};

export default CommentList;
