import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../redux/ActionCreators/authActionsCreator";
import "./Dashboard.css"; // Import the CSS
import DashboardImage from "../../pages/Images/Dashboard.jpg"; // Importing the image

const LandLordHome = () => {
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
      style={{ backgroundImage: `url(${DashboardImage})` }} // Use inline style for background image
    >
 <nav className="dashboard-nav">
   {/* TenantEase Title on the far left */}
   <Link className="nav-title" to="/">
     TENANTEASE
   </Link>
 
   {/* Buttons container for proper alignment */}
   <div className="nav-buttons">
     <Link className="dashboard-button" to="/LandlordDashboard">
       Dashboard
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
          <p>Manage your properties and tenants with ease.</p>
        </div>
        <div className="dashboard-links">
          <Link to="/Send Alert" className="dashboard-link">
            Send Alert
          </Link>
          <Link to="/Manage Properties" className="dashboard-link">
            Manage Properties
          </Link>
          <Link to="/TenantsPage" className="dashboard-link">
            View Tenants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandLordHome;
