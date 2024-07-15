import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "./style.module.scss";
import { FaSearch } from "react-icons/fa";

function Ricerca({
  ricerca,
  setRicerca,
  setCurrentPage,
}: {
  ricerca?: string;
  setRicerca: Dispatch<SetStateAction<string | undefined>> | undefined;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}) {
  const [searchInput, setSearchInput] = useState(ricerca || "");

  useEffect(() => {
    setSearchInput("");
  }, [ricerca]);

  return (
    <div className={style.ricerca}>
      <input
        type="text"
        placeholder={"Ricerca"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          if (setRicerca && searchInput.length > 0 && setCurrentPage) {
            setRicerca(searchInput);
            setCurrentPage(1);
          } else {
            console.log("reset");
            setRicerca && setRicerca("");
            setCurrentPage && setCurrentPage(1);
          }
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
}
export default Ricerca;
