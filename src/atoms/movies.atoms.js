import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const moviesAtom = atom([]); // filmes originais
export const favoritesMoviesAtom = atomWithStorage("favorited_movies", []);
export const searchTermAtom = atom("");

export const filteredMoviesAtom = atom((get) => {
  const allMovies = get(moviesAtom);
  const searchTerm = get(searchTermAtom).toLowerCase().trim();

  if (!searchTerm) return allMovies;

  const filter = allMovies.filter((movie) =>
    movie.primaryTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filter;
});

export const currentPageAtom = atom(1);

const itemsPerPage = 15;

export const paginatedMoviesAtom = atom((get) => {
  const filteredMovies = get(filteredMoviesAtom);
  const currentPage = get(currentPageAtom);
  const start = (currentPage - 1) * itemsPerPage;

  return filteredMovies.slice(start, start + itemsPerPage);
});

export const totalPagesAtom = atom((get) => {
  const filteredMovies = get(filteredMoviesAtom);
  return Math.ceil(filteredMovies.length / itemsPerPage);
});
