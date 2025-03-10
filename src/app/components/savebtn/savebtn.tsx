// SaveButton.tsx
'use client'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import styles from './SaveButton.module.scss';

interface SaveButtonProps {
  onClick?: () => void;
  className?: string;
  showSuccessAnimation?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onClick, 
  className = '',
  showSuccessAnimation = true,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    if (isSaving || saved) return;
    
    setIsSaving(true);
    
    // If a click handler is provided, call it
    if (onClick) {
      onClick();
    }
    
    // Simulate success and show checkmark
    if (showSuccessAnimation) {
      setTimeout(() => {
        setIsSaving(false);
        setSaved(true);
        
        // Reset state after showing success
        setTimeout(() => {
          setSaved(false);
        }, 1500);
      }, 600);
    } else {
      setIsSaving(false);
    }
  };

  return (
    <Button
      variant="contained"
      className={`${styles.saveButton} ${isSaving ? styles.saving : ''} ${saved ? styles.saved : ''} ${className}`}
      onClick={handleClick}
      disabled={isSaving}
    >
      <span className={styles.buttonText}>Save</span>
      <CheckIcon className={styles.checkIcon} />
    </Button>
  );
};

export default SaveButton;