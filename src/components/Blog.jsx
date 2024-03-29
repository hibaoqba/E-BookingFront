import React from 'react'
import Cards from './Cards'
import "./blog.css"

const Blog = () => {
  return (
    <div className='blog'>
      <div className='title'><h2>Blog</h2></div>
      <div className="horizontal-line-container">
        <div className="horizontal-line"></div>
      </div>
      <Cards/>
     
    </div>
  )
}

export default Blog
