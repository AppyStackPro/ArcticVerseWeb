"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite"; // Adjust the path as needed

export default function Verify() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // Initial state

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (secret && userId) {
      account
        .updateVerification(userId, secret)
        .then(() => {
          setVerificationStatus("success");
        })
        .catch((error) => {
          console.error("Verification error:", error);
          setVerificationStatus("error");
        });
    } else {
      setVerificationStatus("invalid");
    }
  }, [router]);

  useEffect(() => {
    if (verificationStatus === "success") {
      router.push("/home");
    }
  }, [verificationStatus, router]);

  if (verificationStatus === "success") {
    return <div>Verification successful!</div>;
  } else if (verificationStatus === "error") {
    return <div>Verification failed.</div>;
  } else if (verificationStatus === "invalid") {
    return <div>Invalid verification link.</div>;
  } else {
    return <div>Verifying...</div>;
  }
}