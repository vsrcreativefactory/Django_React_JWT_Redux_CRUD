import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setUsers(response.data);
        setFilteredUsers(response.data); // Set filtered users to all users initially
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    fetchUsers();
  }, []);

  // Handle new user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/create/', newUser);
      setUsers([...users, response.data]);
      setFilteredUsers([...users, response.data]); // Update filtered users as well
      setNewUser({ username: '', email: '', password: '' });
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Failed to create user:', err);
      setError('Failed to create user.');
    }
  };

  // Handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${editingUser.id}/update/`, editingUser);
      if (response.status === 200) {
        alert('User updated successfully');
        const updatedUsers = users.map(user => (user.id === editingUser.id ? response.data : user));
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers); // Update filtered users as well
        setEditingUser(null);
        setError(''); // Clear any previous errors
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      setError('Failed to update user.');
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}/delete/`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers); // Update filtered users as well
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Failed to delete user.');
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredUsers(users); // Reset to all users if the search query is empty
    } else {
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }

  };

  const handleLogout = () => {
      // Clear any authentication tokens or session data
      localStorage.removeItem('authToken'); // Adjust according to your auth setup
    
      // Redirect to login page or any other page
      window.location.href = 'http://localhost:3001/'; // Replace with the actual login route
  };
    


  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
      <h1 class="logo">Brain-D</h1>
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="#users">Manage Users</a></li>
          <li><a className="logout-btn" onClick={handleLogout}>Logout</a></li>
        </ul>
      </aside>

      <main className="main-content">
        <section id="users">
          <h2>Manage Users</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />

          {/* Display existing users */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice().reverse().map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>

                  <button className="edit-btn" onClick={() => setEditingUser(user)}>
                  <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                  <i className="fas fa-trash"></i> Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Form for creating a new user */}
          <h3>Create New User</h3>
          <form onSubmit={handleCreateUser}>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <button type="submit">Create User</button>
          </form>

          {/* Form for editing a user */}
          {editingUser && (
            <div>
              <h3>Edit User</h3>
              <form onSubmit={handleUpdateUser}>
                <input
                  type="text"
                  placeholder="Username"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                />
                <button type="submit">Update User</button>
                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
