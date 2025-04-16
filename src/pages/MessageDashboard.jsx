import React, { useState, useEffect } from 'react';
import { firestore, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebartenant'; 
import styles from './MessageDashboard.module.css';


const MessageDashboard = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
        try {
          const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
            if (userData.role !== "tenant") {
              alert("Access denied. Tenants only.");
              navigate("/Dashboard");
            }
          } else {
            alert("User not found.");
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          navigate("/");
        }
      } else {
        alert("You do not have access to this page.");
        navigate("/Dashboard");
      }
    };

    checkUserRole();
  }, [navigate]);

  if (role !== "tenant") {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile Sidebar Toggle */}
      <button 
        className={styles.sidebarToggle} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className={styles.hamburger}></div>
      </button>

      {/* Sidebar Component */}
      <Sidebar className={sidebarOpen ? styles.sidebarOpen : ''} />
      
      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>MESSAGES</h1>
        </header>

        <section className={styles.messageContent}>
          <div className={styles.notification}>
            <p>
              Thank you for reaching out! <br />
              We will respond to your inquiry within a few business hours.
              <br />
              If you have an emergency or fire-related situation, please
              call 911 immediately. <br />
              For any maintenance concerns, kindly submit a maintenance
              request <a href="/Report Issue" className={styles.link}>here</a>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.messageForm}>
            <div className={styles.formGroup}>

              <label htmlFor="tenancyInput">
                Your Information
              </label>
              <input
                id="tenancyInput"
                type="text"
                className={styles.formInput}
                placeholder="Enter your name and apartment number"
                required
              />
            </div>

            <div className={styles.formGroup}>

              <label htmlFor="messageInput">
                Message
              </label>
              <textarea
                id="messageInput"
                className={styles.formTextarea}
                placeholder="Type your message here..."
                required
                rows={5}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>

          </form>
        </section>
      </main>
    </div>
  );
};

export default MessageDashboard;