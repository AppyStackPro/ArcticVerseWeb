"use client";
import { useRouter } from "next/navigation";
import ContinueButton from "../components/continuebtn/continuebtn";
import "./login.scss";
import "../scss/main.scss";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setError("");
    const checkAuth = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuth();
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Extracts a readable error message
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main id="login-page">
        <h1 id="Login-head">Login With email and pass</h1>
        <input
          type="email"
          className="login-inputs top-input"
          placeholder="email:"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password-input"
          className="login-inputs bottom-input"
          placeholder="pass:"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <ContinueButton onClick={handleContinue} />
      </main>
    </>
  );
}
