import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../redux/ActionCreators/authActionsCreator";
import "./Dashboard.css"; // Import the CSS
import DashboardImage from "../../pages/Images/Dashboard.jpg"; // Importing the image

const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Access auth state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const configurePersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Error setting persistence:", error.message);
      }
    };

    configurePersistence();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "admin") {
              setAuthorized(true);
            } else {
              alert("Access denied. Admins only.");
              navigate("/Tenant Dashboard");
            }
          } else {
            alert("User not found.");
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error fetching user role:", error.message);
          navigate("/Login");
        }
      } else {
        setIsAuthenticated(false);
        navigate("/Login");
      }
    });

    return () => unsubscribe(); // Cleanup observer on component unmount
  }, [navigate]);

  useEffect(() => {
    if (authorized) {
      const fetchUsers = async () => {
        try {
          const usersCollection = collection(db, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersList = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersList);
        } catch (error) {
          console.error("Error fetching users:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [authorized]);

  const handleVerify = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { verified: true });
      alert("User verified successfully.");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, verified: true } : user
        )
      );
    } catch (error) {
      console.error("Error verifying user:", error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      alert("User removed successfully.");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  if (!isAuthenticated) {
    return <p>Just a moment...</p>; // Display while waiting for authentication state
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (!authorized) {
    return <p>Unauthorized access.</p>; // Optional fallback
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
          <Link to="/View Tenants" className="dashboard-link">
            View Tenants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
