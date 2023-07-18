import React, { useMemo, useState } from 'react'
import './index.scss'
import { getStatus } from '../../../api/FirestoreAPI'
import PostsCard from '../PostsCard'

function ProfileCard({currentUser, onEdit}) {
    const [allStatuses, setAllStatuses] = useState([])
    useMemo(() =>{
        getStatus(setAllStatuses)
      }, [])
  return (
    <>
    <div className='profile-head'>
        <button className='edit-profile' onClick={onEdit}>Edit</button>
        <div className="info">
            <div className="info-left">
                <h3 className='name'>{currentUser.name}</h3>
                <p className="headline">{currentUser.headline}</p>
                <p className="location">{currentUser.location}</p>
            </div>
            <div className="info-right">
                <p className="company">{currentUser.company}</p>
                <p className="college">{currentUser.college}</p>
            </div>
        </div>
    </div>
    <div className='profile-posts'>
        {allStatuses.filter((item) => {
            return item.userEmail === currentUser.email
        }).map((posts) =>{
          return <PostsCard posts={posts}/>
        })}
    </div>
    </>
  )
}

export default ProfileCard