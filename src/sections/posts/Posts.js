import React, { useEffect, useState } from 'react'
import "./posts.css"
import { Post } from '../../components/Index'
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { db } from '../../firebase/firebase-conf';
const Posts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        function fetchData(){
          let docsRef = query(collection(db, "posts"), where('visibility', '==', 'public'))
          let docs = onSnapshot(docsRef, (data)=>{
            let querySnapshot = data.docs.map((doc)=><Post key={doc.id} post={doc}/>);
            setPosts(querySnapshot)
            console.log(data.docs)
          })
          return docs
        }
        return fetchData()
      },[])

  return (
    <div className='posts'>
      <div className='container'>
        {posts}
      </div>
    </div>
  )
}

export default Posts
