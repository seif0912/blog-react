import React from 'react'
import './write.css'
import { useAuth } from '../../contexts/AuthContext'

const Write = () => {
    
    const { currentUser } = useAuth()
    
    return (
        <div className="write-container">
            <div className="box">
            <form action="/write" method="POST">
                <div className="col">
                <input type="text" name="title" placeholder="Title" required/>
                </div>
                <div className="col">
                <textarea name="body" placeholder={`What's on your mind, ${currentUser.displayName}`} required></textarea>
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
