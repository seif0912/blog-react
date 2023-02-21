import React from 'react'
import { Container } from '../../components/Index'
import { useAuth } from '../../contexts/AuthContext';
import './hero.css'

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
                  <a href="/write" class="btn-primary">Start writing</a>
                </>
              :
                <>
                  <h1>Stay curious</h1>
                  <p>Discover stories, thinking, and expertise from writers on any topic.</p>
                  <a href="/register" class="btn-primary">Start reading</a>
                </>
            }
            
            </div>
        </Container>
    </div>
  )
}

export default Hero