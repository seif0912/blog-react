import React, { useRef, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
    const { login, signInWithGoogle } = useAuth()
    let loginEmailRef = useRef();
    let loginPasswordRef = useRef();
    let [error, setError] = useState('')

    async function loginHandler(event){
        event.preventDefault()
        try{
            setError("")
            await login(loginEmailRef.current.value, loginPasswordRef.current.value)
        }catch(err){
            setError(err.code.slice(5,err.code.length).replaceAll('-', ' '))
        }
    }

    return (
        <div className="body">
            <div className="form-container">
                {error &&
                    <div className="alert">
                        {error}
                    </div>
                }
                <form action="/login" method="post">
                <div className="con">
                    <input type="email" name="email" ref={loginEmailRef} placeholder="Email"/>
                </div>
                <div className="con">
                    <input type="password" name="password" ref={loginPasswordRef} placeholder="Password"/>
                </div>
                <div className="con">
                    <button onClick={loginHandler}>log in</button>
                </div>
                <Link to="/register">register</Link>
                </form>
                <p className='sign-in' onClick={signInWithGoogle}>Sign In with Google</p>
            </div>

        </div>
    )
}

export default Login