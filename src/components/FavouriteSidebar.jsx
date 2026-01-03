import React from "react";
import { useFavourites } from "../context/FavouritesContext";

const FavouriteSidebar = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  return (
    <aside
      className="w-64 bg-[#FAF9F7] border-r p-4 sticky top-0 h-screen flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        // ADD TO FAVOURITES
        const data = e.dataTransfer.getData("application/json");
        if (!data) return;

        const parsed = JSON.parse(data);

        // If full property object → add
        if (parsed.id && parsed.type) {
          addFavourite(parsed);
        }
      }}
    >
      <h3 className="font-bold text-lg text-[#4E342E] mb-2">❤️ Favourites</h3>

      {favourites.length > 0 && (
        <button
          onClick={clearFavourites}
          className="text-xs text-red-700 underline mb-3 text-left"
        >
          Clear all favourites
        </button>
      )}

      {/* FAVOURITE ITEMS */}
      <div className="flex-1 overflow-y-auto">
        {favourites.length === 0 && (
          <p className="text-sm text-gray-500">Drag properties here</p>
        )}

        {favourites.map((p) => (
          <div
            key={p.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData(
                "application/json",
                JSON.stringify({ id: p.id })
              );
            }}
            className="bg-white rounded-lg p-2 mb-3 shadow-sm cursor-move"
          >
            <p className="text-sm font-semibold">{p.type}</p>
            <p className="text-xs">{p.location}</p>

            <button
              onClick={() => removeFavourite(p.id)}
              className="text-xs text-red-600 mt-1"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* REMOVE ZONE */}
      {favourites.length > 0 && (
        <div
          className="mt-4 border-2 border-dashed border-red-400 rounded-lg p-3 text-center text-red-600"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();

            const data = e.dataTransfer.getData("application/json");
            if (!data) return;

            const { id } = JSON.parse(data);

            // ✅ CORRECT removal
            removeFavourite(id);
          }}
        >
          🗑 Drag here to remove
        </div>
      )}
    </aside>
  );
};

export default FavouriteSidebar;
