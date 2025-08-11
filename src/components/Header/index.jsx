import { useState, useEffect, useRef } from "react";
import { useLocation } from "../../hooks/usePage";
import { pages } from "./pages";

export default function Header({ navigate }) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  const handleLink = (e, href) => {
    e.preventDefault();
    navigate(href);
    setNavOpen(false); // Fecha o menu
  };

  const barClass =
    "block w-6 h-1 bg-orange-400 rounded transition-all duration-300";

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);

  return (
    <header className="flex justify-between p-5 relative z-20">
      {/* Logo */}
      <span className="text-orange-400 text-2xl font-bold select-none">
        <span className="text-blue-400">
          <span className="text-orange-400">+</span>Pra
        </span>
        TI
        <span className="text-white font-extrabold text-sm">Movies</span>
      </span>

      {/* Botão menu mobile */}
      <button
        aria-label="Abrir/Fechar menu"
        onClick={() => setNavOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 flex-col gap-1 sm:hidden"
      >
        <span className={`${barClass}`}></span>
        <span className={`${barClass}`}></span>
        <span className={`${barClass}`}></span>
      </button>

      {/* Menu */}
      <nav
        ref={menuRef}
        className={`fixed top-0 w-full left-0 h-full  bg-[#1e1e1e] text-white flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 ease-in-out sm:static sm:flex sm:translate-x-0 sm:bg-transparent sm:w-auto sm:h-auto sm:flex-row sm:gap-8 ${
          navOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 sm:opacity-100"
        }`}
      >
        {/* Botão fechar no mobile */}
        <button
          aria-label="Fechar menu"
          onClick={() => setNavOpen(false)}
          className="absolute top-5 right-5 text-3xl sm:hidden"
        >
          ✕
        </button>

        {pages.map(({ label, href }, index) => {
          const isActive = pathname === href;
          return (
            <a
              key={index}
              role="link"
              tabIndex={0}
              className="group cursor-pointer"
              onClick={(e) => handleLink(e, href)}
            >
              <div
                className={`transition-opacity ease-in ${
                  isActive
                    ? "opacity-100 font-bold"
                    : "opacity-50 group-hover:opacity-100"
                }`}
              >
                {label}
                <span
                  className={`block h-1 bg-orange-400 transition-all ease-in-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
