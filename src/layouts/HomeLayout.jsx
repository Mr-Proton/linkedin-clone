import React from 'react'
import Home from '../Pages/Home'
import Topbar from '../Components/common/Topbar'

function HomeLayout() {
  return (
    <div>
        <Topbar />
        <Home />
    </div>
  )
}

export default HomeLayout