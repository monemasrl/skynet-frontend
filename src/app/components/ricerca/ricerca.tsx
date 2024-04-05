import { Dispatch, SetStateAction, useState } from "react";
import style from "./style.module.scss";
import { FaSearch } from "react-icons/fa";

function Ricerca({
  setRicerca,
  setCurrentPage,
}: {
  setRicerca: Dispatch<SetStateAction<string | undefined>> | undefined;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={style.ricerca}>
      <input
        type="text"
        placeholder="Cerca..."
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
