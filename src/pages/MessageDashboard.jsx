import React, { useState, useEffect } from 'react';
import { firestore, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from './MessageDashboard.module.css';
import TenantSidebar from '../pages/TenantSidebar';
import messagesIcon from './Images/messages.png';

const MessageDashboard = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your message submission logic here
    console.log({ subject, message });
    // Reset form
    setSubject('');
    setMessage('');
    // Show success message
    alert("Your message has been sent successfully!");
  };

  if (role !== "tenant") {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <TenantSidebar />
      
      <main className={styles.mainContent}>

        <section className={styles.content}>
          <div className={styles.notificationCard}>
            <h1 className={styles.notificationTitle}>Talk To Us!</h1>
            <p className={styles.notificationText}>
              We typically respond to messages within 24 hours. For urgent matters 
              or maintenance requests, please use the appropriate channels.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.messageForm}>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.formLabel}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={styles.formInput}
                placeholder="What's your message about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Your Message
              </label>
              <textarea
                id="message"
                className={`${styles.formInput} ${styles.textarea}`}
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MessageDashboard;