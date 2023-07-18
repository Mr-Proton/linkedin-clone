import React, { useMemo, useState } from 'react'
import Topbar from '../Components/common/Topbar'
import { getCurrentUser } from '../api/FirestoreAPI'
import Profile from '../Pages/Profile'

function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})

    useMemo(() =>{
        getCurrentUser(setCurrentUser)
      }, [])
  return (
    <>
        <Topbar />
        <Profile currentUser={currentUser}/>
    </>
  )
}

export default ProfileLayout