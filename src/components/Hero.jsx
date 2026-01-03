import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="bg-[#FAF9F7]">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#4E342E] mb-6">
          Find your perfect property in Sri Lanka
        </h2>

        <p className="text-lg text-[#6B4F3F] mb-10">
          Search houses, apartments and lands with ease
        </p>

        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
