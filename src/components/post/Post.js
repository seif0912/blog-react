import React, { useEffect, useState } from 'react'
import './post.css'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '../../firebase/firebase-conf'

const Post = ({post}) => {
    let [likesUI, setLikesUI] = useState()
    useEffect(() => {
      const getLikes = async () => {
        try{
          const coll = collection(db, "posts", post.id, 'likes');
          const snapshot = await getCountFromServer(coll);
          // console.log('count: ', snapshot.data().count);
          if(snapshot.data().count ===0){
            setLikesUI(<h4>no likes yet</h4>)
          }else if(snapshot.data().count === 1){
            setLikesUI(<h4>{snapshot.data().count} like</h4>)
          }else{
            setLikesUI(<h4>{snapshot.data().count} likes</h4>)
          }
        }catch(err) { console.log(err)}
      }
      return getLikes
    },[post.id])
  return (
      <div className="post">
        <div className="col">
          <h3 className="title"> {post.data().title} </h3>
          {likesUI}
        </div>
        <p className="article-body"> {post.data().body} </p>
        <a href={`/post/${post.id}`} className="btn-primary">read more</a>
      </div>
  )
}

export default Post
