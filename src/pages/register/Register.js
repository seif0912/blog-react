import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import '../login/login.css'
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-conf';

const Register = ()=>{
    const { signup } = useAuth()
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState()
    let signupEmailRef = useRef();
    let signupPasswordRef = useRef();
    let nameRef = useRef();

    async function handleSignup(event){
        event.preventDefault();
            setError("")
            setLoading(true)
            signup(signupEmailRef.current.value, signupPasswordRef.current.value)
            .then((user)=>{
            updateProfile(auth.currentUser, {
                displayName: nameRef.current.value
            }).then((res) => {
                console.log(res)
                setDoc(doc(db, "users", user.user.uid), {email: user.user.email, displayName: user.user.displayName});
              }).catch((error) => {
                console.log(error)
              });
        }).catch(err=> {
            console.log('err',err)
            setError(err.code.slice(5,err.code.length).replaceAll('-', ' '))
            console.log(error)
            
        })
        setLoading(false)
    }


    return (
        <div className="body">
            <div className="form-container">
                {error &&
                    <div className="alert">
                        {error}
                    </div>
                }
                <form action="" method="">
                    <div className="con">
                        <input type="text" name="name" ref={nameRef} placeholder="Name"/>
                    </div>
                    <div className="con">
                        <input type="email" name="email" ref={signupEmailRef} placeholder="Email"/>
                    </div>
                    <div className="con">
                        <input type="password" name="password" ref={signupPasswordRef} placeholder="Password"/>
                    </div>
                    <div className="con">
                        <button disabled={loading} onClick={handleSignup}>register</button>
                    </div>
                    <Link to="/login">log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Register;