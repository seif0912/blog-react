import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../sections/Index';
import { db } from '../../firebase/firebase-conf';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { Post } from '../../components/Index';

const ProfilePage = () => {
  let { profileId } = useParams();
  // console.log(profileId)
  let [ posts, setPosts ] = useState();  
  let [ postsCount, setPostsCount ] = useState();  
  let [ profileDisplayName, setProfileDisplayName ] = useState();
  let [ profileExistance, setProfileExistance ] = useState(true);


  useEffect(()=>{
    function fetchData(){
      let docsRef = query(collection(db, "posts"), where('authorId', '==', profileId))
      let docs = onSnapshot(docsRef, (data)=>{
        let querySnapshot = data.docs.map((doc)=><Post key={doc.id} post={doc}/>);
        setPosts(querySnapshot)
        console.log(data.docs)
        setPostsCount(data.docs.length)
      })
      return docs
    }
    return fetchData()
  },[])

  useEffect(()=>{
    let getProfileName = async ()=>{
      try{
        const docRef = doc(db, "users", profileId);
        const docSnap = await getDoc(docRef);
        // console.log('get Profile Name: ', docSnap.data())
        setProfileDisplayName(docSnap.data().displayName)
      }catch(e){
        setProfileExistance(false)
      }
    }
    return getProfileName
  },[])

  
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="box">
            {
              profileExistance?
              <>
                <h1> {profileDisplayName}</h1>
                <p>total posts: {postsCount} </p>
                <p>total likes: profileData.total_likes </p>
              </>:
              <h1> Profile doesn't exist</h1>
            }
          </div>
        </div>
      </div>
      {
        profileExistance &&
        <>
          <div className='posts'>
            <div className='container'>
              {posts}
            </div>
          </div>
        </>
      }
      <Footer/>
    </>
  )
}

export default ProfilePage
