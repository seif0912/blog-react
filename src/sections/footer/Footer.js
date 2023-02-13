import React from 'react'
import './footer.css'
import { Container } from '../../components/Index'
import { FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';
import { BsGlobe2 } from 'react-icons/bs';


const Footer = () => {
  return (
    <footer>
        <Container>
            {/* <div class="upper">
            <% if(isLoggedIn) {%>
            <div class="isLogged">
                <h1><%= myName %> </h1>
                <ul>
                <li><a class="btn" href="/write">Write</a></li>
                <li><a class="btn" href="/profile/<%= myId %> ">Profile</a></li>
                <li><a class="btn" href="/profile/<%= myId %>/settings">settings</a></li>
                </ul>
            </div>
            <% }else{ %>
            <div class="isntLogged">
                <h1 class="logo"><a href="/">blog</a></h1>
                <form action="/register" method="post">
                <div class="con">
                    <input type="text" name="name" placeholder="Name">
                </div>
                <div class="con">
                    <input type="email" name="email" placeholder="Email">
                </div>
                <div class="con">
                    <input type="password" name="password" placeholder="Password">
                </div>
                <div class="con">
                    <button type="submit">register</button>
                </div>
                <!-- <a href="/login">log in</a> -->
                </form>
            </div>
            <% } %>
            </div> */}
        </Container>
        <div className="footer">
            <Container>
            &copy; all right reserved | developed by <a target='_blank' rel="noreferrer" className="seif" href="https://seifbadreddine.netlify.app/">Seif Badreddine</a>
            <ul className="social">
                <li><a target='_blank' rel="noreferrer" href="https://seifbadreddine.netlify.app/"><BsGlobe2/></a></li>
                <li><a target='_blank' rel="noreferrer" href="https://www.instagram.com/seif_badreddine/"><FaInstagram/></a></li>
                <li><a target='_blank' rel="noreferrer" href="https://github.com/seif0912"><FaGithub/></a></li>
                <li><a target='_blank' rel="noreferrer" href="https://twitter.com/baddredineseif"><FaTwitter/></a></li>
            </ul>
            </Container>
        </div>
    </footer>
  )
}

export default Footer