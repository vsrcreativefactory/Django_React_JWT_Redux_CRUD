import React, {useContext} from 'react'
import './HomePage.css';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="homepage">
        <h2>Hello {user.username}!</h2>
        <h1>Welcome to Brain-D</h1>
        <p>Your gateway to learning and development.</p>
        </div>
    )
}

export default HomePage