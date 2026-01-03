import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Adds a shadow/background effect only when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Assuming Logo is an icon/image, adjusted size for balance */}
          <img
            src={assets.Logo}
            className="w-10 h-10 object-contain"
            alt="Logo"
          />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            property<span className="text-[#6B4F3F]">LK</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-[#caa472] font-medium">
          {["Buy", "Rent", "Sell", "Agents"].map((item) => (
            <li key={item} className="group relative cursor-pointer">
              <span className="hover:text-[#6B4F3F] transition-colors">
                {item}
              </span>
              {/* Animated Underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6B4F3F] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-[#caa472] hover:text-[#6B4F3F] font-medium transition-colors">
            Log in
          </button>
          <button className="bg-[#6B4F3F] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#5a4235] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
