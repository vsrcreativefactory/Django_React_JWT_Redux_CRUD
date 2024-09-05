import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext for user and logout
import './Navbar.css';

const Navbar = () => {
    const [openSearch, setOpenSearch] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    const { user, logoutUser } = useContext(AuthContext); // Get user and logout function from context

    const toggleSearch = () => {
        setOpenSearch(!openSearch);
        setOpenNav(false);
    };

    const toggleNav = () => {
        setOpenNav(!openNav);
        setOpenSearch(false);
    };

    return (
        <nav className={`nav ${openSearch ? 'openSearch' : ''} ${openNav ? 'openNav' : ''}`}>
            <i className="uil uil-bars navOpenBtn" onClick={toggleNav}></i>
            <Link to="/" className="logo">Brain-D</Link>

            <ul className="nav-links">
                <i className="uil uil-times navCloseBtn" onClick={toggleNav}></i>
                
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link onClick={logoutUser}>Logout</Link></li>
                        <br></br><br></br>
                        <li><Link to="/profile">Profile</Link></li>
                    </>
                )}
            </ul>

            <i className="uil uil-search search-icon" id="searchIcon" onClick={toggleSearch}></i>
            <div className={`search-box ${openSearch ? 'visible' : ''}`}>
                <i className="uil uil-search search-icon"></i>
                <input type="text" placeholder="Search here..." />
            </div>
        </nav>
    );
};

export default Navbar;
