import { useAtom } from "jotai";
import { favoritesMoviesAtom } from "../../atoms/movies.atoms";
import { AiFillHeart } from "react-icons/ai";

// Responsive MovieCard component
function MovieCard({ movie, onRemoveFavorite }) {
  const cardStyle = {
    backgroundImage: `url(${
      movie.primaryImage?.url || "https://placehold.co/300x450?text=No+Image"
    })`,
  };

  const link = `movieDetails?id=${movie.id}`;
  const title = movie.primaryTitle || "Título indisponível";
  const year = movie.startYear || "Ano não informado";

  return (
    <div className="relative group rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] w-full max-w-[350px] mx-auto sm:w-full">
      <a href={link} aria-label={`Ver detalhes de ${title}`}>
        <div
          style={cardStyle}
          className="relative h-[400px] sm:h-[350px] md:h-[400px] w-full bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute inset-0 border-4 sm:border-6 md:border-8 border-orange-400 bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-20" />
        </div>
      </a>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gray-950/95 transition-all duration-300">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight line-clamp-1">
          {title}
        </h2>
        <p className="text-sm sm:text-md font-medium text-gray-300">{year}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemoveFavorite(movie.id);
          }}
          className="mt-2 sm:mt-3 w-full flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 px-3 sm:px-4 bg-orange-500 hover:bg-orange-400 cursor-pointer rounded-lg transition-colors text-white text-xs sm:text-sm font-semibold"
          aria-label={`Remover ${title} dos favoritos`}
        >
          <AiFillHeart className="text-sm sm:text-base" />
          <span>Remover</span>
        </button>
      </div>
    </div>
  );
}

// Responsive main component
export default function MyFavorites() {
  const [favoritesMovies, setFavoritesMovies] = useAtom(favoritesMoviesAtom);

  const handleRemoveFavorite = (movieId) => {
    setFavoritesMovies((prev) => prev.filter(({ id }) => id !== movieId));
  };

  if (favoritesMovies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4 py-8 sm:p-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white first-letter:text-orange-400">
            Meus Favoritos
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Você ainda não adicionou nenhum filme aos favoritos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 py-8 sm:p-10 md:p-12 lg:p-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 md:mb-12 text-center text-white first-letter:text-orange-400">
        Meus Favoritos ({favoritesMovies.length})
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
        {favoritesMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
}
