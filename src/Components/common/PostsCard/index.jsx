import './index.scss'

import React from 'react'

function PostsCard({posts}) {
  return (
    <div className='posts-card'>
        <p className='timestamp'>{posts.timeStamp}</p>
        <p className='status'>{posts.status}</p>
    </div>
  )
}

export default PostsCard