import { useLocation } from "../../hooks/usePage";
import { pages } from "./pages";

export default function Header({ navigate }) {
  const { pathname } = useLocation();
  const handleLink = (e, href) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <header className="flex justify-between p-5">
      <span className="text-orange-400 text-2xl font-bold">
        <span className="text-blue-400">
          <span className="text-orange-400">+</span>Pra
        </span>
        TI
        <span className="text-white font-bolder text-sm">Movies</span>
      </span>
      <nav className="flex gap-8">
        {pages.map(({ label, href }, index) => {
          const isActive = pathname === href;
          return (
            <a
              key={index}
              className="group"
              onClick={(e) => handleLink(e, href)}
            >
              <div
                className={`cursor-pointer transition-opacity ease-in ${
                  isActive
                    ? "opacity-100 font-bold" // Estilo do link ativo
                    : "opacity-50 group-hover:opacity-100" // Estilo dos links inativos
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
