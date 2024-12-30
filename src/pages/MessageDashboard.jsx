import React, { useState } from 'react';
import { SidebarItem } from './components/SideBarItem';
import styles from './MessageDashboard.module.css';

import profileIcon from '../Images/profile.png';
import termsIcon from '../Images/terms.png';
import messagesIcon from '../Images/messages.png';
import maintenanceIcon from '../Images/maintenance.png';
import paymentsIcon from '../Images/payments.png';
import settingsIcon from '../Images/settings.png';
import logoutIcon from '../Images/logout.png';
import sendIcon from '../Images/send.png';

const sidebarItems = [
    { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
    { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
    { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
    { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/Report Issue' },
    { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
    { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
    { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' } 
];

const MessageDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.messageDashboard}>
      <div className={styles.container}>
        {/* Sidebar Toggle Button */}
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          <div className={styles.hamburger}></div>
        </button>

        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
        >
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

        <main className={styles.mainColumn}>
          <header className={styles.headermessage}>
            <img
              loading="lazy"
              src={messagesIcon}
              alt="Send Icon"
              className={styles.headermessageIcon}
            />
            <h2 className={styles.headermessageTitle}>MESSAGES</h2>
          </header>

          <section className={styles.content}>
            <h3 className={styles.contentTitle}>MESSAGES</h3>
            <p className={styles.notification}>
              Thank you for reaching out! <br />
              We will respond to your inquiry within a few business hours.
              <br />
              If you have an emergency or fire-related situation, please
              call 911 immediately. <br />
              For any maintenance concerns, kindly submit a maintenance
              request <a href="/Report Issue" className={styles.link}>here</a>.
            </p>

            <form onSubmit={handleSubmit} className={styles.messageForm}>
              <div className={styles.formGroup}>
                <label htmlFor="tenancyInput" className={styles.visuallyHidden}>
                  Enter your tenancy and name
                </label>
                <input
                  id="tenancyInput"
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your name and apartment number first"
                  required
                  aria-required="true"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="messageInput" className={styles.visuallyHidden}>
                  Message
                </label>
                <textarea
                  id="messageInput"
                  className={styles.formInput}
                  placeholder="Message"
                  required
                  aria-required="true"
                  rows={4}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MessageDashboard;
