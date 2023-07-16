import React, { useState, useMemo, useId } from "react";
import "./index.scss";
import { postStatus, getStatus } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard/index";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal/index";

function PostStatus({currentUser}) {
  let userEmail = localStorage.getItem("userEmail")
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(useId())
  const [allStatuses, setAllStatuses] = useState([])
  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: id
    }
    await postStatus(object) 
    await setModalOpen(false)
    await setStatus("")
  }
  useMemo(() =>{
    getStatus(setAllStatuses)
  }, [])

  return (
    <div className="post-status-main">
      <div className="post-status">
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
      />
        {allStatuses.map((posts) =>{
          return <PostsCard posts={posts}/>
        })}
    </div>
  );
}

export default PostStatus;
