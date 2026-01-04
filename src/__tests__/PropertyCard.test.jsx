import { render, screen } from "@testing-library/react";
import PropertyCard from "../components/PropertyCard";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "../context/FavouritesContext";

const mockProperty = {
  id: "prop1",
  type: "House",
  bedrooms: 3,
  price: 750000,
  location: "Orpington BR5",
  picture: "images/property-1/thumbnail.png",
};

test("PropertyCard displays property data", () => {
  render(
    <BrowserRouter>
      <FavouritesProvider>
        <PropertyCard property={mockProperty} />
      </FavouritesProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/House/i)).toBeInTheDocument();
  expect(screen.getByText(/750,000/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Orpington/i).length).toBeGreaterThan(0);
});
