import React, { useState } from "react";
import styles from "./PaymentTenant.module.css";
import { SidebarItem } from './components/SideBarItem';
import profileIcon from './Images/profile.png';
import termsIcon from './Images/terms.png';
import messagesIcon from './Images/messages.png';
import maintenanceIcon from './Images/maintenance.png';
import paymentsIcon from './Images/payments.png';
import settingsIcon from './Images/settings.png';
import logoutIcon from './Images/logout.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/Settings' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/MaintenanceDashboard' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];

const PaymentTenant = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleDownloadReceipt = () => {
    // Logic to download receipt
    alert("Receipt downloaded!");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Toggle Button */}
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        <div className={styles.hamburger}></div>
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
          <nav>
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                link={item.link} // Pass the link to SidebarItem
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header Section */}
        <header className={styles.header}>
          <img src={paymentsIcon} alt="Payments Icon" className={styles.headerIcon} />
          <h1 className={styles.headerText}>Payments</h1>
        </header>

        <div className={styles.paymentSummary}>
          <h2>Payment Summary</h2>
          <div className={styles.details}>
            <p>
              <strong>Due Date:</strong> <span>2024-12-31</span>
            </p>
            <p>
              <strong>Total Amount Due:</strong> <span>$1200</span>
            </p>
          </div>
          <button
            className={styles.downloadButton}
            onClick={handleDownloadReceipt}
          >
            Download Receipt
          </button>
        </div>
        <div className={styles.history}>
          <h2>Payment History</h2>
          <ul>
            <li>Payment #1 - $500</li>
            <li>Payment #2 - $700</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentTenant;
