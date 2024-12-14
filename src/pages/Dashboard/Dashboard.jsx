import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Render only if authenticated
  if (!isAuthenticated) {
    navigate("/Login");
  }

  return (
    <div>
      <h1 className="display-1">Welcome to Tenant Hub</h1>
      {user && <p className="lead">Hello, {user.name}!</p>}
    </div>
  );
};

export default Dashboard;
