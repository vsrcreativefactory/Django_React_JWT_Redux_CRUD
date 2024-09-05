import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser} =useContext(AuthContext)
    return (
        <div>
            <h1>Login here</h1>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter your username"  />
                <input type="password" name="password" placeholder="Enter your password"  />
                <input type="submit" />
            </form>
        </div>
    )
}

export default LoginPage