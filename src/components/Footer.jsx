import React from "react";
import { assets } from "../assets/assets";
// Make sure to import generic icons (e.g. from react-icons or your assets) if you have them.
// I will use simple SVG icons here for Social Media.

const Footer = () => {
  return (
    <footer className="bg-[#2E1F1B] text-white mt-20 border-t border-[#4E342E]">
      {/* Top Section: Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* COL 1: Brand & About */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            {/* If you have a white version of the logo, use it here. Otherwise text is fine. */}
            {/* <img src={assets.LogoWhite} alt="propertyLK" className="w-10" /> */}
            <h2 className="text-2xl font-bold tracking-tight">
              property<span className="text-[#E6CBA8]">LK</span>
            </h2>
          </div>
          <p className="text-[#D7CCC8] text-sm leading-relaxed mb-6">
            Sri Lanka’s most trusted digital marketplace for real estate. We
            connect buyers, sellers, and agents in a seamless, transparent
            ecosystem.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-[#4E342E] flex items-center justify-center hover:bg-[#E6CBA8] hover:text-[#2E1F1B] transition-all duration-300"
              >
                <span className="sr-only">{social}</span>
                {/* Simple dot for demo - replace with real icons */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.3-.6 1.1-1.1 2-1.1 1.66 0 3 1.34 3 3v3z" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* COL 2: Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-[#E6CBA8]">Discover</h4>
          <ul className="space-y-3 text-sm text-[#D7CCC8]">
            {[
              "Properties for Sale",
              "Properties for Rent",
              "Land for Sale",
              "Commercial Real Estate",
              "New Projects",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 3: Company */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-[#E6CBA8]">Company</h4>
          <ul className="space-y-3 text-sm text-[#D7CCC8]">
            {[
              "About Us",
              "Careers",
              "Contact Support",
              "Terms of Service",
              "Privacy Policy",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4: Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-[#E6CBA8]">
            Stay Updated
          </h4>
          <p className="text-sm text-[#D7CCC8] mb-4">
            Get the latest property listings and market news delivered to your
            inbox.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#4E342E] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] placeholder-[#8D6E63] text-sm"
            />
            <button className="bg-[#E6CBA8] text-[#2E1F1B] px-4 py-3 rounded-lg font-bold hover:bg-white transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="border-t border-[#4E342E] bg-[#271a17]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8D6E63]">
            © {new Date().getFullYear()} PropertyLK Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#8D6E63]">
            <a href="#" className="hover:text-[#E6CBA8] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#E6CBA8] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#E6CBA8] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
