import React, { useEffect, useState } from "react";

import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { loadUser } from "@/actions/userAction";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Notification = (props) => {
  console.log("noti", props.noti);
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { user } = useSelector((state) => state.user);
  const [loading,setLoading]=useState(false)
  // unseeen slice start
  const [visibleNotifications, setVisibleNotifications] = useState()

   const handleLoadMore = () => {
     const newVisibleNotifications = user?.notification?.slice(
       0,
       visibleNotifications?.length + 5
     );
     setVisibleNotifications(newVisibleNotifications);
   };

   const handleLoadLess = () => {
     setVisibleNotifications(user?.notification?.slice(0, 5));
  };
  useEffect(() => {
    setVisibleNotifications(user?.notification?.slice(0, 5));
  }, [user?.notification]);
  // unseeen slice end
  // seeen slice start
   const [visibleSeenNotifications, setSeenVisibleNotifications] = useState();

   const handleLoadMoreSeen = () => {
     const newVisibleNotifications = user?.seennotification?.slice(
       0,
       visibleSeenNotifications?.length + 5
     );
     setSeenVisibleNotifications(newVisibleNotifications);
   };

   const handleLoadLessSeen = () => {
     setSeenVisibleNotifications(user?.seennotification?.slice(0, 5));
   };
   useEffect(() => {
     setSeenVisibleNotifications(user?.seennotification?.slice(0, 5));
   }, [user?.seennotification]);

  // seeen slice end

  const handleMarkAllRead = async () => {
    try {
      if (window.confirm("Are you sure Mark All Read?")) {
        setLoading(true);
        const res = await axios.put(
          "/api/auth/friendsApi/seennotification",
          {
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        dispatch(loadUser());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.msg);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handleMarkSingleRead = async (i) => {
    try {
      setLoading(true);

      const res = await axios.put("/api/auth/friendsApi/seennotification/readsingle", {
        userId: user._id,
        notification: i,
      });
      setLoading(false);
      if (res.data.success) {
        dispatch(loadUser());
        message.success(res.data.message);
      } else {
        message.error(res.data.msg);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("somthing went wrong");
    }
  };
  const handleSingleDelete = async (i) => {
    try {
      if (window.confirm("Are you sure want to delete This?")) {
        const res = await axios.put(
          "/api/auth/friendsApi/seennotification/deletesingle",
          {
            userId: user._id,
            notification: i,
          }
        );
        dispatch(loadUser());
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("somthing went wrong");
    }
  };
  // delete notifications
  const handleDeleteAllFinally = async () => {
    try {
      setLoading(true);
      if (window.confirm("Are you sure want to delete all?")) {
        const res = await axios.put("/api/auth/friendsApi/seennotification/deleteAll", {
          userId: user._id,
        });
        dispatch(loadUser());
        if (res.data.success) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <div className="container">
      <Head>
        <title>My Notifications -Asikur Portfolio Website</title>
        <meta
          name="description"
          content="Stay informed with notifications on the Asikur Portfolio Website. Receive updates on new projects, blog articles, and community interactions. Customize your notification preferences to ensure you never miss important announcements and stay connected with the latest in the creative and technology world."
        />

      </Head>
      <h1 className="main-title">Notifications Page</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen Notifications" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead} style={{ color: "#ccd6f6" }}>
              Mark All Read
            </h4>
          </div>

          <h3 style={{ padding: "20px 5px" }}>
            ({user?.notification && user.notification?.length})Notifications
          </h3>
          <h1 style={{ color: "ButtonHighlight" }}>
            {" "}
            {!visibleNotifications?.length && "No New Messages"}
          </h1>
          {visibleNotifications
            ?.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            ?.map((notificationMgs, i) => {
              return (
                <div
                  className="cardNotification"
                  style={{ cursor: "pointer" }}
                  // onClick={() => handleMarkSingleRead(notificationMgs)}
                >
                  <div
                    className="card-text"
                    // onClick={() => navigate.push(`${notificationMgs.path}`)}
                  >
                    <p>
                      <span>
                        <Link href={`/user/profile/${notificationMgs?.user?._id}`}>
                          <Image
                            src={notificationMgs?.user?.image}
                            height={20}
                            width={20}
                            style={{ animation: "none", display: "inline-block" }}
                          />
                        </Link>
                      </span>{" "}
                      {notificationMgs.message}{" "}
                    </p>
                    <span
                      className="p-2"
                      onClick={() => handleMarkSingleRead(notificationMgs)}
                      style={{ padding: "8px 0px" }}
                    >
                      Mark As Read
                    </span>
                    <span style={{ padding: "8px 15px" }}>
                      <Link href={`${notificationMgs.path}`}>view</Link>
                    </span>
                  </div>
                </div>
              );
            })}
          {visibleNotifications?.length === user?.notification?.length ? (
            ""
          ) : (
            <>
              {" "}
              {user?.notification?.length > 5 && (
                <button onClick={handleLoadMore} className="common-btn">
                  <i></i>
                  <i></i> <a>Load More</a>
                </button>
              )}
            </>
          )}

          {visibleNotifications?.length > 5 && ( //visibleNotifications?.length === user?.notification?.length &&
            <button onClick={handleLoadLess} className="common-btn">
              <i></i>
              <i></i> <a>Load Less</a>
            </button>
          )}
        </Tabs.TabPane>
        {/* {user?.seennotification && user?.seennotification?.length>=1 ? (
          <>
            {" "} */}
        <Tabs.TabPane tab="Seen Notifications" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleDeleteAllFinally}
              style={{ color: "#ccd6f6" }}
            >
              Delete All Read
            </h4>
          </div>
          <h3 style={{ padding: "20px 5px" }}>
            ({user?.seennotification && user.seennotification?.length})Notifications
          </h3>
          <h1 style={{ color: "ButtonHighlight" }}>
            {" "}
            {!visibleSeenNotifications?.length && "No New Messages"}
          </h1>
          {visibleSeenNotifications &&
            visibleSeenNotifications
              ?.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              ?.map((notificationMgs, i) => {
                return (
                  <div className="cardNotification" style={{ cursor: "pointer" }}>
                    <div
                      className="card-text"
                      // onClick={() => navigate.push(`${notificationMgs.path}`)}
                    >
                      <a>
                        <p>
                          <span>
                            <Link href={`/user/profile/${notificationMgs?.user?._id}`}>
                              <Image
                                src={notificationMgs?.user?.image}
                                height={20}
                                width={20}
                                style={{ animation: "none", display: "inline-block" }}
                              />
                            </Link>
                          </span>{" "}
                          {notificationMgs.message}{" "}
                        </p>
                        <span
                          className="p-2"
                          onClick={() => handleSingleDelete(notificationMgs._id)}
                        >
                          Delete Parmanent
                        </span>
                        <span style={{ padding: "0px 15px" }}>
                          <Link href={`${notificationMgs.path}`}>view</Link>
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
          {visibleSeenNotifications?.length === user?.seennotification?.length ? (
            ""
          ) : (
            <>
              {" "}
              {user?.seennotification?.length > 5 && (
                <button onClick={handleLoadMoreSeen} className="common-btn">
                  <i></i>
                  <i></i> <a>Load More</a>
                </button>
              )}
            </>
          )}

          {visibleSeenNotifications?.length > 5 && (
            <button onClick={handleLoadLessSeen} className="common-btn">
              <i></i>
              <i></i> <a>Load Less</a>
            </button>
          )}
        </Tabs.TabPane>
        {/* </>
        ) : (
          ""
        )} */}
      </Tabs>
    </div>
  );
};

export default Notification;
