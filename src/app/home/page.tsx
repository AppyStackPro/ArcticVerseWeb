"use client";
import "./../scss/main.scss";
import Link from "next/link";
import Navbar from "./../components/Navbar/Navbar";
import AnimatedInput from "./../components/Animated/AnimatedInput";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { account, db, mainDatabase, usersCollection } from "@/lib/appwrite"; // Import Appwrite database
import { Query } from "appwrite";

export default function Home() {
  const [arcticId, setArcticId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPrefs = async () => {
      try {
        let email = null;

        // Check if session is stored in localStorage
        const storedSession = localStorage.getItem("appwrite_session");
        if (storedSession) {
          console.log("Using stored session");
          const userData = JSON.parse(storedSession);
          if (userData && userData.email) {
            email = userData.email;
          } else if (userData && userData.providerUid) {
            // Fallback to providerUid if email is not present
            email = userData.providerUid;
          }
        } else {
          // Fetch user from Appwrite if no local session
          const user = await account.get();
          console.log("Fetched user from Appwrite:", user);
          email = user.email;

          // Store session for faster access next time
          localStorage.setItem("appwrite_session", JSON.stringify(user));
        }

        if (!email) throw new Error("Email not found");

        // Query the database to find user by email
        const response = await db.listDocuments(mainDatabase, usersCollection, [
          Query.equal("email", email),
        ]);

        if (response.documents.length > 0) {
          const userDoc = response.documents[0];
          setArcticId(userDoc.arcticId || "Not Found");
        } else {
          setArcticId("Not Found");
        }
      } catch (error) {
        console.log("User not logged in or error fetching data:", error);
        router.push("/login");
      }
    };

    fetchUserPrefs();
  }, [router]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Do you really wanna log out?");
    if (confirmLogout) {
      try {
        await account.deleteSession("current");
        localStorage.removeItem("appwrite_session");
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <h1 id="Welcome-header">Welcome To Arctic Verse</h1>
        <h2 id="YourGamerTag">{arcticId || "Loading..."}</h2>
        <div className="SZBX1"></div>
        <AnimatedInput
          fullText="play.arcticverse.in"
          delay={50}
          typingSpeed={120}
        />
        <div className="SZBX2"></div>

        <h4 id="Social-links-title">Our social links:</h4>
        <div className="SZBX3"></div>
        <Link
          id="IG-link"
          className="links"
          href="https://www.instagram.com/arctic_verse"
        >
          Instagram <ArrowOutwardIcon sx={{ fontSize: 20, color: "#D700D3" }} />
        </Link>
        <Link id="DC-link" className="links" href="">
          Discord <ArrowOutwardIcon sx={{ fontSize: 20, color: "#7289DA" }} />
        </Link>
        <Link id="YT-link" className="links" href="">
          Youtube <ArrowOutwardIcon sx={{ fontSize: 20, color: "#FF0004" }} />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </main>
    </>
  );
}
