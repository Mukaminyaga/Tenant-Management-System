import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandlordDashboardLayout.module.css';
import DashboardMetricCard from './DashboardMetricCard';
import PropertyActionCard from './PropertyActionCard';


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
                           <Link to="" className={styles.menuButton}>
                            DASHBOARD
                           </Link>
                           <Link to="/LandlordDashboard" className={styles.menuButton}>
                             PROPERTIES
                           </Link>
                           <Link to="/TenantsPage" className={styles.menuButton}>
                             TENANTS & LEASES
                           </Link>
                           <Link to="/maintenance-repairs" className={styles.menuButton}>
                             MAINT . & REPAIRS
                           </Link>
                           <Link to="/Send Alert" className={styles.menuButton}>
                             NOTICES
                           </Link>
                           <Link to="/payments" className={styles.menuButton}>
                             PAYMENTS
                           </Link>
                           <Link to="/Settings" className={styles.menuButton}>
                             SETTINGS
                           </Link>
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
