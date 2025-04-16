import React from 'react';
import { FiBell, FiDollarSign, FiHome, FiSettings, FiFileText,FiMessageSquare, FiUsers, FiTool } from 'react-icons/fi';
import styles from './LandlordDashboardLayout.module.css';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', path: '/Tenant Dashboard', icon: <FiHome /> },
  { name: 'Terms&Docs', path: '/TermsAndDocs', icon: <FiFileText /> }, // Document icon
  { name: 'Messages', path: '/MessageTenant', icon: <FiMessageSquare /> },
  { name: 'Maint.& Repairs', path: '/Report Issue', icon: <FiTool /> },
  // { name: 'Notices', path: '/Send Alert', icon: <FiBell /> },
  { name: 'Payments', path: '/PaymentTenant', icon: <FiDollarSign /> },
  { name: 'Settings', path: '/Settings', icon: <FiSettings /> },
  // { name: 'Logout', path: '/logout', icon: <FiLogOut /> },
];

const Sidebar = () => {
  const location = useLocation(); // This hook needs to be used inside a Router

  return (
    <div className={styles.sidebarWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Tenant Portal</h2>
        </div>
        <nav className={styles.sidebarNav}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${styles.menuItem} ${
                location.pathname.includes(item.path.toLowerCase()) ? styles.active : ''
              }`}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <p>Need help?</p>
          <button className={styles.supportButton}>Contact Support</button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;