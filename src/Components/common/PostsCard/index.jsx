import './index.scss'
import { getPostUser } from '../../../api/FirestoreAPI'
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function PostsCard({posts}) {
  const navigate = useNavigate()
  const [postUser, setPostUser] = useState({})
  useMemo(() =>{
    getPostUser(setPostUser, posts.userEmail)
  }, [])
  return (
    <div className='posts-card'>
        <p className="name" onClick={() => {
          navigate("/profile", {state :{email : posts.userEmail}})
        }}>{postUser.name}</p>
        <p className='timestamp'>{posts.timeStamp}</p>
        <p className='status'>{posts.status}</p>
    </div>
  )
}

export default PostsCard