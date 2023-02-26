import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Footer } from '../../sections/Index';
import { db } from '../../firebase/firebase-conf';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Post } from '../../components/Index';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
  let { currentUser } = useAuth()
  let { profileId } = useParams();
  // console.log(profileId)
  let [ posts, setPosts ] = useState();  
  let [ postsCount, setPostsCount ] = useState();  
  let [ profileDisplayName, setProfileDisplayName ] = useState();
  let [ profileExistance, setProfileExistance ] = useState(true);
  let [loading, setLoading] = useState()
  console.log(posts)
  useEffect(()=>{
    let fetchData = async ()=>{
      setLoading(true);
      try {
        let docsRef
        if( profileId === currentUser.uid){
          docsRef = query(collection(db, "posts"), where('authorId', '==', profileId))
        }else{
          docsRef = query(collection(db, "posts"), where('authorId', '==', profileId), where('visibility', '==', 'public'))
        }
        setLoading(true)
        let data = await getDocs(docsRef)
        let querySnapshot = data.docs.map((doc)=><Post key={doc.id} post={doc}/>);
        setPosts(querySnapshot)
        console.log(data.docs)
        setPostsCount(data.docs.length)
        return setLoading(false)

      }catch(e){console.error(e);}
      
      return 
    }
    return fetchData
  },[profileId, currentUser.uid])

  useEffect(()=>{
    let getProfileName = async ()=>{
      try{
        const docRef = doc(db, "users", profileId);
        const docSnap = await getDoc(docRef);
        // console.log('get Profile Name: ', docSnap.data())
        setProfileDisplayName(docSnap.data().displayName)
      }catch(e){
        console.log(e)
        setProfileExistance(false)
        setLoading(prev => !prev)
      }
    }
    return getProfileName
  },[profileId])

  
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="box">
            {loading?
              <>
                <h1>loading...</h1>
              </>
              :
              <>
                {
                  profileExistance?
                  <>
                    <h1> {profileDisplayName}</h1>
                    <p>total posts: {postsCount} </p>
                  </>:
                  <h1> Profile doesn't exist</h1>
                  
                }
              </>
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
