import React, { useEffect, useState } from "react";
import { firestore, auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";

export const ProfileFormManager = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUserId(currentUser.uid);
          try {
            const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setRole(userData.role);
              if (userData.role !== "admin") {
                alert("Access denied. Admins only.");
                navigate("/Tenant Dashboard");
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
          navigate("/Login");
        }
      });
    };

    checkUserRole();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  if (role === null) {
    return (
      <div className={styles.spinner}>
        <div></div>
      </div>
    );
  }

  if (role !== "admin") {
    return null;
  }

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <div className={styles.formColumns}>
        <div className={styles.formColumn}>
          <h2 className={styles.profileTitle}>Profile</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.inputLabel}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.inputField}
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.formColumn}>
          <div className={styles.editSection}>
            <button type="button" className={styles.editButton}>
              Edit
            </button>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.inputLabel}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.inputField}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.inputLabel}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className={styles.inputField}
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className={styles.saveButton}>
            SAVE CHANGES
          </button>
        </div>
      </div>
    </form>
  );
};
