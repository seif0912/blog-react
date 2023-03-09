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
  let [ posts, setPosts ] = useState([]);  
  let [ postsCount, setPostsCount ] = useState();  
  let [ profileDisplayName, setProfileDisplayName ] = useState();
  let [ profileExistance, setProfileExistance ] = useState(true);
  let [loading, setLoading] = useState(false)
  console.log(posts)

  useEffect(()=>{
    let cleanUp = () => {
      setProfileExistance(true)
      setPostsCount(undefined)
      setLoading(true)
      setPosts([])
    }

    // fetch profile posts
    let fetchProfilePosts = async ()=>{
      try {
        let docsRef
        // console.log('current user uid', currentUser.uid)
        if(currentUser){
          if( profileId === currentUser.uid ){
            docsRef = query(collection(db, "posts"), where('authorId', '==', profileId))
          }else{
            docsRef = query(collection(db, "posts"), where('authorId', '==', profileId), where('visibility', '==', 'public'))
          }
        }else{
          docsRef = query(collection(db, "posts"), where('authorId', '==', profileId), where('visibility', '==', 'public'))
        }
        let data = await getDocs(docsRef)
        let querySnapshot = data.docs.map((doc)=><Post key={doc.id} post={doc}/>);
        setPosts(querySnapshot)
        console.log(data.docs)
        setPostsCount(data.docs.length)

      }catch(e){console.error(e);}
    }

    //get the profile
    let getProfileName = async ()=>{
      setLoading(true)
      try{
        const docRef = doc(db, "users", profileId);
        const docSnap = await getDoc(docRef);
        // console.log('get Profile Name: ', docSnap.data())
        setProfileDisplayName(docSnap.data().displayName)
        // return setProfileDisplayName()
        // if (profileExistance){
          //   console.log('profile exits')
          // }
        setProfileExistance(true)
        fetchProfilePosts()
        setLoading(false)
      }catch(e){
        console.error(e)
        setProfileExistance(false)
        setLoading(false)
      }
    }
    getProfileName()

    return cleanUp()
  },[currentUser, profileId])

  
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
