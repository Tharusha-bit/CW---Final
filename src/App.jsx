import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavouritesProvider } from "./context/FavouritesContext";
import Home from "./pages/Home";
import Result from "./pages/Result";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/:postcode" element={<Result />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}

export default App;
