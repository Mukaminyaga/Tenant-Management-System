import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from "./SignUpPage.module.css";
import Signup from "../AuthImages/Signup.png";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const firebaseConfig = {
  apiKey: "AIzaSyB_s2DQ86GMDe1XiVfOT7T9fPA5LAxVFN0",
  authDomain: "tenant-management-system-64046.firebaseapp.com",
  projectId: "tenant-management-system-64046",
  storageBucket: "tenant-management-system-64046.firebasestorage.app",
  messagingSenderId: "388402906664",
  appId: "1:388402906664:web:ee3a92e6098288b432171d"
};

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
  const [apartmentNumber, setApartmentNumber] = useState(""); // New state variable
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword || !apartmentNumber) {
      alert("Please fill in all fields!");
      return;
    }

    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8 || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
      alert("Password must be at least 8 characters long, include a number, and a special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: `${firstName} ${lastName}`,
        email: user.email,
        role,
        apartmentNumber,
        verified: false,
        rentPaid: {
          JANUARY: false, // Set initial status for each month
          FEBRUARY: false,
          MARCH: false,
          JUNE: false,
          JULY: false,
          AUGUST: false,
          SEPTEMBER: false,
          OCTOBER: false,
          NOVEMBER: false,
          DECEMBER: false,
        },
      });

      alert("Registration successful! Please wait for admin verification.");
      navigate("/");

    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    } finally {
      setLoading(false);
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
              <label htmlFor="apartmentNumber" className={styles.formLabel}>
                Apartment Number
              </label>
              <input
                id="apartmentNumber"
                type="text"
                className={styles.formInput}
                placeholder="Enter your apartment number e.g. H22"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <div className={styles.passwordContainer}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={styles.formInput}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>
                Confirm Password
              </label>
              <div className={styles.passwordContainer}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={styles.formInput}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
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

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
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
