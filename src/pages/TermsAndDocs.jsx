import React, { useState } from "react";
import styles from "./TermsAndDocs.module.css";
import { SidebarItem } from './components/SideBarItem';
import profileIcon from '../Images/profile.png';
import termsIcon from '../Images/terms.png';
import messagesIcon from '../Images/messages.png';
import maintenanceIcon from '../Images/maintenance.png';
import paymentsIcon from '../Images/payments.png';
import settingsIcon from '../Images/settings.png';
import logoutIcon from '../Images/logout.png';
import terms from '../Images/cloud.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/MaintenanceDashboard' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];
const TermsAndDocs = () => {
  const [selectedDoc, setSelectedDoc] = useState("All Documents");

  const handleDropdownChange = (e) => {
    setSelectedDoc(e.target.value);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
        <nav>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
            />
          ))}
        </nav>
      </aside>

      <div className={styles.mainContent}>
        {/* Header with icon and title */}
        <header className={styles.headermessage}>
          <img
            loading="lazy"
            src={terms}
            alt="Terms Icon"
            className={styles.headermessageIcon}
          />
          <h2 className={styles.headermessageTitle}>TERMS AND DOCUMENTS</h2>
        </header>

        {/* Document Section */}
        <div className={styles.documentSection}>
          <div className={styles.dropdownContainer}>
            <label htmlFor="documentDropdown" className={styles.dropdownLabel}>ALL DOCUMENTS</label>
            <select
              id="documentDropdown"
              value={selectedDoc}
              onChange={handleDropdownChange}
              className={styles.dropdown}
            >
              <option>All Documents</option>
              <option>Government Photo ID</option>
              <option>Lease Agreement</option>
              <option>Renter Insurance</option>
              <option>Property Image</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.documents}>
            <div className={styles.documentCard}>
              <div className={styles.icon}>📄</div>
              <span>Government Photo ID</span>
            </div>
            <div className={styles.documentCard}>
              <div className={styles.icon}>📄</div>
              <span>Lease Agreement</span>
            </div>
            <div className={styles.documentCard}>
              <div className={styles.icon}>📄</div>
              <span>Renter Insurance</span>
            </div>
            <div className={styles.documentCard}>
              <div className={styles.icon}>📄</div>
              <span>Property Image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndDocs;
