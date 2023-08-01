import React, { useState, useMemo, useId } from "react";
import "./index.scss";
import blank_profile from "../../Images/blank_profile.jpg";
import uniqueID from "../../../helpers/uniqueID";
import { uploadPostImage } from "../../../api/imageUpload";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard/index";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal/index";

function PostStatus({currentUser}) {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(useId())
  const [currentPost,setCurrentPost] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [allStatuses, setAllStatuses] = useState([])
  const [postImage, setPostImage] = useState('')
  const sendStatus = async () => {
    const postID = uniqueID()
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: postID,
      postImage: postImage
    }
    await postStatus(object) 
    await setModalOpen(false)
    setIsEdit(false)
    await setStatus("")
  }
  
  const getEditData = (posts) => {
    setStatus(posts?.status)
    setModalOpen(true)
    setCurrentPost(posts)
    setIsEdit(true)
    setPostImage(posts.postImage)
  }
  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage)
    setStatus("")
    setIsEdit(false)
    setModalOpen(false)
  }
  useMemo(() =>{
    getStatus(setAllStatuses)
  }, [])

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser.imageLink? currentUser.imageLink : blank_profile} alt="" />
        <h1>{currentUser.name}</h1>
        <p>{currentUser.headline}</p>
      </div>
      <div className="post-status">
        <img src={currentUser.imageLink? currentUser.imageLink : blank_profile} alt="" className="post-profile-photo"/>
        <button className="create-post" onClick={() => setModalOpen(true)}>
          Start a post
        </button>
      </div>
      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setStatus={setStatus}
        status={status}
        sendStatus={sendStatus}
        setId={setId}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        setPostImage={setPostImage}
        postImage={postImage}
      />
        {allStatuses.map((posts) =>{
          return <PostsCard posts={posts} getEditData={getEditData}/>
        })}
    </div>
  );
}

export default PostStatus;
