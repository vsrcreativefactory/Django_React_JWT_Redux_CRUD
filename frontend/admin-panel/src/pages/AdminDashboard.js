import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><a href="#users">Manage Users</a></li>
                    <li><a href="#analytics">Analytics</a></li>
                    <li><a href="#settings">Settings</a></li>
                    <li><a href="#logout">Logout</a></li>
                </ul>
            </aside>
            <main className="main-content">
                <section id="users">
                    <h2>Manage Users</h2>
                    <p>List of users will go here.</p>
                    {/* Add CRUD operations for users */}
                </section>
                <section id="analytics">
                    <h2>Analytics</h2>
                    <p>Analytics data will go here.</p>
                </section>
                <section id="settings">
                    <h2>Settings</h2>
                    <p>Admin settings options will go here.</p>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
