import React from 'react'
import styles from './LandingPage.module.css'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const NavBar = () => {
  return (
    <div className='NavBar'>
<header className={styles.header}>
        <nav className={styles.navigation}>
          <div className={styles.logoContainer}>
            <Link to= '/'>
              <span className={styles.logoText}>TenantEase</span>
            </Link>
          </div>
          <div className={styles.navLinks}>
            <Link to="/AboutUs" className={styles.navLink}>About Us</Link>
            <Link to="/Services" className={styles.navLink}>Our Services</Link>
            <Link to="/HowItWorks" className={styles.navLink}>How It Works</Link>
            <Link to="/Contact Us" className={styles.navLink}>Contact</Link>
          </div>
          <div className={styles.authButtons}>
            <Link to="/Login" className={styles.signInButton}>
              Sign In
            </Link>
            <Link to="/SignUp" className={styles.registerButton}>
              Register <FaArrowRight className={styles.arrowIcon} />
            </Link>
          </div>
        </nav>
      </header> 
      </div> )
}

export default NavBar