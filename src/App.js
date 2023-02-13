import { Home, Login } from "./pages/Index";
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
          <Route element={< PrivateRouteLogin />} >
            <Route path="/login" element={<Login/>} />
          </Route>
          <Route element={< PrivateRouteLogin />} >
            <Route path="/sign-in" element={<Login/>} />
          </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
