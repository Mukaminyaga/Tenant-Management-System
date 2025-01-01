import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebaseConfig"; // Ensure correct paths
import styles from "./SignInPage.module.css";
import SignupImage from "../AuthImages/Signup.png";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [roleRedirect, setRoleRedirect] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (!userData.verified) {
          alert("Your account is not verified yet. Please wait for admin approval.");
          return;
        }

        setSuccess(true);
        if (userData.role === "admin") {
          setRoleRedirect("/Dashboard");
        } else if (userData.role === "tenant") {
          setRoleRedirect("/Tenant Dashboard");
        } else {
          alert("Unknown role. Contact support.");
        }
      } else {
        alert("No user data found. Contact support.");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && roleRedirect) {
      navigate(roleRedirect);
    }
  }, [success, roleRedirect, navigate]);

  return (
    <div className={styles.signInContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Welcome Back!</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>
              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? (
                  <div className={styles.loader}></div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <Link to="/ResetPasswordForm" className={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.signUpPrompt}>
            <img
              loading="lazy"
              src={SignupImage}
              alt="SignUp"
              className={styles.backgroundImage}
            />
            <div className={styles.signUpContent}>
              <p className={styles.promptText}>Don't have an Account yet?</p>
              <Link to="/SignUp" className={styles.signUpText}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
