import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandlordDashboardLayout.module.css';
import DashboardMetricCard from './DashboardMetricCard';
import PropertyActionCard from './PropertyActionCard';

const menuItems = [
  { name: 'DASHBOARD', path: '/dashboard' },
  { name: 'PROPERTIES', path: '/properties' },
  { name: 'TENANTS & LEASES', path: '/tenants-leases' },
  { name: 'MAINT . & REPAIRS', path: '/maintenance-repairs' },
  { name: 'NOTICES', path: '/Send Alert' },
  { name: 'PAYMENTS', path: '/payments' },
  { name: 'SETTINGS', path: '/Settings' },
  { name: 'LOGOUT', path: '/logout' }
];

const metrics = [
  { title: 'Open Maint .', value: '0', onView: () => {} },
  { title: 'Late payment', value: '0', onView: () => {} },
  { title: 'Vacant Units', value: '0', onView: () => {} }
];

const actions = [
  {
    title: 'Advertise Property',
    description: 'You have a vacant property\nyou should advertise it',
    onAction: () => {}
  },
  {
    title: 'Collect Rent',
    description: 'You have active tenants\nwithout recurring rent',
    onAction: () => {}
  }
];

export default function LandlordDashboardLayout() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <div className={styles.sidebarColumn}>
          <nav className={styles.sidebarContainer}>
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                className={styles.menuButton}
                aria-label={item.name.toLowerCase()}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className={styles.mainColumn}>
          <div className={styles.pageHeader}>PROPERTIES</div>
          <div className={styles.statsContainer}>
            <div className={styles.statsWrapper}>
              <div className={styles.contentWrapper}>
                {metrics.map((metric, index) => (
                  <div key={index} style={{width: '33%'}}>
                    <DashboardMetricCard {...metric} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.actionCardsContainer}>
              <div className={styles.contentWrapper}>
                {actions.map((action, index) => (
                  <div key={index} style={{width: '50%'}}>
                    <PropertyActionCard {...action} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
