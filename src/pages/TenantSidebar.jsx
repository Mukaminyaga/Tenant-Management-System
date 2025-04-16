import React from 'react'
import { FiDollarSign, FiHome, FiSettings, FiUsers, FiUploadCloud, FiTool } from 'react-icons/fi';
import styles from './LandlordDashboardLayout.module.css';
import { Link } from 'react-router-dom';


const menuItems = [
  { name: 'Dashboard', path: '/Tenant Dashboard', icon: <FiHome /> },
  { name: 'Terms & Docs', path: '/TermsAndDocs', icon: <FiUploadCloud /> },
  { name: 'Messages', path: '/MessageTenant', icon: <FiUsers /> },
  { name: 'Maintenance & Repairs', path: '/MaintenanceDashboard', icon: <FiTool /> },
  { name: 'Payments', path: '/PaymentTenant', icon: <FiDollarSign /> },
  { name: 'Settings', path: '/Settings', icon: <FiSettings /> },
  // { name: 'Logout', path: '/logout', icon: <FiLogOut /> },
];
const TenantSidebar = () => {
  return (
    <div className='Sidebar'>
        <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                  <h2>Tenant Dashboard</h2>
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
                  <button className={styles.supportButton}><Link to='/Contact Us'> Contact Support</Link></button>
                </div>
              </aside>
    </div>
  )
}

export default TenantSidebar