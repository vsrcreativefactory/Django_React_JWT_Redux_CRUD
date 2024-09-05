import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <>
                    <br></br><br></br><br></br>
                    <p>Hello {user.username}</p>
                </>
            ) : (
                <p>Please <Link to="/login">Login</Link></p>
            )}
        </div>
    );
};

export default Header;
