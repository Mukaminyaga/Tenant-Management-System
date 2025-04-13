import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './LandlordDashboardLayout.module.css';
import DashboardMetricCard from './DashboardMetricCard';
import PropertyActionCard from './PropertyActionCard';
import Nav from '../components/DashboardComponents/TenantNav';
import { FiHome, FiUsers, FiTool, FiBell, FiDollarSign, FiSettings, FiLogOut } from 'react-icons/fi';

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

const metrics = [
  { title: 'Open Maintenance', value: '0', trend: 'neutral', onView: () => {} },
  { title: 'Late Payments', value: '0', trend: 'up', onView: () => {} },
  { title: 'Vacant Units', value: '0', trend: 'down', onView: () => {} },
  { title: 'Total Properties', value: '0', trend: 'neutral', onView: () => {} },
];

const actions = [
  {
    title: 'Advertise Property',
    description: 'You have vacant properties that should be advertised',
    actionText: 'List Property',
    icon: '📢',
    onAction: () => {},
  },
  {
    title: 'Collect Rent',
    description: 'You have active tenants without recurring rent setup',
    actionText: 'Setup Payments',
    icon: '💰',
    onAction: () => {},
  },
];

export default function LandlordDashboardLayout({ children }) {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      setIsLoading(true);
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setRole(userData.role);
              if (userData.role !== 'admin') {
                navigate('/');
              }
            } else {
              navigate('/login');
            }
          } catch (error) {
            console.error('Error fetching user role:', error);
            navigate('/');
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          navigate('/login');
        }
      });
      return () => unsubscribe();
    };

    checkUserRole();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className={styles.spinnerOverlay}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (role !== 'admin') {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
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
          <button className={styles.supportButton}>Contact Support</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <Nav />
        </header>
        
        <div className={styles.contentArea}>
          {/* Dashboard Overview */}
          <section className={styles.dashboardOverview}>
            <h1 className={styles.welcomeMessage}>Welcome back, Landlord</h1>
            <p className={styles.subtitle}>Here's what's happening with your properties today</p>
            
            {/* Metrics Grid */}
            <div className={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <DashboardMetricCard key={index} {...metric} />
              ))}

            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.quickActions}>
            <h2>Quick Actions</h2>
            <div className={styles.actionCards}>
              {actions.map((action, index) => (
                <PropertyActionCard key={index} {...action} />
              ))}
            </div>
          </section>

          {/* Page Content */}
          <section className={styles.pageContent}>
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}