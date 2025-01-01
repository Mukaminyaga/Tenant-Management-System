import React, { useEffect, useState } from 'react';
import { firestore, auth } from "../config/firebase"; // Make sure auth is imported
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from './Settings.module.css';

export const ProfileForm = () => {
  const [role, setRole] = useState(null); // Store user role
  const [userId, setUserId] = useState(null); // Store user ID
  const navigate = useNavigate(); // For redirection

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
                  navigate("/Dashboard"); // Redirect to login or tenant dashboard
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
    return <p></p>;
  }

  return (
    <form className={styles.profileForm}>
      <div className={styles.formColumns}>
        <div className={styles.formColumn}>
          <h2 className={styles.profileTitle}>Profile</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
            <input type="text" id="firstName" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input type="email" id="email" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input type="password" id="password" className={styles.inputField} />
          </div>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.editSection}>
            <button type="button" className={styles.editButton}>Edit</button>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
            <input type="text" id="lastName" className={styles.inputField} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.inputLabel}>New Password</label>
            <input type="password" id="newPassword" className={styles.inputField} />
          </div>
          <button type="submit" className={styles.saveButton}>SAVE CHANGES</button>
        </div>
      </div>
    </form>
  );
};
