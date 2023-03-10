import React, { useState } from 'react'
import './settings.css'

const Settings = () => {
    let [ window, setWindow ] = useState('name')
    return (
        <div className='write-container'>
            <div className="box">
                <h1>settings</h1>
                <div className="more">
                    <div className="title">
                    <p onClick={()=>setWindow('name')} className={window === 'name'? 'active' : ''}>name</p>
                    <p onClick={()=>setWindow('password')} className={window === 'password'? 'active' : ''}>password</p>
                    <p onClick={()=>setWindow('account')} className={window === 'account'? 'active' : ''}>account</p>
                    </div>
                    <div className="info-box">
                    <div className={`box-con name ${window === 'name'? 'active' : ''}`}>
                        <form name="update-name">
                        <div className="row">
                            <input type="text" name="name" placeholder="name"/>
                        </div>
                        {/* <div className="row">
                            <input type="password" name="password" placeholder="password"/>
                        </div> */}
                        <div className="row">
                            <button className="btn-primary" id="update-name">submit</button>
                        </div>
                        </form>
                    </div>
                    <div className={`box-con passowrd ${window === 'password'? 'active' : ''}`}>
                        <form name="update-password">
                        {/* <div className="row">
                            <input type="password" name="old_password" placeholder="current password"/>
                        </div> */}
                        <div className="row">
                            <input type="password" name="new_password" placeholder="new password"/>
                        </div>
                        <div className="row">
                            <button className="btn-primary" id="update-password">submit</button>
                        </div>
                        </form>
                    </div>
                    <div className={`box-con account ${window === 'account'? 'active' : ''}`}>
                        <form name="delete-account" method="post" action="/delete-account">
                        {/* <div className="row">
                            <input type="password" name="password" placeholder="password"/>
                        </div> */}
                        <div className="row">
                            <button className="btn-primary" id="delete-account">delete account</button>
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
