import React from 'react'
import { Container } from '../../components/Index'
import { useAuth } from '../../contexts/AuthContext';
import './hero.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  const { currentUser } = useAuth()
  return (
    <div className="hero">
        <Container>
            <div className="box">
              {currentUser?
                <>
                  <h1>Stay creative</h1>
                  <p>Write stories, thinking, and expertise on any topic you're into.</p>
                  <Link to="/write" className="btn-primary">Start writing</Link>
                </>
              :
                <>
                  <h1>Stay curious</h1>
                  <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                  <Link to="/register" className="btn-primary">Start reading</Link>
                </>
            }
            
            </div>
        </Container>
    </div>
  )
}

export default Hero