import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from "./SignUpPage.module.css";
import Signup from "../AuthImages/Signup.png";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_s2DQ86GMDe1XiVfOT7T9fPA5LAxVFN0",
  authDomain: "tenant-management-system-64046.firebaseapp.com",
  projectId: "tenant-management-system-64046",
  storageBucket: "tenant-management-system-64046.firebasestorage.app",
  messagingSenderId: "388402906664",
  appId: "1:388402906664:web:ee3a92e6098288b432171d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: `${firstName} ${lastName}`,
        email: user.email,
        role,
        verified: false, // Unverified by default
      });

      alert("Registration successful! Please wait for admin verification to log in.");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <form className={styles.signUpForm} onSubmit={handleSignUp}>
            <h1 className={styles.formTitle}>Create an account</h1>

            <div className={styles.nameFields}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={styles.formInput}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={styles.formInput}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={styles.formInput}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>
                Role
              </label>
              <select
                id="role"
                className={styles.formInput}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="tenant">Tenant</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.menuIcon}>
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </div>
          <div className={styles.signInPrompt}>
            <img src={Signup} alt="Signup" className={styles.backgroundImage} />
            <div className={styles.promptContent}>
              <p className={styles.promptText}>Already have an account?</p>
              <Link to="/Login" className={styles.signInText}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
