// AnimatedInput.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, InputAdornment, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import styles from './AnimatedInput.module.scss';

interface AnimatedInputProps {
  fullText?: string;
  delay?: number;
  typingSpeed?: number;
  className?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  fullText = 'play.arcticverse.in',
  delay = 1000,
  typingSpeed = 100,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle visibility and typing animation
  useEffect(() => {
    // First delay before showing the component
    const visibilityTimer = setTimeout(() => {
      setVisible(true);
      
      // Start typing after component is visible
      setTimeout(() => {
        setIsTyping(true);
        let currentIndex = 0;
        
        const typingInterval = setInterval(() => {
          if (currentIndex < fullText.length) {
            setDisplayedText(fullText.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
          }
        }, typingSpeed);
        
        return () => clearInterval(typingInterval);
      }, 200); // Small delay after fade-in
    }, delay);
    
    return () => clearTimeout(visibilityTimer);
  }, [fullText, delay, typingSpeed]);

  // Handle copy functionality
  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Paper 
      elevation={1} 
      className={`${styles.AnimatedInputContainer} ${visible ? styles.visible : ''} ${className}`}
    >
      <TextField
        fullWidth
        variant="standard"
        value={displayedText}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
          className: styles.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleCopy} 
                edge="end" 
                className={styles.copyButton}
                disabled={isTyping}
              >
                {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputRef={inputRef}
      />
    </Paper>
  );
};

export default AnimatedInput;