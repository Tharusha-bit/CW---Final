import { render, screen } from "@testing-library/react";
import FavouriteSidebar from "../components/FavouriteSidebar";
import { FavouritesProvider } from "../context/FavouritesContext";

test("FavouriteSidebar shows empty message initially", () => {
  render(
    <FavouritesProvider>
      <FavouriteSidebar />
    </FavouritesProvider>
  );

  expect(screen.getByText(/Drag properties here/i)).toBeInTheDocument();
});
