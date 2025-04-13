import React from 'react';
import { StepColumn } from './StepColumn';
import styles from './HowItWorks.module.css';
import NavBar from './NavBar';

const firstColumnSteps = [
  {
    number: "1",
    title: "Create an account",
    description: "Begin by signing up on our platform you will gain access to your personalized dashboard, where you can manage all aspects of your tenancy. "
  },
  {
    number: "2",
    title: "Smart Notifications",
    description: "You will get notified of upcoming rent due dates ensuring you never miss a payment, receive updates on your maintenance requests, and also community notices such as upcoming repairs."
  },
  {
    number: "3",
    title: "Easy Access of Documents",
    description: "Easily access essential documents such as your lease agreement directly from your dashboard."
  }
];

const secondColumnSteps = [
  {
    number: "4",
    title: "Rent Payment Processing",
    description: "Through this platform, you can track your payments by downloading detailed receipts ensuring you have accurate records of your payments."
  },
  {
    number: "5",
    title: "Maintenance Requests",
    description: "Encountered an issue in your apartment? Use our platform to submit a maintenance request quickly and easily to our property managers."
  },
  {
    number: "6",
    title: "Simplified Tenant Support",
    description: "Need assistance? Use the built-in messaging feature to talk to our property management team."
  }
];

const HowItWorks = () => {
  return (
    <>
    <NavBar />
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerColumn}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>How It Works</h2>
            <p className={styles.description}>
              At Haven Heights, we've streamlined the process of managing your
              home through this platform. Here's a step-by-step breakdown of
              how it works:
            </p>
          </div>
        </div>
        <div className={styles.contentColumn}>
          <div className={styles.menuContainer}>
            <div className={styles.menuIcon}>
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
            </div>
            <div className={styles.stepsContainer}>
              <StepColumn steps={firstColumnSteps} />
              <StepColumn steps={secondColumnSteps} />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HowItWorks;
