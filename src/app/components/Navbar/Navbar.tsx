'use client'
import { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav id="Navbar" className="flex justify-between items-center p-4 bg-transparent">
        <Image id="web-logo" src="/Arctic_transparent_logo.png" alt="alt" width={59} height={59} />
        <MenuIcon id="menu-icon" fontSize="large" className="cursor-pointer z-50" onClick={() => setIsOpen(true)} />
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-[250px] bg-white shadow-lg transition-transform duration-300 z-[1000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-end">
          <CloseIcon className="cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        {/* Sidebar Content */}
        <ul className="text-black text-lg font-bold p-6 space-y-4">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Overlay (Dimming Background) */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-40 z-[999]" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
