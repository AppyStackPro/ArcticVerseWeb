'use client'
import "./scss/main.scss";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";
import RegisterBtn from "./components/registerbtn/RegisterBtn";
import LoginBtn from "./components/loginbtn/LoginBtn";
import AnimatedInput from "./components/Animated/AnimatedInput";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 id="Welcome-header">Welcome To Arctic verse</h1>
        <h4 id="Login-Text">Please Login to have more fun :)</h4>
        <section id="Login-register-section">
          <RegisterBtn />
          <LoginBtn />
        </section>
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
      </main>
    </>
  );
}
