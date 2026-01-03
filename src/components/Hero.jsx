import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    // 1. Background: Linear Gradient using your brand colors
    // pt-32 adds padding to top so the text doesn't hide behind the navbar
    <section className="relative bg-gradient-to-br from-[#4E342E] via-[#5D4037] to-[#6B4F3F] pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* 2. Decorative Elements (Optional) */}
      {/* These subtle glowing circles make the brown background look modern and less "flat" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* 3. Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Small Tagline */}
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-gray-100">
            The #1 Property Portal in Sri Lanka
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find your perfect <span className="text-[#E6CBA8]">property</span>{" "}
          <br />
          with zero hassle.
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
          Search thousands of houses, apartments, and lands across the island.
        </p>

        {/* 4. Search Bar Container */}
        {/* The white box creates a strong focal point against the brown background */}
        <div className="bg-white p-2 rounded-xl shadow-2xl shadow-[#2b1d19]/30 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default Hero;
