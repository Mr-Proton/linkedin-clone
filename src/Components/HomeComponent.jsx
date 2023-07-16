import React, {useState} from 'react'
import '../Sass/HomeComponent.scss'
import PostStatus from './common/Postupdate'

function HomeComponent({currentUser}) {
  return (
    <div className='home-component'><PostStatus currentUser={currentUser}/></div>
  )
}

export default HomeComponent