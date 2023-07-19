import React, { useMemo, useState } from 'react'
import './index.scss'
import { getStatus } from '../../../api/FirestoreAPI'
import PostsCard from '../PostsCard'
import { useLocation } from 'react-router-dom'
import { getPostUser } from '../../../api/FirestoreAPI'

function ProfileCard({currentUser, onEdit}) {
    const location = useLocation() 
    const [presentUser, setPresentUser] = useState({})
    useMemo(() =>{
        getPostUser(setPresentUser, location.state.email)
    }, [])

    const [allStatuses, setAllStatuses] = useState([])
    useMemo(() =>{
        getStatus(setAllStatuses)
      }, [])
  return (
    <>
    <div className='profile-head'>
        {location.state.email === currentUser.email ? <button className='edit-profile' onClick={onEdit}>Edit</button> : <></>}
        <div className="info">
            <div className="info-left">
                <h3 className='name'>{presentUser.name}</h3>
                <p className="headline">{presentUser.headline}</p>
                <p className="location">{presentUser.location}</p>
            </div>
            <div className="info-right">
                <p className="company">{presentUser.company}</p>
                <p className="college">{presentUser.college}</p>
            </div>
        </div>
    </div>
    <div className='profile-posts'>
        {allStatuses.filter((item) => {
            return item.userEmail === presentUser.email
        }).map((posts) =>{
          return <PostsCard posts={posts}/>
        })}
    </div>
    </>
  )
}

export default ProfileCard