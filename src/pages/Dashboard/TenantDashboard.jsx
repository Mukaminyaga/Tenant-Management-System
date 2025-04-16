import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../redux/ActionCreators/authActionsCreator";
import "./Dashboard.css"; // Import the CSS
import DashboardImage from "../../pages/Images/Dashboard.jpg"; // Importing the image

const TenantDashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Access auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure only authenticated users can access the Dashboard
  if (!isAuthenticated) {
    navigate("/Login");
    return null; // Prevent further rendering until redirection
  }

  return (
    <div
      className="dashboard-container"
      style={{ backgroundImage: `url(${DashboardImage})` }} 
    >
<nav className="dashboard-nav">
  {/* TenantEase Title on the far left */}
  <Link className="nav-title" to="/">
    TENANTEASE
  </Link>

  {/* Buttons container for proper alignment */}
  <div className="nav-buttons">
    <Link className="dashboard-button" to="/Settings">
      Profile
    </Link>
    <button
      className="logout-button"
      onClick={() => dispatch(signOutUser())}
    >
      Logout
    </button>
  </div>
</nav>


      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="welcome-message">
          <h1>Welcome, {user?.displayName}!</h1> {/* Display user's name dynamically */}
          <p>Simplify your rental experience with seamless access to all the tools needed to manage your home, payments, and communication</p>
        </div>
        <div className="dashboard-links">
          <Link to="/Report Issue" className="dashboard-link">
          Request Maintenance
          </Link>
          <Link to="/PaymentTenant" className="dashboard-link">
          Payments
          </Link>
          <Link to="/TermsAndDocs" className="dashboard-link">
          Terms and Docs
          </Link>
          <Link to="/MessageTenant" className="dashboard-link">
          Contact Property
          </Link>
          {/* <Link to="/Settings" className="dashboard-link">
            Settings
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
