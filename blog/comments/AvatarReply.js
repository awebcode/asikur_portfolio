import React from 'react'
import  Link  from 'next/link'


// import LikeDislikes from '../LikeDislike/LikeDislike'

// interface IProps {
//   user: IUser
//   reply_user?: IUser
// }
const AvatarReply= ({ user, reply_user,currUser,userImg }) => {
  return (
    <div className="avatar_reply">
      <img
        // src={user?.avatar ? user?.avatar : user?.image}
        src={userImg}
        alt="avatar"
        style={{ animation: "none" }}
      />

      <div className="ms-1">
        <small>
          <Link
            href={user?._id === currUser?._id ? "/account" : `/user/profile/${user._id}`}
            style={{ textDecoration: "none" }}
          >
            {user?.name}
          </Link>
        </small>

        <small className="reply-text">
          Reply to{" "}
          <Link
            href={
              reply_user?._id === currUser?._id
                ? "/account"
                : `/user/profile/${reply_user?._id}`
            }
          >
            {reply_user?.name}
          </Link>
        </small>
      </div>
    </div>
  );
}

export default AvatarReply
