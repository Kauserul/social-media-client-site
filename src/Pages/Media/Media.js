import React from 'react'
import { useLoaderData } from 'react-router-dom'
import MediaCard from './MediaCard'

const Media = () => {
  const allPost = useLoaderData()
  console.log(allPost)
  return (
    <div>
      {
        allPost.map(post => <MediaCard post={post}></MediaCard>)
      }
    </div>
  )
}

export default Media