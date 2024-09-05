import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to="/login" />;   //redirect to the login page
    }
    return children;   //render the children components
}

export default PrivateRoute;
