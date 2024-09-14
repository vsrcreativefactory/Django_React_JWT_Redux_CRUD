import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(user?.profileImage || 'default-profile.png');
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) {
        return <h1>You need to login to access this page</h1>;
    }

    const handleSaveChanges = () => {
        navigate('/');
    };

    return (
        <div className="profile-page">
            <h1>Your Profile</h1>
            <div className="profile-details">
                <div className="profile-image">
                    <input
                        type="file"
                        id="profileImageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="profileImageUpload">
                        <img src={profileImage} alt="dp" />
                    </label>
                </div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.username}@gmail.com</p>
                {/* Add more details if available */}
                <button onClick={handleSaveChanges} className="save-changes-btn">Save Changes</button>
            </div>
        </div>
    );
};

export default ProfilePage;
