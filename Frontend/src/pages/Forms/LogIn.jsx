import api from "../../api/api";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <main className="login-form">
        <form action="" method="post">
            <h1>Log In</h1>
            <div className="form-group">
                <label htmlFor="username">Username or Email:</label>
                <input type="text" id="username" name="username" required />
            </div>

            <div className="form-group">
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" required/>
            </div>
        </form>
    </main>
  )
}

export default LogIn;