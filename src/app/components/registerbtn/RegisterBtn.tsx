'use client'; // Mark this component as a Client Component

import React from 'react';
import Button from '@mui/material/Button';
import styles from './RegisterButton.module.scss';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

interface RegisterButtonProps {
  className?: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ className = '' }) => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    router.push('/register'); // Navigate to /register
  };

  return (
    <Button
      variant="outlined"
      className={`${styles.registerButton} ${className}`}
      onClick={handleClick} // Use handleClick
    >
      Register
      <span className={styles.starIcon}>★</span>
    </Button>
  );
};

export default RegisterButton;