import { useEffect, useState } from "react";
import { useLocation } from "../../hooks/usePage";
import { getMovieById } from "../../api/axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAtom } from "jotai";
import { favoritesMoviesAtom } from "../../atoms/movies.atoms";
import Loading from "../Loading"; // Import your Loading component

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate } = useLocation();

  useEffect(() => {
    const fetchMovie = async (id) => {
      try {
        setIsLoading(true);
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      navigate("/");
      window.location.reload();
    } else {
      fetchMovie(id);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return <MovieDetailsView movie={movie} />;
}

function FavoriteBtn({ movie }) {
  const [favoritesMovies, setFavoritesMovies] = useAtom(favoritesMoviesAtom);
  const isFavorite = favoritesMovies.some(({ id }) => id === movie.id);

  const handleFavorite = () => {
    if (isFavorite) {
      setFavoritesMovies((prev) => prev.filter(({ id }) => id !== movie.id));
    } else {
      setFavoritesMovies((prev) => [...prev, movie]);
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className={`
        flex items-center gap-2 py-1 px-3 sm:px-4 max-sm:justify-center rounded-md transition-all
        ${
          isFavorite
            ? "bg-orange-400 text-white hover:bg-orange-500"
            : "bg-transparent hover:bg-orange-200 text-white"
        }
        cursor-pointer select-none text-sm sm:text-base
      `}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <div className="text-lg">
        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
      <span>{isFavorite ? "Favorito" : "Favoritar"}</span>
    </button>
  );
}

function MovieDetailsView({ movie }) {
  if (!movie) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 text-white rounded-lg shadow-lg mt-4 sm:mt-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Imagem principal - Responsive */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={movie.primaryImage?.url || "https://placehold.co/300x450"}
            alt={movie.primaryTitle || "Poster indisponível"}
            className="w-full max-w-[350px] h-auto max-h-[500px] rounded-lg object-cover shadow-md border-4 sm:border-8 border-orange-400"
            style={{ aspectRatio: "2/3" }}
          />
        </div>

        {/* Informações - Responsive */}
        <div className="flex flex-col flex-1">
          {/* Título e ano */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 first-letter:text-orange-400">
                {movie.primaryTitle || "Título indisponível"}
              </h1>
              <span className="text-orange-400 font-semibold text-sm sm:text-base">
                {movie.startYear || "Ano não informado"}
              </span>
            </div>
            <FavoriteBtn movie={movie} />
          </div>

          {/* Gêneros */}
          <div className="flex flex-wrap gap-2 my-4">
            {(movie.genres || []).map((g) => (
              <span
                key={g}
                className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Avaliação e Metacritic - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {movie.rating?.aggregateRating && (
              <div>
                <strong className="text-sm sm:text-base">Avaliação:</strong>{" "}
                <span className="text-yellow-400 font-semibold">
                  {movie.rating.aggregateRating}/10
                </span>{" "}
                <span className="text-gray-400 text-xs sm:text-sm ml-1">
                  ({movie.rating.voteCount} votos)
                </span>
              </div>
            )}

            {movie.metacritic?.score && (
              <div>
                <strong className="text-sm sm:text-base">Metacritic:</strong>{" "}
                <span className="text-green-400 font-semibold">
                  {movie.metacritic.score}
                </span>{" "}
                <span className="text-gray-400 text-xs sm:text-sm">
                  ({movie.metacritic.reviewCount} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Sinopse */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Sinopse</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {movie.plot || "Sinopse não disponível."}
            </p>
          </div>

          {/* Diretores - Responsive */}
          {movie.directors?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3">
                Diretor{movie.directors.length > 1 ? "es" : ""}
              </h2>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                {movie.directors.map((director) => (
                  <div key={director.id} className="flex flex-col items-center">
                    <img
                      className="w-full h-[120px] sm:h-[150px] object-cover rounded-lg shadow-sm"
                      src={
                        director.primaryImage?.url ||
                        "https://placehold.co/300x450"
                      }
                      alt={`imagem de ${director.displayName}`}
                      loading="lazy"
                    />
                    <span className="block text-center text-xs sm:text-sm first-letter:text-orange-400 font-semibold mt-2 line-clamp-2">
                      {director.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Elenco - Responsive */}
          {movie.stars?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3">
                Elenco Principal
              </h2>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                {movie.stars.map((star) => (
                  <div key={star.id} className="flex flex-col items-center">
                    <img
                      className="w-full h-[120px] sm:h-[150px] object-cover rounded-lg shadow-sm"
                      src={
                        star.primaryImage?.url || "https://placehold.co/300x450"
                      }
                      alt={`imagem de ${star.displayName}`}
                      loading="lazy"
                    />
                    <span className="block text-center text-xs sm:text-sm first-letter:text-orange-400 font-semibold mt-2 line-clamp-2">
                      {star.displayName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informações técnicas - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
            {movie.originCountries?.length > 0 && (
              <div>
                <strong>País(es):</strong>{" "}
                {movie.originCountries.map((c) => c.name).join(", ")}
              </div>
            )}

            {movie.runtimeSeconds && (
              <div>
                <strong>Duração:</strong>{" "}
                {Math.floor(movie.runtimeSeconds / 60)} minutos
              </div>
            )}

            {movie.spokenLanguages?.length > 0 && (
              <div>
                <strong>Idiomas:</strong>{" "}
                {movie.spokenLanguages.map((l) => l.name).join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
