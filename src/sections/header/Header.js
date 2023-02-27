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
    // handle mobile menu
    let [toggleclick, setToggleClick] = useState(false)
    useEffect(() => {
      function handleResize() {
        // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
        if(window.innerWidth > 460){
          setToggleClick(false)
        }
      }
  
      window.addEventListener('resize', handleResize)
    })
  return (
    <header className={sticky ? 'sticky': ''}>
        <Container>
            <h1 className="logo"><Link to="/">blog</Link></h1>
            <div onClick={()=>{setToggleClick(prev => !prev)}} className={`burger ${toggleclick ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={toggleclick ? 'active' : ''}>
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