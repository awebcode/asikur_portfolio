import { getFriendsPageInfos } from "@/actions/followUnfollow";
import { loadUser } from "@/actions/userAction";
import { friendspage } from "@/reducers/userReducer";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";


import Card from "./Card";

export default function Friends() {
  const dispatch1=useDispatch()
  const { user } = useSelector((state) => state.user);
  // const { type } = useParams();
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  });
  // console.log("data",data)
  let type;
 
  useEffect(() => {
    dispatch1(loadUser());
    getData();
  }, [dispatch1]);
  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos();
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data?.data });
      // console.log("underdata",data.data)
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data?.data });
    }
  };

  return (
    <>
    
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              href="/friends"
              className={`mmenu_item hover3 ${type === undefined && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="friends_home_icon "></i>
              </div>
              <span>Home</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              href="/friends/requests"
              className={`mmenu_item hover3 ${type === "requests" && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              href="/friends/sent"
              className={`mmenu_item hover3 ${type === "sent" && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <Link
              href="/friends/all"
              className={`mmenu_item hover3 ${type === "all" && "active_friends"}`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom Lists</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right">
          {(type === undefined || type === "requests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link href="/friends/requests" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {
                  data.requests &&
                  data.requests.map((user) => (
                    <Card userr={user} key={user._id} type="request" getData={getData} />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link href="/friends/sent" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data &&
                  data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card userr={user} key={user._id} type="sent" getData={getData} />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friends</h3>
                {type === undefined && (
                  <Link href="/friends/all" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data&&data.friends &&
                  data.friends.map((user) => (
                    <Card userr={user} key={user._id} type="friends" getData={getData} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
