import React from "react";
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

const Featured = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => setProperties(data.properties))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-[#4E342E] mb-10">
          Featured Properties
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
