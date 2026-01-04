import React, { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";

const FavouriteSidebar = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  const [isOverSidebar, setIsOverSidebar] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);

  return (
    <aside
      className={`w-80 h-screen sticky top-0 flex flex-col border-r transition-colors duration-300
        ${
          isOverSidebar
            ? "bg-[#fdfbf7] ring-2 ring-inset ring-[#6B4F3F]"
            : "bg-white"
        }`}
      style={{ paddingTop: "100px" }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOverSidebar(true);
      }}
      onDragLeave={() => setIsOverSidebar(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOverSidebar(false);

        const data = e.dataTransfer.getData("application/json");
        if (!data) return;

        try {
          const property = JSON.parse(data);

          // ✅ ONLY add valid full property objects
          if (property?.id && property?.type && property?.location) {
            addFavourite(property);
          }
        } catch {
          // Ignore invalid drag payloads
        }
      }}
    >
      {/* HEADER */}
      <div className="px-6 pb-4 border-b flex justify-between items-end">
        <div>
          <h3 className="font-bold text-xl text-[#4E342E]">Saved</h3>
          <p className="text-xs text-gray-500">
            {favourites.length}{" "}
            {favourites.length === 1 ? "Property" : "Properties"}
          </p>
        </div>

        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="text-xs font-semibold text-gray-400 hover:text-red-600 uppercase"
          >
            Clear All
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {favourites.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <p className="text-sm font-medium">No favourites yet</p>
            <p className="text-xs">Drag properties here</p>
          </div>
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
            className="group bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex gap-3 items-center cursor-grab active:cursor-grabbing"
          >
            {/* ICON */}
            <div className="w-12 h-12 rounded-lg bg-[#FAF9F7] flex items-center justify-center text-[#6B4F3F]">
              {p?.type?.toLowerCase()?.includes("land") ? "🌱" : "🏠"}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate">
                {p.type ?? "Property"}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {p.location ?? "Unknown location"}
              </p>
              {p.price && (
                <p className="text-xs font-semibold text-[#6B4F3F]">
                  Rs. {Number(p.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFavourite(p.id)}
              className="text-gray-400 hover:text-red-600 transition"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* TRASH DROP ZONE */}
      {favourites.length > 0 && (
        <div
          className={`p-4 border-t transition-colors ${
            isOverTrash ? "bg-red-50 border-red-300" : "bg-gray-50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsOverTrash(true);
          }}
          onDragLeave={() => setIsOverTrash(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsOverTrash(false);

            const data = e.dataTransfer.getData("application/json");
            if (!data) return;

            try {
              const { id } = JSON.parse(data);
              if (id) removeFavourite(id);
            } catch {}
          }}
        >
          <div
            className={`border-2 border-dashed rounded-lg h-16 flex items-center justify-center text-sm font-medium transition-all ${
              isOverTrash
                ? "border-red-500 text-red-600 bg-red-100"
                : "border-gray-300 text-gray-400"
            }`}
          >
            🗑 Drop here to remove
          </div>
        </div>
      )}
    </aside>
  );
};

export default FavouriteSidebar;
