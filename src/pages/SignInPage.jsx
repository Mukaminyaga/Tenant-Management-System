import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/ActionCreators/authActionsCreator'; // Adjust import based on your directory structure
import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './SignInPage.module.css';
import SignupImage from '../Images/Signup.png'; // Using Signup image as the background

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState(false); // To track sign-in success
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    // Dispatch sign-in action
    dispatch(signInUser(formData.email, formData.password, setSuccess));
  };

  useEffect(() => {
    if (success) {
      navigate("/Dashboard");  // Navigate to the Dashboard after successful login
    }
  }, [success, navigate]);

  return (
    <div className={styles.signInContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <h1 className={styles.title}>Welcome Back!</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Sign In
              </button>
            </form>
            {/* Forgot Password Link */}
            <Link to="/ResetPasswordForm" className={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className={styles.sideSection}>
          <div className={styles.signUpPrompt}>
            <img
              loading="lazy"
              src={SignupImage} // Using Signup image as the background
              alt="SignUp"
              className={styles.backgroundImage}
            />
            <div className={styles.signUpContent}>
              <p className={styles.promptText}>Don't have an Account yet?</p>
              <h2 className={styles.signUpText}>Sign Up</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
