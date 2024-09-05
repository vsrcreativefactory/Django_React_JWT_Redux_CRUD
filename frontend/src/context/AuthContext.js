import { createContext, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode"
// import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [profileImage, setProfileImage] = useState(user?.profileImage || 'default-profile.png');
    let navigate = useNavigate();
    let loginUser = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
    
        try {
            let response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value
                })
            });
    
            console.log('Response status:', response.status);
            let data = await response.json();
            console.log('Response data:', data);
    
            if (response.ok) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data))
                navigate('/');
            } else {
                alert(`Login failed: ${data.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred');
        }
    };

    let uploadProfileImage = (imageFile) => {
        // Handle image upload
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            // Optionally update user data with profile image URL
        };
        reader.readAsDataURL(imageFile);
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        user:user,
        loginUser : loginUser,
        logoutUser : logoutUser,
        uploadProfileImage: uploadProfileImage,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}