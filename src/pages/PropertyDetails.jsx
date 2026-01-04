import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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

        const folder = found.id.replace("prop", "property-");
        setMainImage(`/images/${folder}/thumbnail.png`);
      });
  }, [id]);

  if (!property) return <p className="p-6">Loading...</p>;

  const folder = property.id.replace("prop", "property-");

  const images = [
    "thumbnail.png",
    "view-1.png",
    "view-2.png",
    "view-3.png",
    "view-4.png",
    "view-5.png",
  ].map((img) => `/images/${folder}/${img}`);

  // Google Maps embed URL (location from JSON)
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    property.location
  )}&output=embed`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* MAIN IMAGE */}
      <img
        src={mainImage}
        className="w-full h-[450px] object-cover rounded-lg mb-6"
      />

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

      {/* BASIC INFO */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-[#4E342E]">{property.type}</h2>
        <p className="text-lg font-semibold">
          Rs. {property.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-700">{property.location}</p>
      </div>

      {/* TABS SECTION */}
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* OVERVIEW */}
        <TabPanel>
          <p className="mt-4 text-gray-800 leading-relaxed">
            {property.description.replace(/<br>/g, "")}
          </p>
        </TabPanel>

        {/* FLOOR PLAN */}
        <TabPanel>
          <img
            src={`/images/${folder}/plan.png`}
            alt="Floor plan"
            className="mt-4 max-w-full rounded-lg border"
          />
        </TabPanel>

        {/* GOOGLE MAP */}
        <TabPanel>
          <div className="mt-4 w-full h-[450px]">
            <iframe
              title="Google Map"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
