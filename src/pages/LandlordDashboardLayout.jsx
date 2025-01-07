import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './LandlordDashboardLayout.module.css';
import DashboardMetricCard from './DashboardMetricCard';
import PropertyActionCard from './PropertyActionCard';
import Nav from '../components/DashboardComponents/TenantNav';

const menuItems = [
  { name: 'DASHBOARD', path: '/Dashboard' },
  { name: 'PROPERTIES', path: '/properties' },
  { name: 'TENANTS & LEASES', path: '/Tenants' },
  { name: 'MAINT . & REPAIRS', path: '/maintenance-repairs' },
  { name: 'NOTICES', path: '/Send Alert' },
  { name: 'PAYMENTS', path: '/payments' },
  { name: 'SETTINGS', path: '/Profile Settings' },
  { name: 'LOGOUT', path: '/logout' },
];

const metrics = [
  { title: 'Open Maint .', value: '0', onView: () => {} },
  { title: 'Late payment', value: '0', onView: () => {} },
  { title: 'Vacant Units', value: '0', onView: () => {} },
];

const actions = [
  {
    title: 'Advertise Property',
    description: 'You have a vacant property\nyou should advertise it',
    onAction: () => {},
  },
  {
    title: 'Collect Rent',
    description: 'You have active tenants\nwithout recurring rent',
    onAction: () => {},
  },
];

export default function LandlordDashboardLayout() {
  const [role, setRole] = useState(null); // Store user role
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const checkUserRole = async () => {
      setIsLoading(true); // Ensure loading starts
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setRole(userData.role);
              if (userData.role !== 'admin') {
                alert('Access denied. Admins only.');
                navigate('/'); // Redirect to home or login page
              }
            } else {
              alert('User not found.');
              navigate('/Login'); // Redirect to login if user document doesn't exist
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
            navigate('/');
          } finally {
            setIsLoading(false); // End loading state
          }
        } else {
          setIsLoading(false);
          navigate('/Login'); // Redirect to login if user is not authenticated
        }
      });
    };

    checkUserRole();
  }, [navigate]);

  // Show loader if loading
  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <div className={styles.spinnerCircle}></div>
      </div>
    );
  }

  // Render nothing if access is denied
  if (role !== 'admin') {
    return null;
  }

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
                           <Link to="/PaymentApproval" className={styles.menuButton}>
                             PAYMENTS
                           </Link>
                           <Link to="/Settings" className={styles.menuButton}>
                             SETTINGS
                           </Link>
                         </nav>
           </div>
   
        
        {/* Main Content */}
        <div className={styles.mainColumn}>
          <div className={styles.pageHeader}>
            <Nav />
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.statsWrapper}>
              <div className={styles.contentWrapper}>
                {metrics.map((metric, index) => (
                  <div key={index} style={{ width: '33%' }}>
                    <DashboardMetricCard {...metric} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionCardsContainer}>
              <div className={styles.contentWrapper}>
                {actions.map((action, index) => (
                  <div key={index} style={{ width: '50%' }}>
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
