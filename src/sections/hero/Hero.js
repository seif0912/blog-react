import React from 'react'
import { Container } from '../../components/Index'
import './hero.css'

const Hero = () => {
  return (
    <div className="hero">
        <Container>
            <div className="box">
            <h1>Stay curious</h1>
            <p>Discover stories, thinking, and expertise from writers on any topic.</p>
            <a href="/register" className="btn-primary">Start reading</a>
            
            </div>
        </Container>
    </div>
  )
}

export default Hero