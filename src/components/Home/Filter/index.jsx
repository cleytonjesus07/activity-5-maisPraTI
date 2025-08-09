import { useAtom, useSetAtom } from "jotai";
import { useState, useEffect } from "react";
import { currentPageAtom, searchTermAtom } from "../../../atoms/movies.atoms";

export default function Filter() {
  const [search, setSearch] = useState("");
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const setSearchTerm = useSetAtom(searchTermAtom);

  useEffect(() => {
    setSearchTerm(search.trim()); // Atualiza o átomo sempre que o usuário digitar
    setCurrentPage(1);
  }, [search, setSearchTerm]);

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex gap-3">
        <input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          className="border-b-2 border-orange-400 p-2 outline-0 w-full"
          type="search"
          placeholder="Buscar por filme..."
        />
      </div>
    </div>
  );
}
