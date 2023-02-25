import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase-conf';

const PostPage = () => {
    let { postId } = useParams();
    const [postExistance, setPostExistance] = useState(true)
    const [post, setPost] = useState('')
    useEffect(()=>{
        let getProfileName = async ()=>{
          try{
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            console.log('get post: ', docSnap.data())
            setPost(docSnap.data().displayName)
          }catch(e){
            setPostExistance(false)
          }
        }
        return getProfileName
      },[])
  return (
    <div>
      <h1>Post Page: {postId}</h1>
    </div>
  )
}

export default PostPage
