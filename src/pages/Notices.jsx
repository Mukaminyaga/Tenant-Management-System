import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import styles from './Notices.module.css';

// Initialize Firebase Firestore
const db = getFirestore();

export const SendAlert = () => {
  const location = useLocation();
  const referrer = location.state?.from;

  // Ensure that the user comes from /Dashboard
  if (referrer !== "/Dashboard") {
    return <Navigate to="/Tenant Dashboard" replace />;
  }

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  const [announcement, setAnnouncement] = useState("Rent is due! Please pay before 5th of next month.");
  const [tenants, setTenants] = useState([]);

  // Fetch tenant data from Firestore
  useEffect(() => {
    const fetchTenants = async () => {
      const tenantsRef = collection(db, "users");
      const q = query(tenantsRef, where("role", "==", "tenant"));
      const querySnapshot = await getDocs(q);

      const tenantsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTenants(tenantsList);
    };

    fetchTenants();
  }, []);

  const handleSendAlert = async () => {
    if (!announcement.trim()) {
      alert("Please type a message before sending.");
      return;
    }

    // Loop over tenants and send email
    for (const tenant of tenants) {
      // Skip tenants without a valid email
      if (!tenant.email || !isValidEmail(tenant.email)) {
        console.error("Invalid or missing email for tenant:", tenant.id);
        continue;
      }

      const templateParams = {
        from_email: "tenantease24@gmail.com", // This must be the email registered with EmailJS
        to_email: tenant.email, // Tenant's email
        reply_to: "tenantease24@gmail.com", // Reply-to email (usually admin email)
        message: announcement, // The announcement message
      };

      try {
        const response = await emailjs.send(
          "service_p2qlcyf", // Your EmailJS service ID
          "template_uzjfg5h", // Your EmailJS template ID
          templateParams,
          "Dh4Ug8jsugp-UA63S" // Your EmailJS user ID
        );
        console.log("Email sent successfully to:", tenant.email);
      } catch (error) {
        console.error("Error sending email to:", tenant.email, error);
      }
    }

    alert("Emails sent successfully!");
  };

  // Email validation function
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <div className={styles.sidebarColumn}>
          <nav className={styles.sidebarContainer}>
            <Link to="/dashboard" className={styles.menuButton}>
              DASHBOARD
            </Link>
            <Link to="/properties" className={styles.menuButton}>
              PROPERTIES
            </Link>
            <Link to="/tenants-leases" className={styles.menuButton}>
              TENANTS & LEASES
            </Link>
            <Link to="/maintenance-repairs" className={styles.menuButton}>
              MAINT . & REPAIRS
            </Link>
            <Link to="/send-alert" className={styles.menuButton}>
              NOTICES
            </Link>
            <Link to="/payments" className={styles.menuButton}>
              PAYMENTS
            </Link>
            <Link to="/Settings" className={styles.menuButton}>
              SETTINGS
            </Link>
            <Link to="/logout" className={styles.menuButton}>
              LOGOUT
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.mainColumn}>
          <div className={styles.pageHeader}>SEND RENT DUE ALERT</div>
          <div className={styles.alertContainer}>
            <textarea
              placeholder="Type your announcement here..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className={styles.announcementTextarea}
            />
            <button onClick={handleSendAlert} className={styles.sendButton}>
              Send to All Tenants
            </button>
            {/* <Link to="/dashboard" className={styles.backLink}>Back</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;
