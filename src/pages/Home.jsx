import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import FavouriteSidebar from "../components/FavouriteSidebar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="flex min-h-screen">
        {/* LEFT – Favourite list */}
        <FavouriteSidebar />

        {/* RIGHT – Main content */}
        <main className="flex-1 p-6">
          <Featured />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Home;
