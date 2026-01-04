import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// We don't import the default CSS anymore to avoid conflicts with our custom styles
// import "react-tabs/style/react-tabs.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        if (found) {
          setProperty(found);
          const folder = found.id.replace("prop", "property-");
          setActiveImg(`/images/${folder}/thumbnail.png`);
        }
      });
  }, [id]);

  if (!property)
    return (
      <div className="flex justify-center items-center h-screen text-[#4E342E]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4E342E]"></div>
      </div>
    );

  const folder = property.id.replace("prop", "property-");

  // Generate Image List
  const images = [
    "thumbnail.png",
    "view-1.png",
    "view-2.png",
    "view-3.png",
    "view-4.png",
    "view-5.png",
  ].map((img) => `/images/${folder}/${img}`);

  // Safer Google Maps Embed URL
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    property.location
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HEADER & ACTIONS */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E1F1B] mb-2">
              {property.type}
            </h1>
            <p className="text-gray-500 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#6B4F3F]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {property.location}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                ></path>
              </svg>
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

      {/* 2. IMAGE GALLERY (Grid Layout) */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[500px] rounded-2xl overflow-hidden">
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
            <img
              src={activeImg}
              className="w-full h-full object-cover"
              alt="Main View"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>

          {/* Side Images */}
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className="hidden md:block relative group cursor-pointer"
              onClick={() => setActiveImg(img)}
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`view-${idx}`}
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Mobile-only scrollable thumbnails */}
        <div className="flex md:hidden gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onClick={() => setActiveImg(img)}
              className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 ${
                activeImg === img ? "border-2 border-[#4E342E]" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: DETAILS */}
        <div className="lg:col-span-2">
          {/* Quick Stats */}
          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block font-bold text-xl text-[#4E342E]">
                  {property.bedrooms}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Bedrooms
                </span>
              </div>
              <div className="text-center border-l pl-8">
                <span className="block font-bold text-xl text-[#4E342E]">
                  3
                </span>{" "}
                {/* Placeholder data */}
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Bathrooms
                </span>
              </div>
              <div className="text-center border-l pl-8">
                <span className="block font-bold text-xl text-[#4E342E]">
                  1,250
                </span>{" "}
                {/* Placeholder */}
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Sq Ft
                </span>
              </div>
            </div>
          </div>

          {/* Custom Tabs */}
          <Tabs selectedTabClassName="border-b-2 border-[#4E342E] text-[#4E342E]">
            <TabList className="flex gap-8 border-b border-gray-200 mb-8">
              <Tab className="pb-3 text-gray-500 font-medium cursor-pointer focus:outline-none hover:text-[#4E342E]">
                Overview
              </Tab>
              <Tab className="pb-3 text-gray-500 font-medium cursor-pointer focus:outline-none hover:text-[#4E342E]">
                Floor Plan
              </Tab>
              <Tab className="pb-3 text-gray-500 font-medium cursor-pointer focus:outline-none hover:text-[#4E342E]">
                Location
              </Tab>
            </TabList>

            {/* OVERVIEW PANEL */}
            <TabPanel>
              <h3 className="text-xl font-bold text-[#2E1F1B] mb-4">
                About this property
              </h3>
              <p className="text-gray-600 leading-7 whitespace-pre-line">
                {property.description.replace(/<br>/g, "\n")}
              </p>

              {/* Amenities Placeholder */}
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4">Amenities</h4>
                <div className="grid grid-cols-2 gap-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    ✅ Air Conditioning
                  </div>
                  <div className="flex items-center gap-2">
                    ✅ Swimming Pool
                  </div>
                  <div className="flex items-center gap-2">✅ Garden</div>
                  <div className="flex items-center gap-2">
                    ✅ 24/7 Security
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* FLOOR PLAN PANEL */}
            <TabPanel>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <img
                  src={`/images/${folder}/plan.png`}
                  alt="Floor plan"
                  className="w-full h-auto rounded-lg mix-blend-multiply"
                />
              </div>
            </TabPanel>

            {/* MAP PANEL */}
            <TabPanel>
              <div className="rounded-xl overflow-hidden shadow-inner h-[400px]">
                <iframe
                  title="Google Map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* RIGHT COLUMN: STICKY SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <span className="text-gray-500 text-sm font-medium">Price</span>
              <div className="text-3xl font-bold text-[#4E342E]">
                Rs. {property.price.toLocaleString()}
              </div>
            </div>

            {/* Agent Profile */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-[#FAF9F7] rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>{" "}
              {/* Avatar Placeholder */}
              <div>
                <p className="font-bold text-sm text-[#2E1F1B]">
                  PropertyLK Agent
                </p>
                <p className="text-xs text-gray-500">View Listings</p>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] text-sm"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] text-sm"
              />
              <textarea
                placeholder="Hello, I am interested in..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] text-sm h-24 resize-none"
              ></textarea>

              <button className="w-full py-3 bg-[#4E342E] text-white font-bold rounded-lg hover:bg-[#3E2b26] transition-colors shadow-lg shadow-[#4E342E]/20">
                Request Info
              </button>

              <button className="w-full py-3 border border-[#4E342E] text-[#4E342E] font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Call Agent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
