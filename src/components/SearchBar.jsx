import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [postcodes, setPostcodes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const codes = data.properties.map((p) => p.location.split(" ").pop());
        setPostcodes([...new Set(codes)]);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      postcodes.filter((code) =>
        code.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  }, [query, postcodes]);

  const handleSelect = (postcode) => {
    navigate(`/results/${postcode}`);
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Enter postcode (e.g. BR6, IG1)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-[#D7CCC8] px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#6B4F3F]"
      />

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded-lg shadow mt-1">
          {suggestions.map((code) => (
            <li
              key={code}
              onClick={() => handleSelect(code)}
              className="px-4 py-2 cursor-pointer hover:bg-[#FAF9F7]"
            >
              {code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
