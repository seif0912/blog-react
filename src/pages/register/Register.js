import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import '../login/login.css'
import { useAuth } from "../../contexts/AuthContext";

const Register = ()=>{
    const { signup } = useAuth()
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('kjnkjn')
    let signupEmailRef = useRef();
    let signupPasswordRef = useRef();
    let nameRef = useRef();

    async function handleSignup(event){
        event.preventDefault();
        try{
            setError("")
            setLoading(true)
            await signup(signupEmailRef.current.value, signupPasswordRef.current.value, nameRef.current.value)
        }catch(err){
            console.log('err',err)
            setError(err.code)
        }
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