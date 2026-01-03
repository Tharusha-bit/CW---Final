import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  const { postcode } = useParams();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    afterDate: "",
  });

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const matched = data.properties.filter((p) => {
          const propertyPostcode = p.location
            .trim()
            .split(" ")
            .pop()
            .toUpperCase();

          return propertyPostcode === postcode.toUpperCase();
        });

        setProperties(matched);
      });
  }, [postcode]);

  const filtered = properties.filter((p) => {
    if (filters.type !== "any" && p.type !== filters.type) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minBeds && p.bedrooms < filters.minBeds) return false;
    if (filters.maxBeds && p.bedrooms > filters.maxBeds) return false;

    if (filters.afterDate) {
      const added = new Date(`${p.added.year}-${p.added.month}-${p.added.day}`);
      if (added < new Date(filters.afterDate)) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-[#4E342E] mb-6">
        Properties in {postcode}
      </h2>

      {/* FILTER BAR */}
      <div className="grid md:grid-cols-6 gap-4 mb-8 bg-[#FAF9F7] p-4 rounded-lg">
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="any">Any Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Apartment">Apartment</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />

        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />

        <input
          type="number"
          placeholder="Min Beds"
          onChange={(e) => setFilters({ ...filters, minBeds: e.target.value })}
        />

        <input
          type="number"
          placeholder="Max Beds"
          onChange={(e) => setFilters({ ...filters, maxBeds: e.target.value })}
        />

        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, afterDate: e.target.value })
          }
        />
      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded-lg overflow-hidden">
            <img src={`/${p.picture}`} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h4 className="font-semibold">
                {p.type} · {p.bedrooms} Beds
              </h4>
              <p className="text-sm">{p.location}</p>
              <p className="font-bold mt-2">Rs. {p.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
