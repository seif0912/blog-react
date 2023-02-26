import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase-conf';
import './postPage.css'
import { Link } from 'react-router-dom';

const PostPage = () => {
    let { postId } = useParams();
    const [postExistance, setPostExistance] = useState(false)
    const [post, setPost] = useState()
    const [postCreationTime, setPostCreationTime] = useState()
    const [author, setAuthor] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        let getPost = async ()=>{
          try{
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);
            if(docSnap){
                setPost(docSnap)
                const authorDoc = doc(db, 'users', docSnap.data().authorId)
                const authorSnap = await getDoc(authorDoc)
                setAuthor(authorSnap.data().displayName)
                setPostCreationTime( docSnap._document.createTime.toTimestamp().toDate().toString())
                setPostExistance(true)
                setLoading(prev => !prev)
            }
        }catch(e){
            console.error(e);
            setLoading(prev => !prev)
          }
        }
        return getPost
    },[])
    console.log(post)

    return (
        <div className="write-container">
            {loading?
            <div className="box post active">
                <h2 style={{textAlign: 'center'}}>Loading...</h2>
            </div>
            :
                <>
                {postExistance? (
                    <>
                        <div className="box post active">
                            <h2>{post.data().title}</h2>
                            <p className="post-body">{post.data().body}</p>
                            {/* <p>{post.data().author}</p> */}
                            <div className="info">
                                <div className="nd">
                                <h4 className="name"><Link to={`/profile/${post.data().authorId}`}>  {author}  <span className='arrow'>&gt;</span> </Link> </h4>
                                <p>  {postCreationTime && postCreationTime}  </p>
                                </div>
                                <div className="like">
                                <i className="fa-regular fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    </>
                    
                    )
                    : (
                        <div className="box post active">
                            <h2 style={{textAlign: 'center'}}>Post not available or doesn't exist</h2>
                        </div>
                    )}
                </>
            }
        </div>
    )
}

export default PostPage
