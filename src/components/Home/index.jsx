import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getAllMovies } from "../../api/axios";
import {
  moviesAtom,
  currentPageAtom,
  paginatedMoviesAtom,
  totalPagesAtom,
} from "../../atoms/movies.atoms";
import Filter from "./Filter/index";
import Loading from "../Loading";

// Responsive CardMovie component
function CardMovie({ movie }) {
  const imageUrl = movie?.primaryImage?.url || "https://placehold.co/300x450";
  const title = movie?.primaryTitle || "Título Indisponível";
  const genres = movie?.genres || [];

  return (
    <a href={`/movieDetails?id=${movie.id}`} className="block h-full">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="group relative h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]  bg-[length:120%_120%] bg-center transition-all duration-300 hover:bg-[length:100%_100%] rounded-xl overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

        <div className="absolute bg-[#000000a8] -bottom-full group-hover:bottom-0 right-0 left-0 transition-all duration-300 ease-in-out p-3 sm:p-4">
          <div className="flex min-h-[40px] sm:min-h-[50px] justify-center items-center">
            <label className="font-bold text-sm sm:text-lg text-center text-white first-letter:text-orange-400 first-letter:text-lg sm:first-letter:text-xl line-clamp-2">
              {title}
            </label>
          </div>

          {genres && genres.length > 0 && (
            <div className="mt-2 sm:mt-3">
              <div className="text-center text-xs sm:text-sm text-gray-300">
                {genres.length <= 1 ? "Gênero" : "Gêneros"}
              </div>
              <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-1 sm:mt-2 p-1 sm:p-2">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className="font-bold bg-gradient-to-l from-orange-400 to-orange-500 rounded-md text-center text-xs sm:text-sm text-white py-0.5 sm:py-1"
                  >
                    {genre}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

// Main Component
export default function Index() {
  const [movies, setMovies] = useAtom(moviesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [paginatedMovies] = useAtom(paginatedMoviesAtom);
  const [totalPages] = useAtom(totalPagesAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  useEffect(() => {
    const handleListMovies = async () => {
      try {
        setIsLoading(true);
        const { titles } = await getAllMovies();
        setMovies(titles);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleListMovies();
  }, [setMovies]);

  const handlePageChange = async (pageAction) => {
    setIsPaginating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      pageAction();
    } finally {
      setIsPaginating(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    handlePageChange(() => setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    handlePageChange(() => setCurrentPage(currentPage - 1));
  };

  const handlePageClick = (pageNumber) => {
    handlePageChange(() => setCurrentPage(pageNumber));
  };

  return (
    <div className="min-h-screen">
      {/* Loading durante carregamento inicial */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10 sm:py-20">
          <Loading />
        </div>
      ) : (
        <>
          <div className="text-center py-4 sm:py-5 text-lg sm:text-xl font-bold first-letter:text-orange-400 first-letter:text-xl sm:first-letter:text-2xl tracking-wide px-4">
            Lista de filmes ({movies.length})
          </div>

          <Filter />

          {/* Container principal */}
          <div className="min-h-[50vh] sm:min-h-[60vh] px-4 sm:px-6">
            {/* Loading durante paginação */}
            {isPaginating ? (
              <div className="flex justify-center items-center py-8 sm:py-10">
                <Loading />
              </div>
            ) : (
              <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 py-4 sm:py-6">
                {paginatedMovies.length === 0 ? (
                  <div className="col-span-full text-center py-8 sm:py-10 text-sm sm:text-base">
                    Nenhum filme encontrado
                  </div>
                ) : (
                  paginatedMovies.map((movie) => (
                    <li key={movie.id} className="h-full">
                      <CardMovie movie={movie} />
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          {/* Paginação responsiva */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-5 pb-8 sm:pb-10 px-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isPaginating}
              className={`${
                currentPage <= 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-400 hover:opacity-100 cursor-pointer"
              } p-1 sm:p-2 max-sm:p-3 rounded-lg font-bold opacity-50 transition-opacity ease-in-out disabled:opacity-30 text-xs sm:text-base`}
            >
              {"<"}
            </button>

            <div className="flex flex-wrap justify-center gap-1 max-sm:gap-3 sm:gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  disabled={isPaginating}
                  className={`${
                    currentPage === i + 1
                      ? "bg-blue-400 font-bold text-white"
                      : "text-orange-400"
                  } flex max-sm:p-3 w-5 h-5 sm:w-6 sm:h-6 justify-center items-center rounded-lg disabled:opacity-30 text-xs sm:text-sm`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 5 && (
                <span className="flex items-center px-1 text-orange-400">
                  ...
                </span>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isPaginating}
              className={`${
                currentPage >= totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-400 hover:opacity-100 cursor-pointer"
              } p-1 sm:p-2 max-sm:p-3 rounded-lg font-bold opacity-50 transition-opacity ease-in-out disabled:opacity-30 text-xs sm:text-base`}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
