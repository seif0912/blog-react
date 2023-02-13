import React from 'react'
import './login.css'
import { auth, provider} from '../../firebase/firebase-conf'
import { signInWithPopup } from 'firebase/auth'

const Login = ({setIsAuth}) => {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then(user =>{
            setIsAuth(true)
        })
    }

    return (
        <div className="body">
            <div className="form-container">
                {/* <% if(errors != "") { %>
                <% errors.forEach((item) => { %>
                <div className="alert">
                <%- item %>
                </div>
                <% }); %>
                <% } %> */}
                <form action="/login" method="post">
                <div className="con">
                    <input type="email" name="email" placeholder="Email"/>
                </div>
                <div className="con">
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <div className="con">
                    <button type="submit">log in</button>
                </div>
                <a href="/register">register</a>
                </form>
                <p className='sign-in' onClick={signInWithGoogle}>Sign In with Google</p>
            </div>

        </div>
    )
}

export default Login