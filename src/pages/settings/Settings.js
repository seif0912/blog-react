import React, { useRef, useState } from 'react'
import './settings.css'
import { useAuth } from '../../contexts/AuthContext'
import { deleteUser, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase-conf'
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

const Settings = () => {
    let [ window, setWindow ] = useState('name')
    let [ nameChanged, setNameChanged ] = useState(false)
    let { currentUser } = useAuth();
    let name = useRef()

    let changingNameHandler = async (e)=>{
        e.preventDefault();
        try{
            await updateProfile(auth.currentUser, {displayName: name.current.value})
            let userRef = doc(db, 'users', currentUser.uid)
            updateDoc(userRef, {displayName: name.current.value})
            setNameChanged(true)
        }catch(e){console.log(e)}
    }

    let deleteAccountHandler = async (e) => {
        e.preventDefault()
        console.log('delete')
        try{
            let postsQuery = query(collection(db, "posts"), where("authorId", "==", currentUser.uid));
            let rawPostsDocs = await getDocs(postsQuery)
            rawPostsDocs.docs.map( async (document) => {
                console.log(doc)
                await deleteDoc(doc(db, 'posts', document.id))
            })
            await deleteDoc(doc(db, "users", currentUser.uid))
            await deleteUser(auth.currentUser)
        }catch(e){console.error(e)}

    }

    return (
        <div className='write-container settings'>
            <div className="box">
                <h1>settings</h1>
                <div className="more">
                    <div className="title">
                    <p onClick={()=>{setWindow('name')}} className={window === 'name'? 'active' : ''}>name</p>
                    {/* <p onClick={()=>{setWindow('password'); setNameChanged(false)}} className={window === 'password'? 'active' : ''}>password</p> */}
                    <p onClick={()=>{setWindow('account'); setNameChanged(false)}} className={window === 'account'? 'active' : ''}>account</p>
                    </div>
                    <div className="info-box">
                    <div className={`box-con name ${window === 'name'? 'active' : ''}`}>
                        <form name="update-name">
                            {nameChanged &&
                                <p className='success'>Name is updated successfully</p>
                            }
                        <div className="row">
                            <input type="text" defaultValue={currentUser.displayName} ref={name} name="name" placeholder="name"/>
                        </div>
                        {/* <div className="row">
                            <input type="password" name="password" placeholder="password"/>
                        </div> */}
                        <div className="row">
                            <button onClick={changingNameHandler} className="btn-primary" id="update-name">submit</button>
                        </div>
                        </form>
                    </div>
                    {/* <div className={`box-con passowrd ${window === 'password'? 'active' : ''}`}>
                        <form name="update-password">
                        <div className="row">
                            <input type="password" name="old_password" placeholder="current password"/>
                        </div>
                        <div className="row">
                            <input type="password" name="new_password" placeholder="new password"/>
                        </div>
                        <div className="row">
                            <button className="btn-primary" id="update-password">submit</button>
                        </div>
                        </form>
                    </div> */}
                    <div className={`box-con account ${window === 'account'? 'active' : ''}`}>
                        <form name="delete-account" method="post" action="/delete-account">
                        {/* <div className="row">
                            <input type="password" name="password" placeholder="password"/>
                        </div> */}
                        <div className="row">
                            <button onClick={deleteAccountHandler} className="btn-primary" id="delete-account">delete account</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Settings
