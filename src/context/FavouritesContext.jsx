import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return ctx;
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (property) => {
    setFavourites((prev) =>
      prev.some((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        clearFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
