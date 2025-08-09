import { useState, useEffect } from "react";
import { pages } from "../components/Header/pages";
import NotFound from "../components/NotFound";

export const useLocation = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const navigate = (url) => {
    window.history.pushState({}, "", url);
    setPathname(url);
  };

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return { pathname, navigate };
};

export const CurrentPage = () => {
  const { pathname } = useLocation();

  // Adicionando pathname como chave para forçar o React a recriar o componente
  const Page =
    pages.find(({ href }) => href === pathname)?.component || NotFound;

  return <Page key={pathname} />;
};
