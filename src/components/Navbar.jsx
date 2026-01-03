import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#6B4F3F]">
          <img src={assets.Logo} className="inline w-[180px]" alt="" />
          property<span className="text-[#4E342E] ">LK</span>
        </h1>

        <ul className="flex gap-6 text-[#2E2E2E] font-medium">
          <li className="hover:text-[#6B4F3F] cursor-pointer">Buy</li>
          <li className="hover:text-[#6B4F3F] cursor-pointer">Rent</li>
          <li className="hover:text-[#6B4F3F] cursor-pointer">Sell</li>
          <li className="hover:text-[#6B4F3F] cursor-pointer">Agents</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
