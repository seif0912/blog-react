import React, { useRef } from 'react'
import './write.css'
import { useAuth } from '../../contexts/AuthContext'
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/firebase-conf';
import { useNavigate } from 'react-router-dom';



const Write = () => {
    
    const { currentUser } = useAuth()
    // let [title, setTitle] = useState()
    let titleRef = useRef()
    let bodyRef = useRef()
    let navigate = useNavigate()
    const publishHandler = async (e) => {
        e.preventDefault();
        console.log(titleRef.current.value)
        console.log(bodyRef.current.value)
        let post = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
            author: currentUser.displayName,
            authorId: currentUser.uid
        }
        try{
            await addDoc(collection(db, "posts"), post);
            navigate('/')
        }catch(err){console.log(err)}
    }

    console.log(titleRef)

    return (
        <div className="write-container">
            <div className="box">
            <form onSubmit={publishHandler} action="/write" method="POST">
                <div className="col">
                <input ref={titleRef} type="text" name="title" placeholder="Title" required/>
                </div>
                <div className="col">
                <textarea ref={bodyRef} name="body" placeholder={`What's on your mind, ${currentUser.displayName}`} required></textarea>
                </div>
                <div className="col">
                <button type="submit">publish</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Write
