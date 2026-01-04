import { renderHook, act } from "@testing-library/react";
import {
  FavouritesProvider,
  useFavourites,
} from "../context/FavouritesContext";

test("addFavourite adds a property", () => {
  const wrapper = ({ children }) => (
    <FavouritesProvider>{children}</FavouritesProvider>
  );

  const { result } = renderHook(() => useFavourites(), { wrapper });

  act(() => {
    result.current.addFavourite({ id: "prop1", type: "House" });
  });

  expect(result.current.favourites.length).toBe(1);
});

test("removeFavourite removes property correctly", () => {
  const wrapper = ({ children }) => (
    <FavouritesProvider>{children}</FavouritesProvider>
  );

  const { result } = renderHook(() => useFavourites(), { wrapper });

  act(() => {
    result.current.addFavourite({ id: "prop1" });
    result.current.removeFavourite("prop1");
  });

  expect(result.current.favourites.length).toBe(0);
});
