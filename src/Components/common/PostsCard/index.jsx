import "./index.scss";
import LikeButton from "../LikeButton";
import blank_profile from "../../Images/blank_profile.jpg";
import {
  getPostUser,
  getCurrentUser,
  deletePost,
} from "../../../api/FirestoreAPI";
import React, { useState, useMemo } from "react";
import { BiPencil } from "react-icons/bi";
import { BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function PostsCard({ posts, getEditData }) {
  const navigate = useNavigate();
  const [postUser, setPostUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getPostUser(setPostUser, posts.userEmail);
  }, [posts]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="posts-card">
      {currentUser.email === postUser.email ? (
        <div className="card-icons-div">
          <BiPencil
            className="post-icons"
            onClick={() => getEditData(posts)}
          ></BiPencil>
          <BsTrash3Fill
            className="post-icons"
            onClick={() => deletePost(posts.id)}
          ></BsTrash3Fill>
        </div>
      ) : (
        <></>
      )}
      <div
        className="profile-head-info"
        onClick={() => {
          navigate("/profile", { state: { email: posts.userEmail } });
        }}
      >
        <img
          src={postUser.imageLink ? postUser.imageLink : blank_profile}
          className="mini-profile"
          alt=""
        />
        <div>
          <p className="name">{postUser.name}</p>
          <p className="post-user-headline">{postUser.headline}</p>
        </div>
      </div>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
      <LikeButton
        userID={currentUser.userID}
        postID={posts.postID}
        currentUser={currentUser}
      />
    </div>
  );
}

export default PostsCard;
