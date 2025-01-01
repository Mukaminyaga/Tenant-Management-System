import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/DashboardComponents/TenantNav";
import { SidebarItem } from "../components/SideBarItem";
import { StatCard } from "../components/StatCard1";
import { ActionCard } from "../components/ActionCard";
import styles from "../Dashboard.module.css";

// Import local images
import profileIcon from "../Images/profile.png";
import termsIcon from "../Images/terms.png";
import messagesIcon from "../Images/messages.png";
import maintenanceIcon from "../Images/maintenance.png";
import paymentsIcon from "../Images/payments.png";
import settingsIcon from "../Images/settings.png";
import logoutIcon from "../Images/logout.png";
import maintenance from "../Images/maintenanceIcon.png";
import messageIcon from "../Images/messageIcon.png";

const sidebarItems = [
  { icon: profileIcon, label: "PROFILE", link: "/DashboardTenant" },
  { icon: termsIcon, label: "TERMS AND DOCS", link: "/TermsAndDocs" },
  { icon: messagesIcon, label: "MESSAGES", link: "/MessageTenant" },
  { icon: maintenanceIcon, label: "MAINT . & REPAIRS", link: "/MaintenanceDashboard" },
  { icon: paymentsIcon, label: "PAYMENTS", link: "/PaymentTenant" },
  { icon: settingsIcon, label: "SETTINGS", link: "/Settings" },
  { icon: logoutIcon, label: "LOGOUT", link: "/LogoutPage" },
];

const TenantDashboard = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ensure only authenticated users can access the Dashboard
  if (!isAuthenticated) {
    navigate("/Login");
    return null; // Prevent further rendering until redirection
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.layoutWrapper}>
          {/* Sidebar Toggle Button */}
          <button className={styles.sidebarToggle} onClick={toggleSidebar}>
            <div className={styles.hamburger}></div>
          </button>

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

          <main className={styles.mainContent}>
            <header className={styles.header}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e46a0783940f90b9f5158d5735cabad42c3f272463b4866e52b268c0c9bbc76?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
                alt="Dashboard Icon"
                className={styles.headerIcon}
              />
              <h1 className={styles.headerTitle}>DASHBOARD</h1>
              <div className={styles.headerNav}>
                <Nav />
              </div>
            </header>

            <section className={styles.contentSection}>
              <div className={styles.statsHeader} onClick={toggleDropdown}>
                <h2 className={styles.statsTitle}>ALL TENANCIES</h2>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/149ab9a1fd1230dbab4749450cc0fb898ac147c7b93ec51547487cf4873f4f04?placeholderIfAbsent=true&apiKey=febb6e01b7be4e54a81beb5e9ff50628"
                  alt="Stats Icon"
                  className={styles.statsIcon}
                />
              </div>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <ul>
                    <li>Current Tenancy</li>
                  </ul>
                </div>
              )}

              <div className={styles.statsGrid}>
                <StatCard
                  title="OPEN MAINT."
                  count="0"
                  link="/maintenance"
                />
                <StatCard
                  title="LATE PAYMENTS"
                  count="0"
                  link="/late-payments"
                />
              </div>

              <div className={styles.actionGrid}>
                <ActionCard
                  title="MAINTENANCE"
                  description="Submit a maintenance request"
                  icon={maintenance}
                  link="/MaintenanceDashboard"
                />
                <ActionCard
                  title="MESSAGE"
                  description="Send message to property rep"
                  icon={messageIcon}
                  link="/MessageTenant"
                />
              </div>

              <div className={styles.additionalLink}>
                <Link
                  to="/Report Issue"
                  state={{ from: "/Tenant Dashboard" }}
                >
                  Report Issue Link
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default TenantDashboard;
