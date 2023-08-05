import { useDispatch, useSelector } from "react-redux";

import { acceptRequest, cancelRequest, deleteRequest } from "@/actions/followUnfollow";
import { useEffect } from "react";
import { loadUser } from "@/actions/userAction";
import Link from "next/link";

export default function Card({ userr, type, getData }) {
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.user);
  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId);
    if (res == "ok") {
      getData();
    }
  };
  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId);
    if (res == "ok") {
      getData();
    }
  };
  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId);
    if (res == "ok") {
      getData();
    }
  };
  useEffect(() => {
    dispatch(loadUser())
  },[])
  return (
    <div className="req_card">
      <Link href={user?._id === userr?._id ? "/account" : `/user/profile/${userr?._id}`}>
        <img src={userr?.avatar} alt="" />
      </Link>
      <div className="req_name">{userr?.name}</div>
      {type === "sent" ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler(userr?._id)}>
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button className="blue_btn" onClick={() => confirmHandler(userr?._id)}>
            Confirm
          </button>
          <button className="gray_btn" onClick={() => deleteHandler(userr?._id)}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
