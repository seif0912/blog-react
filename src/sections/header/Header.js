import React, { useEffect, useState } from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import { Container } from '../../components/Index'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  let [ sticky, setSticky ] = useState(false)
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      setSticky(scrollY > 50);
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [sticky]);

    const { currentUser, logout } = useAuth()
    console.log('current user from Header:', currentUser)
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
    <header className={sticky ? 'sticky': ''}>
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
                <li><Link className="btn" to="/write">Write</Link></li>
                <li><Link className="btn" to={`/profile/${currentUser.uid}`}>Profile</Link></li>
                {/* <li><Link className="btn" to="/settings">settings</Link></li> */}
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