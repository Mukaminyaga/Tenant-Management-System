import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/DashboardComponents/Nav";

const TenantDashboard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Ensure only authenticated users can access the Dashboard
  if (!isAuthenticated) {
    navigate("/Login");
    return null; // Prevent further rendering until redirection
  }

  return (
    <>
      <Nav />
      <div className="dashboard-content">
        <h3>Welcome Tenant</h3>
        <Link
            to="/Report Issue"
            state={{ from: "/Tenant Dashboard" }} // Pass state to restrict access
          >Report Issue</Link>
      </div>
    </>
  );
};

export default TenantDashboard;
