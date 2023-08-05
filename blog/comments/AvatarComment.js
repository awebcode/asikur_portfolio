import Link from 'next/link';
import React from 'react'







const AvatarComment= ({ user,userImg,currUser }) => {
  return (
    <div className="avatar_comment">
      <img src={userImg} alt="avatar" style={{ animation: "none" }} />
      {/* //user?.avatar */}
      <small className="d-block text-break">
        <Link href={user?._id === currUser?._id?"/account":`/user/profile/${user?._id}`}>{user?.name}</Link>
      </small>
    </div>
  );
}

export default AvatarComment
