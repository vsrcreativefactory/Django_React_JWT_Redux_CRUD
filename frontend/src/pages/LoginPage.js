import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext);

    return (
        <div className="login-page">
        <div className="wrapper">
            <form onSubmit={loginUser}>
                <h2>Login</h2>
                <div className="input-field">
                    <input type="text" name="username" required />
                    <label>Enter your username</label>
                </div>
                <div className="input-field">
                    <input type="password" name="password" required />
                    <label>Enter your password</label>
                </div>
                <div className="forget">
                    <label htmlFor="remember">
                        <input type="checkbox" id="remember" />
                        <p>Remember me</p>
                    </label>
                    {/* <a href="#">Forgot password?</a> */}
                </div>
                <button type="submit">Log In</button>
                <div className="register">
                    <p>Don't have an account? <a href="/SignUp">Register</a></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;
