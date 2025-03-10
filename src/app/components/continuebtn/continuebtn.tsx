// ContinueButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './ContinueButton.module.scss';

interface ContinueButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ 
  onClick, 
  className = '',
  disabled = false
}) => {
  return (
    <Button
      variant="contained"
      className={`${styles.continueButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      endIcon={<ArrowForwardIcon className={styles.arrowIcon} />}
    >
      <span className={styles.pixelText}>Continue</span>
    </Button>
  );
};

export default ContinueButton;