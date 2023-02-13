import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import { Container } from '../../components/Index'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const { currentUser, logout } = useAuth()
    console.log('header', currentUser)
    let navigate = useNavigate()

    async function handleLogout(){
        try {
          await logout()
          navigate('/login')
        } catch (error) {
          console.error(error)
        }
    }
  return (
    <header>
        <Container>
            <h1 className="logo"><Link to="/">blog</Link></h1>
            <div className="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav >
            {currentUser&&
            <ul>
                <li><a className="btn" href="/write">Write</a></li>
                <li><a className="btn" href="/profile/<%= myId %> ">Profile</a></li>
                <li><a className="btn" href="/profile/<%= myId %>/settings">settings</a></li>
            </ul>
            }
            <div className="links">
            {currentUser? 
                <button onClick={handleLogout} className="btn-primary">Log out</button>
                : 
                <>
                    <Link to="/login" className="btn">log in</Link>
                    <Link to="/register" className="btn-primary">register</Link>
                </>
            }
            </div>
            </nav>
        </Container>
    </header>
  )
}

export default Header