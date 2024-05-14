import { LuChevronUpSquare, LuChevronDownSquare } from "react-icons/lu";
import style from "./style.module.scss";

function DataOrder({
  orderBy,
  setOrderDirection,
}: {
  orderBy: string | null | undefined;
  setOrderDirection: React.Dispatch<React.SetStateAction<string>> | undefined;
}) {
  if (orderBy === null) return null;
  return (
    <div className={style.dataOrder}>
      <span>Ordina:</span>
      <div
        className={style.dataOrder__asc}
        onClick={() => setOrderDirection && setOrderDirection("asc")}
      >
        <LuChevronUpSquare />
      </div>
      <div
        className={style.dataOrder__desc}
        onClick={() => setOrderDirection && setOrderDirection("desc")}
      >
        <LuChevronDownSquare />
      </div>
    </div>
  );
}
export default DataOrder;
