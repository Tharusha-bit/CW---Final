import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard"; // Importing the professional card we designed

const Result = () => {
  const { postcode } = useParams();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for filters
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    afterDate: "",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        // Normalizing postcode for better matching
        const searchCode = postcode.replace(/\s/g, "").toUpperCase();

        const matched = data.properties.filter((p) => {
          // Extract postcode from location string (simple logic)
          // Adjust this logic based on your actual data structure
          const pLocation = p.location.replace(/\s/g, "").toUpperCase();
          return pLocation.includes(searchCode);
        });

        setProperties(matched);
        setIsLoading(false);
      });
  }, [postcode]);

  // Filtering Logic
  const filtered = properties.filter((p) => {
    if (filters.type !== "any" && p.type !== filters.type) return false;
    if (filters.minPrice && p.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice)) return false;
    if (filters.minBeds && p.bedrooms < parseInt(filters.minBeds)) return false;
    if (filters.maxBeds && p.bedrooms > parseInt(filters.maxBeds)) return false;

    if (filters.afterDate) {
      const added = new Date(`${p.added.year}-${p.added.month}-${p.added.day}`);
      if (added < new Date(filters.afterDate)) return false;
    }

    return true;
  });

  // Helper for input styles
  const inputStyle =
    "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] focus:border-transparent transition-all";

  return (
    <div className="bg-[#FAF9F7] min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="bg-[#4E342E] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Properties for sale in{" "}
            <span className="text-[#E6CBA8]">{postcode}</span>
          </h2>
          <p className="text-gray-300">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}{" "}
            found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 2. FILTER BAR (Sticky on Desktop) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-10 sticky top-24 z-30">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Type Filter */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Property Type
              </label>
              <select
                className={inputStyle}
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="any">Any Type</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Min Price
              </label>
              <input
                type="number"
                placeholder="Min Price"
                className={inputStyle}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Max Price"
                className={inputStyle}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
              />
            </div>

            {/* Bedroom Range */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Min Beds
              </label>
              <input
                type="number"
                placeholder="Any"
                className={inputStyle}
                onChange={(e) =>
                  setFilters({ ...filters, minBeds: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Max Beds
              </label>
              <input
                type="number"
                placeholder="Any"
                className={inputStyle}
                onChange={(e) =>
                  setFilters({ ...filters, maxBeds: e.target.value })
                }
              />
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                Added After
              </label>
              <input
                type="date"
                className={inputStyle}
                onChange={(e) =>
                  setFilters({ ...filters, afterDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* 3. RESULTS GRID */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4E342E]"></div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              // Reusing the professional PropertyCard component
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-gray-800">
              No properties found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your price range or filters.
            </p>
            <button
              onClick={() =>
                setFilters({
                  type: "any",
                  minPrice: "",
                  maxPrice: "",
                  minBeds: "",
                  maxBeds: "",
                  afterDate: "",
                })
              }
              className="mt-6 text-[#4E342E] font-bold underline hover:text-[#6B4F3F]"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
