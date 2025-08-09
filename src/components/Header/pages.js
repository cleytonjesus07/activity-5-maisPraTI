import Home from "../Home";
import MovieDetails from "../MovieDetails";
import MyFavorites from "../MyFavorites";

export const pages = [
  {
    href: "/",
    label: "Home",
    component: Home,
  },
  {
    href: "/movieDetails",
    component: MovieDetails,
  },
  {
    href: "/myFavorites",
    label: "My Favorites",
    component: MyFavorites,
  },
];
