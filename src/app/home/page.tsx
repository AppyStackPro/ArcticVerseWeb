"use client";
import "./../scss/main.scss";
import Link from "next/link";
import Navbar from "./../components/Navbar/Navbar";
import AnimatedInput from "./../components/Animated/AnimatedInput";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export default function Home() {
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
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Do you really wanna log out?");
        if (confirmLogout) {
            try {
                await auth.signOut();
                router.push("/login");
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isLoggedIn) {
        return null; // Should not reach here if auth check is correct
    }

    return (
        <>
            <Navbar />
            <main>
                <h1 id="Welcome-header">Welcome To Arctic Verse</h1>
                <h2 id="YourGamerTag">Yay! You are logged in!</h2>
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