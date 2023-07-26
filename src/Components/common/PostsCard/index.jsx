import './index.scss'
import LikeButton from '../LikeButton'
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
        <p className="name" onClick={() => {
          navigate("/profile", {state :{email : posts.userEmail}})
        }}>{postUser.name}</p>
        <p className='timestamp'>{posts.timeStamp}</p>
        <p className='status'>{posts.status}</p>
        <LikeButton userID={currentUser.userID} postID={posts.postID}/>
    </div>
  )
}

export default PostsCard