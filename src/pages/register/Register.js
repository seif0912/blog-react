import { Link } from "react-router-dom";
import '../login/login.css'

const Register = ()=>{
    return (
        <div className="body">
            <div className="form-container">
        <form action="" method="">
            <div className="con">
                <input type="text" name="name" placeholder="Name"/>
            </div>
            <div className="con">
                <input type="email" name="email" placeholder="Email"/>
            </div>
            <div className="con">
                <input type="password" name="password" placeholder="Password"/>
            </div>
            <div className="con">
                <button type="submit">register</button>
            </div>
            <Link to="/login">log in</Link>
        </form>
        </div>
        </div>
    )
}

export default Register;