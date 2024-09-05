import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // To track password match status
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false); // Set to false if passwords don't match
            return;
        }
        setPasswordsMatch(true);

        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (response.ok) {
            alert('Account created successfully');
            navigate('/login');
        } else {
            alert('Error during signup');
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <div className="input-field">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Enter your username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <label>Enter your username</label>
                </div>
                <div className="input-field">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label>Enter your email</label>
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <label>Enter your password</label>
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <label>Confirm your password</label>
                </div>
                {!passwordsMatch && <p className="error-message">Passwords do not match</p>}
                <button type="submit">Sign Up</button>
                <div className="register">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
