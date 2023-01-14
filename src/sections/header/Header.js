import React from 'react'
import './header.css'

const Header = () => {
  return (
    <header>
  <div class="container">
    <h1 class="logo"><a href="/">blog</a></h1>
    <div class="burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="">
      {/* <% if(isLoggedIn){ %> */}
      {/* <ul>
        <li><a class="btn" href="/write">Write</a></li>
        <li><a class="btn" href="/profile/<%= myId %> ">Profile</a></li>
        <li><a class="btn" href="/profile/<%= myId %>/settings">settings</a></li>
      </ul> */}
      {/* <% } %> */}
      <div class="links">
        {/* <% if(!isLoggedIn){ %> */}
        <a href="/login" class="btn">log in</a>
        <a href="/register" class="btn-primary">register</a>
        {/* // <% }else{ %> */}
        {/* <form method="POST" action="/logout">
          <button type="submit" class="btn-primary">Log out</button>
        </form> */}
        {/* // <% } %> */}
      </div>
    </nav>
  </div>
</header>
  )
}

export default Header