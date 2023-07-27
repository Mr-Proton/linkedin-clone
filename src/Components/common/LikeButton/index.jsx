import React, { useMemo, useState } from "react";
import "./index.scss";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { likePost, getLikesByUser, postComment, getComments, getPostUser } from "../../../api/FirestoreAPI";

function LikeButton({ userID, postID, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('')
  const [comments,setComments] = useState('')
  const [commentUser,setCommentUser] = useState({})
  const [showCommentBox, setCommentBox] = useState(false);
  const getComment = (event) => {
    setComment(event.target.value)
  }
  const handleLike = () => {
    likePost(userID, postID, liked);
  };
  const addComment = () => {
    postComment(postID, comment, getCurrentTimeStamp('LLL'), currentUser.email)
    setComment('')
  }
  useMemo(() => {
    getLikesByUser(userID, postID, setLikesCount, setLiked);
    getComments(postID, setComments)
  }, [userID, postID]);
  return (
    <div className="like">
      <div className="poeple-likes">
        <p className="like-count">{likesCount}</p>{" "}
        <p className="like-text"> people like this post</p>
      </div>
      <div>
        <hr />
      </div>
      <div className="extras">
        {liked ? (
          <div className="likes-comments" onClick={handleLike}>
            <AiFillLike className="like-btn" size={22}></AiFillLike>{" "}
            <p className="like-blue">Like</p>
          </div>
        ) : (
          <div className="likes-comments" onClick={handleLike}>
            <AiFillLike size={22}></AiFillLike> <p>Like</p>
          </div>
        )}
        <div className="likes-comments" onClick={() => setCommentBox(!showCommentBox)}>
          <FaComment
            size={22}
            color={showCommentBox ? "#0072b1" : "#000"}
          ></FaComment>
          <p className={showCommentBox ? "like-blue" : ""}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
          onChange={getComment}
            className="comment-input"
            name="comment"
            value={comment}
            placeholder="Add a comment"
          />
          <button className="post" onClick={addComment}>Post</button>
          {comments.length > 0 ? comments.map((comment) =>{
            getPostUser(setCommentUser, comment.email)
            return(
              <div className="comment-box">
                <div className="comment-flex">
                  <div>
                    <p className="comment-user-name">{commentUser.name}</p>
                    <p className="comment-user-headline">{commentUser.headline}</p>
                  </div>
                  <p className="timestamp">{comment.timestamp}</p>
                </div>
                <p className="comment-text">{comment.comment}</p>
              </div>
            )
          }):<></>}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LikeButton;
