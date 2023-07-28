import './index.scss'
import LikeButton from '../LikeButton'
import blank_profile from "../../Images/blank_profile.jpg";
import { getPostUser,getCurrentUser } from '../../../api/FirestoreAPI'
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function PostsCard({posts}) {
  const navigate = useNavigate()
  const [postUser, setPostUser] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() =>{
    getPostUser(setPostUser, posts.userEmail)
  }, [])
  useMemo(() =>{
    getCurrentUser(setCurrentUser)
  }, [])  
  return (
    <div className='posts-card'>
        <div className="profile-head-info" onClick={() => {
            navigate("/profile", {state :{email : posts.userEmail}})
          }}>
          <img src={postUser.imageLink ? postUser.imageLink : blank_profile} className='mini-profile' alt="" />
          <p className="name" >{postUser.name}</p>
        </div>
        <p className='timestamp'>{posts.timeStamp}</p>
        <p className='status'>{posts.status}</p>
        <LikeButton userID={currentUser.userID} postID={posts.postID} currentUser={currentUser}/>
    </div>
  )
}

export default PostsCard