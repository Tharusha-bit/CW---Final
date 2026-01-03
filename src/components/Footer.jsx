import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4E342E] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-lg">propertyLK</h4>
          <p className="text-sm mt-2 text-[#D7CCC8]">
            Sri Lanka’s modern property platform
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-[#D7CCC8]">
            <li>Buy</li>
            <li>Rent</li>
            <li>Sell</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm text-[#D7CCC8]">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
