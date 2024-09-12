import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setUsers(response.data);
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
      setNewUser({ username: '', email: '', password: '' });
      setError('');  // Clear any previous errors
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
        // Update the user list after successful update
        const updatedUsers = users.map(user => (user.id === editingUser.id ? response.data : user));
        setUsers(updatedUsers);
        setEditingUser(null);
        setError('');  // Clear any previous errors
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
      setUsers(users.filter(user => user.id !== id));
      setError('');  // Clear any previous errors
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="#users">Manage Users</a></li>
        </ul>
      </aside>
      
      <main className="main-content">
        <section id="users">
          <h2>Manage Users</h2>
          
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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
