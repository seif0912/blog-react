import React from "react";
import { Home, Login, Register, Write, ProfilePage, PostPage } from "./pages/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './sections/Index'
// import { useState } from "react";
// import PrivateRoute from "./privateRoute/PrivateRoute";
import PrivateRouteLogin from "./privateRoute/PrivateRouteLogin";
import { AuthProvider } from './contexts/AuthContext'

function App() {
  // let [isAuth, setIsAuth] = useState(false)
  return (
    <Router>
      <AuthProvider>
      <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/write' element={<Write/>}/>
          <Route path="/profile/:profileId" element={<ProfilePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route element={< PrivateRouteLogin />} >
            <Route path="/login" element={<Login/>} />
          </Route>
          <Route element={< PrivateRouteLogin />} >
            <Route path="/register" element={<Register/>} />
          </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
