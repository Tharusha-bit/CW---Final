import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavourites();

  const isFav = favourites.some((p) => p.id === property.id);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(property));
      }}
      className="border rounded-lg overflow-hidden cursor-move"
    >
      <img src={`/${property.picture}`} className="h-48 w-full object-cover" />

      <div className="p-4">
        <h4 className="font-semibold">
          {property.type} · {property.bedrooms} Beds
        </h4>

        <p className="text-sm">{property.location}</p>

        <p className="font-bold mt-2">Rs. {property.price.toLocaleString()}</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => navigate(`/property/${property.id}`)}
            className="flex-1 bg-[#4E342E] text-white py-2 rounded-lg text-sm"
          >
            View Property
          </button>

          <button
            onClick={() =>
              isFav ? removeFavourite(property.id) : addFavourite(property)
            }
            className={`flex-1 py-2 rounded-lg text-sm ${
              isFav ? "bg-red-100 text-red-700" : "bg-[#6B4F3F] text-white"
            }`}
          >
            {isFav ? "Remove Favourite" : "Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
