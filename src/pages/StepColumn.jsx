import React from 'react';
import { Step } from './Step';
import styles from './HowItWorks.module.css';

export const StepColumn = ({ steps }) => {
  return (
    <div className={styles.stepColumn}>
      {steps.map((step, index) => (
        <Step
          key={step.number}
          number={step.number}
          title={step.title}
          description={step.description}
        />
      ))}
    </div>
  );
};