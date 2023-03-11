import React, { useEffect, useState } from 'react'
import "./posts.css"
import { Post } from '../../components/Index'
import { collection, where, onSnapshot, query, orderBy, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebase-conf';
const Posts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        async function fetchData(){
          let docsRef = query(collection(db, "posts"), where('visibility', '==', 'public'), orderBy("createdAt", "desc"))
          let data = await getDocs(docsRef)
          let querySnapshot = data.docs.map((doc)=><Post key={doc.id} post={doc}/>);
          setPosts(querySnapshot)
          // return docs
        }
        fetchData()
        let cleanUp = () => {
          setPosts()
        }
        return cleanUp()
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
