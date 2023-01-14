import React from 'react'
import { Container } from '../../components/Index'
import './hero.css'

const Hero = () => {
  return (
    <div class="hero">
        <Container>
            <div class="box">
            <h1>Stay curious</h1>
            <p>Discover stories, thinking, and expertise from writers on any topic.</p>
            <a href="/register" class="btn-primary">Start reading</a>
            
            </div>
        </Container>
    </div>
  )
}

export default Hero