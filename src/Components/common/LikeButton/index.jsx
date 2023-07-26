import React, { useMemo, useState } from "react";
import "./index.scss";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { likePost, getLikesByUser } from "../../../api/FirestoreAPI";

function LikeButton({ userID, postID }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    likePost(userID, postID, liked);
  };
  useMemo(() => {
    getLikesByUser(userID, postID, setLikesCount, setLiked);
  }, [userID, postID]);
  return (
    <div className="like" onClick={handleLike}>
      <div className="poeple-likes">
        <p className="like-count">{likesCount}</p>{" "}
        <p className="like-text"> people like this post</p>
      </div>
      <div><hr /></div>
      {liked ? (
        <div className="likes">
          <AiFillLike className="like-btn" size={22}></AiFillLike>{" "}
          <p className="like-blue">Like</p>
        </div>
      ) : (
        <div className="likes">
          <AiFillLike size={22}></AiFillLike> <p>Like</p>
        </div>
      )}
    </div>
  );
}

export default LikeButton;
