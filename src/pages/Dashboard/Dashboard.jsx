import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/DashboardComponents/Nav';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Render only if authenticated
  if (!isAuthenticated) {
    navigate("/Login");
  }

  return (
    <>
      <Nav/>
      {/* <Link to= '/Upload'>Upload</Link> */}
    </>
  );
};

export default Dashboard;
