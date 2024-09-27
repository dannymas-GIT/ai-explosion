import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token is found
        window.location.href = '/login';
        return;
      }

      const response = await axios.get('http://localhost:5001/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="account-management">
      <h2>Account Management</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details and management options here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AccountManagement;