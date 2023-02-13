import { Home, Login } from "./pages/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from './sections/Index'
// import { useState } from "react";
import { AuthProvider } from './contexts/AuthContext'

function App() {
  // let [isAuth, setIsAuth] = useState(false)
  return (
    <Router>
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
