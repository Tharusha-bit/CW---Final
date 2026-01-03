import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found);
        setMainImage(
          `/images/${found.id.replace("prop", "property-")}/thumbnail.png`
        );
      });
  }, [id]);

  if (!property) return <p className="p-6">Loading...</p>;

  // Build image list (thumbnail + view-1 to view-5)
  const imageBase = `/images/${property.id.replace("prop", "property-")}`;
  const images = [
    "thumbnail.png",
    "view-1.png",
    "view-2.png",
    "view-3.png",
    "view-4.png",
    "view-5.png",
  ].map((img) => `${imageBase}/${img}`);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* MAIN IMAGE */}
      <div className="mb-6">
        <img
          src={mainImage}
          className="w-full h-[450px] object-cover rounded-lg"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 mb-10">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setMainImage(img)}
            className="w-24 h-20 object-cover rounded cursor-pointer border hover:border-[#4E342E]"
          />
        ))}
      </div>

      {/* PROPERTY INFO */}
      <div className="bg-[#FAF9F7] p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-[#4E342E] mb-2">
          {property.type}
        </h2>

        <p className="text-lg font-semibold mb-2">
          Rs. {property.price.toLocaleString()}
        </p>

        <p className="text-sm text-gray-700 mb-4">{property.location}</p>

        <p className="text-gray-800">
          {property.description.replace(/<br>/g, "")}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
