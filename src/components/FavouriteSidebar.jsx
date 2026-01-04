import React, { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";

const FavouriteSidebar = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  const [isOverSidebar, setIsOverSidebar] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);

  return (
    <aside
      className={`
        fixed md:sticky
        bottom-0 md:top-0
        w-full md:w-80
        h-28 md:h-screen
        flex md:flex-col
        border-t md:border-t-0 md:border-r
        bg-white
        transition-colors duration-300
        z-40
        ${isOverSidebar ? "bg-[#fdfbf7]" : ""}
      `}
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
          if (property?.id && property?.type && property?.location) {
            addFavourite(property);
          }
        } catch {}
      }}
    >
      {/* HEADER */}
      <div className="px-4 py-2 md:px-6 md:py-4 border-b md:border-b flex justify-between items-center">
        <div>
          <h3 className="font-bold text-[#4E342E] text-sm md:text-xl">Saved</h3>
          <p className="text-[10px] md:text-xs text-gray-500">
            {favourites.length}{" "}
            {favourites.length === 1 ? "Property" : "Properties"}
          </p>
        </div>

        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="text-[10px] md:text-xs font-semibold text-gray-400 hover:text-red-600 uppercase"
          >
            Clear
          </button>
        )}
      </div>

      {/* LIST */}
      <div
        className={`
          flex-1
          overflow-x-auto md:overflow-y-auto
          flex md:flex-col
          gap-3
          p-3
        `}
      >
        {favourites.length === 0 && (
          <div className="flex items-center justify-center w-full opacity-50 text-xs">
            Drag properties here
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
            className={`
              min-w-[220px] md:min-w-0
              bg-white border rounded-xl p-3
              shadow-sm hover:shadow-md
              flex gap-3 items-center
              cursor-grab active:cursor-grabbing
            `}
          >
            {/* ICON */}
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F7] flex items-center justify-center">
              {p?.type?.toLowerCase()?.includes("land") ? "🌱" : "🏠"}
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold truncate">
                {p.type ?? "Property"}
              </h4>
              <p className="text-[10px] text-gray-500 truncate">
                {p.location ?? "Unknown"}
              </p>
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFavourite(p.id)}
              className="text-gray-400 hover:text-red-600 text-sm"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* TRASH DROP ZONE (desktop only) */}
      {favourites.length > 0 && (
        <div
          className="hidden md:block p-4 border-t"
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
