import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import Nav from "../../components/DashboardComponents/Nav";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
              navigate("/TenantDashboard");
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

    return () => unsubscribe();
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
    return <p>Just a moment...</p>;
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!authorized) {
    return <p>Unauthorized access.</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Nav />
      <h3 className={styles.dashboardTitle}>Tenant Management</h3>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Apartment Number</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.apartmentNumber || "N/A"}</td> {/* New Column */}
              <td>{user.role}</td>
              <td>{user.verified ? "Yes" : "No"}</td>
              <td>
                {!user.verified && (
                  <button
                    className={styles.verifyButton}
                    onClick={() => handleVerify(user.id)}
                  >
                    Verify
                  </button>
                )}
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
