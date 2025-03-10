// LoginBtn.tsx
import React from 'react';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import styles from './LoginBtn.module.scss';
import { useRouter } from 'next/navigation';

interface LoginBtnProps {
  onClick?: () => void;
  className?: string;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ 
  className = ''
}) => {
  const router = useRouter(); // Initialize useRouter
  
    const handleClick = () => {
      router.push('/login'); // Navigate to /register
    };
  return (
    <Button
      variant="contained"
      className={`${styles.loginButton} ${className}`}
      onClick={handleClick}
    >
      <span className={styles.pixelText}>Login</span>
      <ArrowOutwardIcon className={styles.arrowIcon} />
    </Button>
  );
};

export default LoginBtn;