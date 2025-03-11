// LoginBtn.tsx
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import styles from "./LoginBtn.module.scss";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";

interface LoginBtnProps {
  className?: string;
}

const LoginBtn: React.FC<LoginBtnProps> = ({ className = "" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = auth.currentUser;
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  };

  if (isLoading) {
    return null; // Or a loading indicator if you prefer
  }

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
