import { useState, useEffect, useRef } from "react";
import { pages } from "../components/Header/pages";

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

const NotFound = () => <label>Página não encontrada</label>;

export const CurrentPage = () => {
  const { pathname } = useLocation();

  // Adicionando pathname como chave para forçar o React a recriar o componente
  const Page =
    pages.find(({ href }) => href === pathname)?.component || NotFound;

  return <Page key={pathname} />;
};
