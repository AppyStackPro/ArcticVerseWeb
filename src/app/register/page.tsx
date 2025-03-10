"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ContinueButton from "../components/continuebtn/continuebtn";
import "../scss/main.scss";
import "./register.scss";
import Navbar from "../components/Navbar/Navbar";
import { account, mainDatabase, usersCollection, db } from "@/lib/appwrite"; // Added databases
import { ID, Query } from "appwrite";

// const databaseId = "your-database-id"; // Replace with your database ID
// const usersCollection = "users"; // Collection where Arctic IDs are stored

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Validate email format
  useEffect(() => {
    setError("");
  }, [email]);

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
      // **Step 1: Delete any existing session before proceeding**
      try {
        const sessions = await account.listSessions();
        if (sessions.sessions.length > 0) {
          await account.deleteSessions(); // Remove all active sessions
          console.log("Old session deleted.");
        }
      } catch (sessionErr) {
        console.warn("No active session found, proceeding...");
        console.log(sessionErr)
      }

      // **Step 2: Check if Arctic ID already exists in the database**
      const existingUsers = await db.listDocuments(
        mainDatabase,
        usersCollection,
        [Query.equal("arcticId", username)]
      );

      if (existingUsers.documents.length > 0) {
        setError("Arctic ID is already taken. Please choose another.");
        return;
      }

      // **Step 3: Register new user**
      const userId = ID.unique();
      await account.create(userId, email, password);
      await account.createEmailPasswordSession(email, password);
      console.log("User registered & logged in successfully");

      // **Step 4: Save Arctic ID in the database**
      await db.createDocument(mainDatabase, usersCollection, ID.unique(), {
        email: email,
        arcticId: username,
        userId: userId,
      });

      console.log("Arctic ID assigned successfully.");
      router.push("/home");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message);
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
        <p>Username cannot contain special characters*</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password must be 8 characters long*</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <ContinueButton
          disabled={!email.trim() || !username.trim() || password.length < 8}
          onClick={handleContinue}
          buttonText="Continue"
        />
      </main>
    </>
  );
}
