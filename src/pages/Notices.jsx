import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from './Notices.module.css';
import Sidebar from "./Sidebar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';

// Initialize Firebase Firestore
const db = getFirestore();

export const SendAlert = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [announcement, setAnnouncement] = useState("");
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoReminderEnabled, setAutoReminderEnabled] = useState(true);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  // Check if today is the 5th of the month
  const isFifthOfMonth = new Date().getDate() === 5;

  // Fetch tenant data from Firestore
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setIsLoading(true);
        const tenantsRef = collection(db, "users");
        const q = query(tenantsRef, where("role", "==", "tenant"));
        const querySnapshot = await getDocs(q);

        const tenantsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTenants(tenantsList);
        
        // Send automatic rent reminder if it's the 5th and enabled
        if (isFifthOfMonth && autoReminderEnabled) {
          await sendRentReminders(tenantsList);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error);
        toast.error("Failed to load tenant data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenants();
  }, [autoReminderEnabled]);

  const sendRentReminders = async (tenantsToNotify = tenants) => {
    // Ensure tenantsToNotify is always an array
    const tenantsList = Array.isArray(tenantsToNotify) ? tenantsToNotify : tenants;
    
    if (!tenantsList || tenantsList.length === 0) {
      toast.warning("No tenants found to notify");
      return;
    }

    const defaultMessage = "Friendly reminder: Rent is due by the 5th of this month. Please make your payment by then to avoid late fees.";
    const rentSubject = "RENT REMINDER";

    try {
      setIsLoading(true);
      let successCount = 0;
      let failCount = 0;

      for (const tenant of tenantsList) {
        if (!tenant?.email || !isValidEmail(tenant.email)) {
          failCount++;
          continue;
        }

        const templateParams = {
          Subject: rentSubject,
          from_email: "tenantease24@gmail.com",
          to_email: tenant.email,
          reply_to: "tenantease24@gmail.com",
          message: defaultMessage,
          tenant_name: tenant.name || "Tenant",
          apartment: tenant.apartmentNumber || "",
        };

        try {
          await emailjs.send(
            "service_p2qlcyf",
            "template_uzjfg5h",
            templateParams,
            "Dh4Ug8jsugp-UA63S"
          );
          successCount++;
        } catch (error) {
          console.error("Error sending email to:", tenant.email, error);
          failCount++;
        }
      }

      toast.success(`Automatic reminders sent! ${successCount} successful, ${failCount} failed`);
    } catch (error) {
      console.error("Error sending rent reminders:", error);
      toast.error("Failed to send automatic reminders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendBroadcast = async () => {
    if (!announcement.trim()) {
      toast.warning("Please type a message before sending");
      return;
    }
    const noticeSubject = "IMPORTANT NOTICE";
    try {
      setIsLoading(true);
      let successCount = 0;
      let failCount = 0;

      // Ensure we're working with a valid tenants array
      const tenantsToNotify = Array.isArray(tenants) ? tenants : [];
      
      for (const tenant of tenantsToNotify) {
        if (!tenant?.email || !isValidEmail(tenant.email)) {
          failCount++;
          continue;
        }

        const templateParams = {
          Subject: noticeSubject,
          from_email: "tenantease24@gmail.com",
          to_email: tenant.email,
          reply_to: "tenantease24@gmail.com",
          message: announcement,
          tenant_name: tenant.name || "Tenant",
          apartment: tenant.apartmentNumber || "",
        };

        try {
          await emailjs.send(
            "service_p2qlcyf",
            "template_uzjfg5h",
            templateParams,
            "Dh4Ug8jsugp-UA63S"
          );
          successCount++;
        } catch (error) {
          console.error("Error sending email to:", tenant.email, error);
          failCount++;
        }
      }

      toast.success(`Broadcast sent! ${successCount} successful, ${failCount} failed`);
      setAnnouncement("");
    } catch (error) {
      console.error("Error sending broadcast:", error);
      toast.error("Failed to send broadcast");
    } finally {
      setIsLoading(false);
    }
  };

  // Email validation function
  const isValidEmail = (email) => {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        <Sidebar />
        
        <div className={styles.mainColumn}>
          <div className={styles.pageHeader}>
            <FaBell className={styles.headerIcon} />
            NOTICE MANAGEMENT
          </div>
          <div className={styles.noticesSection}>
          {/* Automatic Reminders Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h3>Automatic Rent Reminders</h3>
            </div>
            <p className={styles.sectionDescription}>
              The system will automatically send rent reminders to all tenants on the 5th of each month. 
              However, you can send out manual reminders by clicking the button below.
              {isFifthOfMonth && " (Today is the 5th - reminders will be sent)"}
            </p>
            
            <div className={styles.toggleContainer}>
              <label className={styles.toggleSwitch}>
                <input 
                  type="checkbox" 
                  checked={autoReminderEnabled}
                  onChange={() => setAutoReminderEnabled(!autoReminderEnabled)}
                />
                <span className={styles.slider}></span>
              </label>
              <span className={styles.toggleLabel}>
                {autoReminderEnabled ? "Enabled" : "Disabled"}
              </span>
            
            <button 
              onClick={() => sendRentReminders()}
              disabled={isLoading || tenants.length === 0}
              className={styles.testButton}
            >
              {isLoading ? "Sending..." : "Send manual reminders now"}
            </button>
            </div>
          </div>
          
          {/* Manual Broadcast Section */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h3>Send Broadcast Notice</h3>
            </div>
            <p className={styles.sectionDescription}>
              Send an immediate notice to all tenants (e.g., maintenance alerts, policy changes).
            </p>
            
            <textarea
              placeholder="Type your announcement here..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className={styles.announcementTextarea}
              rows={5}
            />
            
            <div className={styles.buttonGroup}>
              <button 
                onClick={handleSendBroadcast}
                disabled={isLoading || !announcement.trim() || tenants.length === 0}
                className={styles.sendButton}
              >
                {isLoading ? "Sending..." : "Send Broadcast"}
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendAlert;