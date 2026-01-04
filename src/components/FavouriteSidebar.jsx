import React, { useState } from "react";
import { useFavourites } from "../context/FavouritesContext";

const FavouriteSidebar = () => {
  const { favourites, addFavourite, removeFavourite, clearFavourites } =
    useFavourites();

  // State to manage visual drag feedback
  const [isOverSidebar, setIsOverSidebar] = useState(false);
  const [isOverTrash, setIsOverTrash] = useState(false);

  return (
    <aside
      className={`w-80 h-screen sticky top-0 flex flex-col transition-colors duration-300 border-r border-gray-200 z-40
        ${
          isOverSidebar
            ? "bg-[#fdfbf7] ring-inset ring-2 ring-[#6B4F3F]"
            : "bg-white"
        }
      `}
      // Adjust pt-24 if your navbar is fixed, so this sits below it
      style={{ paddingTop: "100px" }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsOverSidebar(true);
      }}
      onDragLeave={() => setIsOverSidebar(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOverSidebar(false);

        // ADD TO FAVOURITES LOGIC
        const data = e.dataTransfer.getData("application/json");
        if (!data) return;
        try {
          const parsed = JSON.parse(data);
          if (parsed.id && parsed.type) {
            addFavourite(parsed);
          }
        } catch (err) {
          console.error("Invalid Drag Data", err);
        }
      }}
    >
      {/* HEADER */}
      <div className="px-6 pb-4 border-b border-gray-100 flex justify-between items-end">
        <div>
          <h3 className="font-bold text-xl text-[#4E342E]">Saved</h3>
          <p className="text-xs text-gray-500 font-medium">
            {favourites.length}{" "}
            {favourites.length === 1 ? "Property" : "Properties"}
          </p>
        </div>

        {favourites.length > 0 && (
          <button
            onClick={clearFavourites}
            className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-wide"
          >
            Clear All
          </button>
        )}
      </div>

      {/* FAVOURITE ITEMS LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-200">
        {/* EMPTY STATE */}
        {favourites.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <svg
              className="w-12 h-12 text-[#6B4F3F] mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-800">
              No favourites yet
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Drag properties here to shortlist them.
            </p>
          </div>
        )}

        {/* CARDS */}
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
            className="group relative bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-[#E6CBA8] transition-all cursor-grab active:cursor-grabbing flex gap-3 items-center"
          >
            {/* Icon Placeholder (since we might not have an image) */}
            <div className="w-12 h-12 rounded-lg bg-[#FAF9F7] flex items-center justify-center text-[#6B4F3F]">
              {/* Simple logic to show icon based on type */}
              {p.type.toLowerCase().includes("land") ? (
                <span className="text-lg">🌱</span>
              ) : (
                <span className="text-lg">🏠</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 truncate capitalize">
                {p.type}
              </h4>
              <p className="text-xs text-gray-500 truncate">{p.location}</p>
              {/* If you have price, render it here */}
              {p.price && (
                <p className="text-xs font-semibold text-[#6B4F3F] mt-0.5">
                  {p.price}
                </p>
              )}
            </div>

            {/* Drag Handle Icon */}
            <div className="text-gray-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* DROP ZONE FOR REMOVAL */}
      {/* Only shows/activates if there are items */}
      {favourites.length > 0 && (
        <div
          className={`p-4 border-t transition-colors duration-300 ${
            isOverTrash
              ? "bg-red-50 border-red-200"
              : "bg-gray-50 border-gray-200"
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
            const { id } = JSON.parse(data);
            removeFavourite(id);
          }}
        >
          <div
            className={`border-2 border-dashed rounded-lg h-16 flex items-center justify-center gap-2 transition-all ${
              isOverTrash
                ? "border-red-400 text-red-600 bg-red-100/50 scale-105"
                : "border-gray-300 text-gray-400"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            <span className="text-sm font-medium">
              {isOverTrash ? "Drop to Remove" : "Drag here to remove"}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default FavouriteSidebar;
