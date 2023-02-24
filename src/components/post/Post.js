import React from 'react'
import './post.css'

const Post = ({post}) => {
    // console.log(post)
    // console.log(post.data())
  return (
      <div className="post">
        <div className="col">
          <h3 className="title"> {post.data().title} </h3>
          {/* <% if(post.likes === 1){ %>
          <h4><%= post.likes %> like</h4>
          <% }else if (post.likes === 0){ %>
          <h4>No likes yet</h4>
          <% }else{ %>
          <h4><%= post.likes %> likes</h4>
          <% } %> */}
        </div>
        <p className="article-body"> {post.data().body} </p>
        <a href={`/post/${post.id}`} className="btn-primary">read more</a>
      </div>
  )
}

export default Post
