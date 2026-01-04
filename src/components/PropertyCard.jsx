import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const isFav = favourites.some((p) => p.id === property.id);

  // Toggle Logic
  const handleToggleFav = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (isFav) {
      removeFavourite(property.id);
    } else {
      addFavourite(property);
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        // Add a "ghost" image or effect if needed
        e.dataTransfer.effectAllowed = "copyMove";
        e.dataTransfer.setData("application/json", JSON.stringify(property));
      }}
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#E6CBA8] transition-all duration-300 cursor-grab active:cursor-grabbing overflow-hidden"
    >
      {/* 1. IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={`/${property.picture}`}
          alt={property.type}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Gradient (for text readability if you add text over image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge (e.g. For Rent / For Sale) */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-[#4E342E] uppercase tracking-wider">
            {property.type}
          </span>
        </div>

        {/* Floating Favourite Heart Button */}
        <button
          onClick={handleToggleFav}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-all shadow-sm group-hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-colors duration-300 ${
              isFav
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-gray-600 hover:text-red-500"
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="p-5">
        {/* Price & Title */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-[#4E342E]">
            Rs. {property.price.toLocaleString()}
          </p>
          <h3 className="text-gray-800 font-medium truncate mt-1">
            {property.location}{" "}
            {/* Using location as title if no specific title exists */}
          </h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
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

        {/* Features Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Features Row (Beds / Area) */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 p-1.5 rounded-md">🛏️</span>
            <span>{property.bedrooms} Beds</span>
          </div>
          {/* If you have Bathrooms or Sqft data, add them here similarly */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 p-1.5 rounded-md">📐</span>
            <span>1,200 sqft</span> {/* Placeholder if data missing */}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/property/${property.id}`)}
          className="w-full py-3 rounded-xl border border-[#4E342E] text-[#4E342E] font-semibold hover:bg-[#4E342E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          View Details
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
