"use client";
import { useRouter } from "next/navigation";
import ContinueButton from "../components/continuebtn/continuebtn";
import "./login.scss";
import "../scss/main.scss";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setError("");
  }, [email]);

  const validateEmail = (email) => {
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
      const loginRes = await account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login successful:", loginRes);

      // Fetch user object after successful login
      const user = await account.get();

      // Store the user object in localStorage
      localStorage.setItem("appwrite_session", JSON.stringify(user));

      router.push("/home");
    } catch (error) {
      console.log("Login failed:", error);
      setError("Invalid email or password. Please try again.");
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
