"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, FormEvent } from "react";
import ContinueButton from "../components/continuebtn/continuebtn";
import "../scss/main.scss";
import "./register.scss";
import Navbar from "../components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [email, password, confirmPassword]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    validateEmail(email) &&
    password.length >= 8 &&
    confirmPassword.length >= 8 &&
    password === confirmPassword;

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    setError(null);

    if (!isFormValid) {
      setError("Please enter valid info before proceeding.");
      return;
    }

    try {
      // 1. Check if email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods && signInMethods.length > 0) {
        setError("Email is already in use.");
        return;
      }

      // 2. Create user in Firebase Auth and sign in
      await createUserWithEmailAndPassword(auth, email, password);

      // 3. Redirect to home
      router.push("/home");
    } catch (error: unknown) {
      console.error("Firebase Registration Error:", error);
      setError("Account already exists with this email.");

      if (error instanceof Error) {
        console.error("Firebase Error Message:", error.message);

        // Handle Firebase error codes safely
        const firebaseError = error as { code?: string };
        if (firebaseError.code) {
          console.error("Firebase Error Code:", firebaseError.code);
        }
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main id="Register-page">
        <h1 id="Login-head">Create New Arctic Id</h1>
        <input
          type="email"
          className="register-inputs top-input"
          placeholder="Your email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password must be 8 characters long*</p>
        <input
          className="register-inputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="register-inputs"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <ContinueButton
          disabled={!isFormValid}
          onClick={() =>
            handleRegister(new Event("click") as unknown as FormEvent)
          }
        />
      </main>
    </>
  );
}
