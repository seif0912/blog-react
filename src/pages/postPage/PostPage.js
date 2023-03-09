import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase-conf';
import './postPage.css'
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    let {currentUser} = useAuth()
    let { postId } = useParams();
    // const [postExistance, setPostExistance] = useState(false)
    const [post, setPost] = useState()
    const [postCreationTime, setPostCreationTime] = useState()
    const [author, setAuthor] = useState()
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    let navigate = useNavigate()
    
    // fetch the post
    useEffect(()=>{
        let getPost = async ()=>{
            setLoading(true)
            try{
                const docRef = doc(db, "posts", postId);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())
                setPost(docSnap)
                setLoading(false)
                const authorDoc = doc(db, 'users', docSnap.data().authorId)
                const authorSnap = await getDoc(authorDoc)
                setAuthor(authorSnap.data().displayName)
                setPostCreationTime( docSnap._document.createTime.toTimestamp().toDate().toString())
                if(currentUser){
                    const likeDoc = await getDoc(doc(db, 'posts', postId, 'likes', currentUser.uid))
                    if(likeDoc.data()){
                        setLiked(prev => !prev)
                    }
                    console.log('like',likeDoc.data())
                }
                // setPostExistance(true)
                // if(docSnap){
                // }
            }catch(e){
                console.log(e);
                setLoading(false)
            }
        }
        let cleanUp = ()=>{
            // setPostExistance(false)
            setLoading(false)
            setAuthor()
            setLiked(false)

        }
        getPost()
        return cleanUp
    },[postId, toggleEdit, currentUser])
    console.log(post)

    // like handler
    const likeHandler = async() => {
        setLiked(liked => !liked)
        console.log('like',post)
        try{
            if(liked){
                console.log('dislike')
                await deleteDoc(doc(db, 'posts', post.id, 'likes', currentUser.uid));
            }else{
                await setDoc(doc(db, 'posts', post.id, 'likes', currentUser.uid),{
                    name: currentUser.displayName,
                    accId: currentUser.uid
                })
            }
        }catch(e){console.error(e)}
    }

    // edit handler
    let editTitleRef = useRef()
    let editBodyRef = useRef()
    let editHandler = async(e) =>{
        e.preventDefault()
        console.log('edit')
        // console.log(editTitleRef.current.value)
        // console.log(editBodyRef.current.value)
        const docRef = doc(db, "posts", postId);
        try{
            await updateDoc(docRef, {
                'title': editTitleRef.current.value,
                'body': editBodyRef.current.value
            });
            setToggleEdit(false)
        }catch(e){console.error(e);}
    }

    // delete handler
    let deleteHandler = async(e) =>{
        e.preventDefault()
        console.log('delete')
        try{
            await deleteDoc(doc(db, "posts", postId));
            setToggleDelete(false)
            navigate(`/profile/${currentUser.uid}`)
        }catch(e){console.log(e);}
    }

    return (
        <div className="write-container">
            {loading?
            <div className="box post active">
                <h2 style={{textAlign: 'center'}}>Loading...</h2>
            </div>
            :
                <>
                {post? (
                    <>
                        <div className={`box post ${!toggleEdit? 'active' : ''}`}>
                            <h2>{post.data().title}</h2>
                            <p className="post-body">{post.data().body}</p>
                            {/* <p>{post.data().author}</p> */}
                            <div className="info">
                                <div className="nd">
                                <h4 className="name"><Link to={`/profile/${post.data().authorId}`}>  {author && author}  <span className='arrow'>&gt;</span> </Link> </h4>
                                <p>  {postCreationTime && postCreationTime}  </p>
                                </div>
                                <div className="like" onClick={likeHandler}>
                                    <span className="heart">{liked? <HiHeart/> : <HiOutlineHeart/>}</span>
                                </div>
                            </div>
                            {
                                currentUser &&
                                <>
                                {/* edit & delete buttons */}
                                {post.data().authorId === currentUser.uid &&
                                    <>
                                        <div className="post-settings">
                                            <h3 id="edit-btn" onClick={()=>{setToggleEdit(true)}}>edit</h3>
                                            <h3 id="delete-btn" onClick={()=>{setToggleDelete(true)}}>delete</h3>
                                        </div>
                                    </>
                                }
                                </>
                            }
                            
                        </div>
                        {
                            currentUser &&
                            <>
{/* edit layout */}
{post.data().authorId === currentUser.uid &&
                                <>
                                    { toggleEdit &&
                                    <div className={`box post ${toggleEdit? 'active' : ''}`}>
                                        <form action="">
                                            <div className="col">
                                            <input ref={editTitleRef} type="text" name="title" placeholder="title" defaultValue={post.data().title} required/>
                                            </div>
                                            <div className="col">
                                            <textarea ref={editBodyRef} name="body" placeholder="what's on your mind,?" defaultValue={ post.data().body } required></textarea>
                                            </div>
                                            <div className="col">
                                            <button onClick={editHandler} className="publish" type="submit">publish</button>
                                            </div>
                                        </form>
                                        <div className="post-settings">
                                            <h3 id="cancel-btn" onClick={()=>{setToggleEdit(false)}}>cancel</h3>
                                        </div>
                                    </div>
                                    }
                                </>
                                }
                                {/* delete layout */}
                                {post.data().authorId === currentUser.uid &&
                                    <>
                                        {toggleDelete &&
                                            <div className={`delete ${toggleDelete? 'active' : ''}`}>
                                                <div className="delete-box">
                                                <p>are you sure you want to delete this post</p>
                                                <div className="btns">
                                                    <h3 onClick={()=>{setToggleDelete(false)}}>cancel</h3>
                                                    <h3 onClick={deleteHandler}>delete</h3>
                                                </div>
                                                </div>
                                            </div>
                                        
                                        }
                                    </>
                                }
                            </>
                        }
                    </>
                    )
                    :
                    (
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
