import React from 'react'
import { FiBell, FiDollarSign, FiHome, FiSettings, FiUsers } from 'react-icons/fi';
import styles from './LandlordDashboardLayout.module.css';
import { Link } from 'react-router-dom';


const menuItems = [
  { name: 'Dashboard', path: '/LandlordDashboard', icon: <FiHome /> },
  { name: 'Properties', path: '/properties', icon: <FiHome /> },
  { name: 'Tenants & Leases', path: '/TenantsPage', icon: <FiUsers /> },
  // { name: 'Maintenance', path: '/MaintenanceDashboard', icon: <FiTool /> },
  { name: 'Notices', path: '/Send Alert', icon: <FiBell /> },
  { name: 'Payments', path: '/Payment', icon: <FiDollarSign /> },
  { name: 'Settings', path: '/Profile Settings', icon: <FiSettings /> },
  // { name: 'Logout', path: '/logout', icon: <FiLogOut /> },
]; 
const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                  <h2>Landlord Portal</h2>
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
                  <button className={styles.supportButton}><Link to="/Contact Us"> Contact Support</Link></button>
                </div>
              </aside>
    </div>
  )
}

export default Sidebar